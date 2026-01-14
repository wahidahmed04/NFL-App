import { supabase } from '../supabaseClient.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const toInt = str => {
  const n = parseInt(str.replace(/,/g, ''), 10);
  return isNaN(n) ? 0 : n; // or return null if you prefer
};
const abbreviationMap = {
  "ARI": "ARI",
  "ATL": "ATL",
  "BAL": "BAL",
  "BUF": "BUF",
  "CAR": "CAR",
  "CHI": "CHI",
  "CIN": "CIN",
  "CLE": "CLE",
  "DAL": "DAL",
  "DEN": "DEN",
  "DET": "DET",
  "GNB": "GB",
  "HOU": "HOU",
  "IND": "IND",
  "JAX": "JAX",
  "KAN": "KC",
  "LVR": "LV",
  "LAC": "LAC",
  "LAR": "LAR",
  "MIA": "MIA",
  "MIN": "MIN",
  "NWE": "NE",
  "NOR": "NO",
  "NYG": "NYG",
  "NYJ": "NYJ",
  "PHI": "PHI",
  "PIT": "PIT",
  "SFO": "SF",
  "SEA": "SEA",
  "TAM": "TB",
  "TEN": "TEN",
  "WAS": "WSH"
}

const normalize = name =>
  name
    .replace(/[\.\-\,]/g, '')         // remove periods, hyphens, commas
    .replace(/\s+(jr|sr|ii|iii|iv|v|vi)$/i, '') // remove suffixes like Jr, Sr, II, III
    .trim();
async function scrapeReceivingStats(url){
    try {
    await delay(3000);
    const { data } = await axios.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' 

      } 
    });
    const $ = cheerio.load(data);
    const table = $('table[data-soc-sum-phase-type="reg"]')
    const results = []
    table.find('tbody tr').each((_, row) => {
        if (
    $(row).hasClass('thead') ||
    $(row).hasClass('norank') ||
    $(row).hasClass('over_header thead')
  ) {
    return; // skip this tr
  }
   if($(row).hasClass('partial_table')){
    let team = $(row).find('td[data-stat="team_name_abbr"] a').text().trim();
  if(!team){
    team = $(row).find('td[data-stat="team_name_abbr"]').text().trim();
  }
  results[results.length-1].team = team
  return
  }
  else {
  const playerName = $(row).find('td[data-stat="name_display"] a').text().trim();
  let targets = $(row).find('td[data-stat="targets"] strong').text().trim();
  if(!targets){
    targets = $(row).find('td[data-stat="targets"]').text().trim();
  }
  let receptions = $(row).find('td[data-stat="rec"] strong').text().trim();
  if(!receptions){
    receptions = $(row).find('td[data-stat="rec"]').text().trim();
  }
  let receivingYards = $(row).find('td[data-stat="rec_yds"] strong').text().trim();
  if(!receivingYards){
    receivingYards = $(row).find('td[data-stat="rec_yds"]').text().trim();
  }
   let receivingTouchdowns = $(row).find('td[data-stat="rec_td"] strong').text().trim();
  if(!receivingTouchdowns){
    receivingTouchdowns = $(row).find('td[data-stat="rec_td"]').text().trim();
  }
  let team = $(row).find('td[data-stat="team_name_abbr"] a').text().trim();
  if(!team){
    team = $(row).find('td[data-stat="team_name_abbr"]').text().trim();
  }
  const gamesPlayed = $(row).find('td[data-stat="games"]').text().trim();
  const gamesStarted = $(row).find('td[data-stat="games_started"]').text().trim();
  const obj = {
  playerName,
  receptions: toInt(receptions),
  receivingYards: toInt(receivingYards),
  receivingTouchdowns: toInt(receivingTouchdowns),
  targets: toInt(targets),
  team,
  gamesPlayed,
  gamesStarted
};


  results.push(obj);
}
});

    return results;




} catch (error) {
      console.error('Error fetching data:', error.message);
      return [];   
}


}
async function fetchReceivingStats(){
    const url = "https://www.pro-football-reference.com/years/2025/receiving.htm";
    const receivingStats = await scrapeReceivingStats(url)
    let skipped = 0;
   
   for (const obj of receivingStats) {
     let playerData = null;
     const normalized = normalize(obj.playerName);
   
     /* 1️⃣ Resolve by normalized_name (NO TEAM FILTER) */
     let { data, error } = await supabase
       .from("players")
       .select("id, team_id")
       .eq("normalized_name", normalized);
   
     if (!error && data?.length === 1) {
       playerData = data[0];
     }
   
     /* 1️⃣b Tie-break by team ONLY if ambiguous */
     if (!playerData && data?.length > 1) {
       const { data: team } = await supabase
         .from("teams")
         .select("api_team_id")
         .eq("abbreviation", abbreviationMap[obj.team])
         .single();
   
       const teamId = team?.api_team_id;
       playerData = data.find(p => p.team_id === teamId) ?? null;
     }
   
     /* 2️⃣ Resolve by exact name (NO TEAM FILTER) */
     if (!playerData) {
       ({ data, error } = await supabase
         .from("players")
         .select("id, team_id")
         .eq("name", obj.playerName));
   
       if (!error && data?.length === 1) {
         playerData = data[0];
       }
   
       if (!playerData && data?.length > 1) {
         const { data: team } = await supabase
           .from("teams")
           .select("api_team_id")
           .eq("abbreviation", abbreviationMap[obj.team])
           .single();
   
         const teamId = team?.api_team_id;
         playerData = data.find(p => p.team_id === teamId) ?? null;
       }
     }
   
     /* 3️⃣ player_aliases (aliases are identity, not team-based) */
     if (!playerData) {
       ({ data, error } = await supabase
         .from("player_aliases")
         .select("player_id")
         .eq("alias", obj.playerName)
         .limit(1));
   
       if (!error && data?.length) {
         playerData = { id: data[0].player_id };
       }
     }
   
     /* 4️⃣ Unresolved → quarantine */
     if (!playerData) {
       await supabase
         .from("unresolved_players")
         .upsert({
           scraped_name: obj.playerName,
           normalized_name: normalized,
           source: "pfr_2025_receiving"
         });
   
       console.log("Unresolved player:", obj.playerName);
       skipped++;
       continue;
     }
   
     const playerId = playerData.id;
     if (!playerId) {
       skipped++;
       continue;
     }


  const { error: err } = await supabase
    .from('player_stats_offense')
    .upsert({
      player_id: playerId,
      season: 2025,
      receptions: obj.receptions,
      receiving_yards: obj.receivingYards,
      receiving_touchdowns: obj.receivingTouchdowns,
      targets: obj.targets,
      team: obj.team,
      games_played: obj.gamesPlayed,
      games_started: obj.gamesStarted,
      receiving_score: (((obj.receptions*0.5)+(obj.receivingYards/15)+(obj.receivingTouchdowns*6))/obj.gamesPlayed).toFixed(2),
      last_updated: new Date()
    }, { onConflict: 'player_id, season' });

  if (err) console.error(`Upsert error ${obj.playerName}:`, err);
}
console.log("Skipped players:", skipped);

    }


fetchReceivingStats();