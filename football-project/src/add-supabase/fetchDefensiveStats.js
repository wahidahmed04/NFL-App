import { supabase } from '../supabaseClient.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const toInt = str => {
  const n = parseInt(str.replace(/,/g, ''), 10);
  return isNaN(n) ? 0 : n; // or return null if you prefer
};
const toFloat = str => {
  const n = parseFloat(str.replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
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
    .replace(/\s*,?\s*(jr|sr|ii|iii|iv|v|vi)\.?$/i, '') // remove suffixes like Jr, Sr, II, III
    .trim();
async function scrapeDefensiveStats(url){
    try {
    await delay(3000);
    const { data } = await axios.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' 

      } 
    });
    const $ = cheerio.load(data);
    const results = []
    $('tbody tr').each((_, row) => {
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
  const rank = $(row).find('th[data-stat="ranker"]').text().trim();
  const playerName = $(row).find('td[data-stat="name_display"] a').text().trim();
  if (!playerName) {
  console.warn("Empty player name row skipped");
  return;
}

  const gamesPlayed = $(row).find('td[data-stat="games"]').text().trim();
  const gamesStarted = $(row).find('td[data-stat="games_started"]').text().trim();
  let interceptions = $(row).find('td[data-stat="def_int"]').text().trim();
  if(!interceptions){
    interceptions = $(row).find('td[data-stat="def_int"] strong').text().trim();
  }
  let interceptionYards = $(row).find('td[data-stat="def_int_yds"]').text().trim();
  if(!interceptionYards){
    interceptionYards = $(row).find('td[data-stat="def_int_yds"] strong').text().trim();
  }
  let interceptionTouchdowns = $(row).find('td[data-stat="def_int_td"]').text().trim();
  if(!interceptionTouchdowns){
    interceptionTouchdowns = $(row).find('td[data-stat="def_int_td"] strong').text().trim();
  }
   let passesDefended = $(row).find('td[data-stat="pass_defended"]').text().trim();
  if(!passesDefended){
    passesDefended = $(row).find('td[data-stat="pass_defended"] strong').text().trim();
  }
  let forcedFumbles = $(row).find('td[data-stat="fumbles_forced"]').text().trim();
  if(!forcedFumbles){
    forcedFumbles = $(row).find('td[data-stat="fumbles_forced"] strong').text().trim();
  }
  let fumbles = $(row).find('td[data-stat="fumbles"]').text().trim();
  if(!fumbles){
    fumbles = $(row).find('td[data-stat="fumbles"] strong').text().trim();
  }
  let fumblesRecovered = $(row).find('td[data-stat="fumbles_rec"]').text().trim();
  if(!fumblesRecovered){
    fumblesRecovered = $(row).find('td[data-stat="fumbles_rec"] strong').text().trim();
  }
  let recoveredFumbleYards = $(row).find('td[data-stat="fumbles_rec_yds"]').text().trim();
  if(!recoveredFumbleYards){
    recoveredFumbleYards = $(row).find('td[data-stat="fumbles_rec_yds"] strong').text().trim();
  }
  let fumbleReturnTouchdowns = $(row).find('td[data-stat="fumbles_rec_td"]').text().trim();
  if(!fumbleReturnTouchdowns){
    fumbleReturnTouchdowns = $(row).find('td[data-stat="fumbles_rec_td"] strong').text().trim();
  }
  let sacks = $(row).find('td[data-stat="sacks"]').text().trim();
  if(!sacks){
    sacks = $(row).find('td[data-stat="sacks"] strong').text().trim();
  }
  let combinedTackles = $(row).find('td[data-stat="tackles_combined"]').text().trim();
  if(!combinedTackles){
    combinedTackles = $(row).find('td[data-stat="tackles_combined"] strong').text().trim();
  }
  let soloTackles = $(row).find('td[data-stat="tackles_solo"]').text().trim();
  if(!soloTackles){
    soloTackles = $(row).find('td[data-stat="tackles_solo"] strong').text().trim();
  }
  let assistedTackles = $(row).find('td[data-stat="tackles_assists"]').text().trim();
  if(!assistedTackles){
    assistedTackles = $(row).find('td[data-stat="tackles_assists"] strong').text().trim();
  }
  let tacklesForLoss = $(row).find('td[data-stat="tackles_loss"]').text().trim();
  if(!tacklesForLoss){
    tacklesForLoss = $(row).find('td[data-stat="tackles_loss"] strong').text().trim();
  }
  let QBHits = $(row).find('td[data-stat="qb_hits"]').text().trim();
  if(!QBHits){
    QBHits = $(row).find('td[data-stat="qb_hits"] strong').text().trim();
  }
  let safeties = $(row).find('td[data-stat="safety_md"]').text().trim();
  if(!safeties){
    safeties = $(row).find('td[data-stat="safety_md"] strong').text().trim();
  }
  let team = $(row).find('td[data-stat="team_name_abbr"] a').text().trim();
  if(!team){
    team = $(row).find('td[data-stat="team_name_abbr"]').text().trim();
  }
  const obj = {
  rank,
  playerName,
  gamesPlayed,
  gamesStarted,
  interceptions,
  interceptionYards,
  interceptionTouchdowns,
  passesDefended,
  forcedFumbles,
  fumbles,
  fumblesRecovered,
  recoveredFumbleYards,
  fumbleReturnTouchdowns,
  soloTackles,
  assistedTackles,
  combinedTackles,
  tacklesForLoss,
  QBHits,
  sacks,
  safeties,
  team
};


  results.push(obj);
});

    return results;




} catch (error) {
      console.error('Error fetching data:', error.message);
      return [];   
}


}
async function fetchDefensiveStats(){
    const url = "https://www.pro-football-reference.com/years/2025/defense.htm";
    const defensiveStats = await scrapeDefensiveStats(url)
    console.log("Scraped rows:", defensiveStats.length);
    let skipped = 0;

for (const obj of defensiveStats) {
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
        source: "pfr_2025_defensive"
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

  /* ✅ Insert stats (team belongs HERE, not identity) */
  const { error: err } = await supabase
    .from("player_stats_defense")
    .upsert({
      player_id: playerId,
      season: 2025,
      games_played: toInt(obj.gamesPlayed),
      games_started: toInt(obj.gamesStarted),
      interceptions: toInt(obj.interceptions),
      interception_yards: toInt(obj.interceptionYards),
      interception_touchdowns: toInt(obj.interceptionTouchdowns),
      passes_defended: toInt(obj.passesDefended),
      forced_fumbles: toInt(obj.forcedFumbles),
      fumbles: toInt(obj.fumbles),
      fumbles_recovered: toInt(obj.fumblesRecovered),
      recovered_fumble_yards: toInt(obj.recoveredFumbleYards),
      fumble_return_touchdowns: toInt(obj.fumbleReturnTouchdowns),
      solo_tackles: toInt(obj.soloTackles),
      assisted_tackles: toInt(obj.assistedTackles),
      combined_tackles: toInt(obj.combinedTackles),
      tackles_for_loss: toInt(obj.tacklesForLoss),
      qb_hits: toInt(obj.QBHits),
      sacks: toFloat(obj.sacks),
      safeties: toInt(obj.safeties),
      team: obj.team,
      rank: obj.rank,
      last_updated: new Date()
    }, { onConflict: "player_id, season" });

  if (err) console.error(`Upsert error ${obj.playerName}:`, err);
}

console.log("Skipped players:", skipped);


}


fetchDefensiveStats();