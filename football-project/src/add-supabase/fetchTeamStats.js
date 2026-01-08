import { supabase } from '../supabaseClient.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
const YEAR = 2025;
const SEASON_TYPE = 2; // regular season
const TEAM_IDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,33,34];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const nameConversions = {
  "Denver": "Broncos",
  "LA Rams": "Rams",
  "Houston": "Texans",
  "LA Chargers": "Chargers",
  "New England": "Patriots",
  "Chicago": "Bears",
  "Detroit": "Lions",
  "Minnesota": "Vikings",
  "Cleveland": "Browns",
  "Green Bay": "Packers",
  "NY Jets": "Jets",
  "Seattle": "Seahawks",
  "Buffalo": "Bills",
  "NY Giants": "Giants",
  "New Orleans": "Saints",
  "Arizona": "Cardinals",
  "Tampa Bay": "Buccaneers",
  "Baltimore": "Ravens",
  "Atlanta": "Falcons",
  "San Francisco": "49ers",
  "Kansas City": "Chiefs",
  "Pittsburgh": "Steelers",
  "Miami": "Dolphins",
  "Tennessee": "Titans",
  "Washington": "Commanders",
  "Philadelphia": "Eagles",
  "Indianapolis": "Colts",
  "Carolina": "Panthers",
  "Las Vegas": "Raiders",
  "Jacksonville": "Jaguars",
  "Cincinnati": "Bengals",
  "Dallas": "Cowboys",
}
const nameConversions2 = {
  "Denver Broncos": "Broncos",
  "Los Angeles Rams": "Rams",
  "Houston Texans": "Texans",
  "Los Angeles Chargers": "Chargers",
  "New England Patriots": "Patriots",
  "Chicago Bears": "Bears",
  "Detroit Lions": "Lions",
  "Minnesota Vikings": "Vikings",
  "Cleveland Browns": "Browns",
  "Green Bay Packers": "Packers",
  "New York Jets": "Jets",
  "Seattle Seahawks": "Seahawks",
  "Buffalo Bills": "Bills",
  "New York Giants": "Giants",
  "New Orleans Saints": "Saints",
  "Arizona Cardinals": "Cardinals",
  "Tampa Bay Buccaneers": "Buccaneers",
  "Baltimore Ravens": "Ravens",
  "Atlanta Falcons": "Falcons", 
  "San Francisco 49ers": "49ers",
  "Kansas City Chiefs": "Chiefs",
  "Pittsburgh Steelers": "Steelers",
  "Miami Dolphins": "Dolphins",
  "Tennessee Titans": "Titans",
  "Washington Commanders": "Commanders",
  "Philadelphia Eagles": "Eagles",
  "Indianapolis Colts": "Colts",
  "Carolina Panthers": "Panthers",
  "Las Vegas Raiders": "Raiders",
  "Jacksonville Jaguars": "Jaguars",
  "Cincinnati Bengals": "Bengals",
  "Dallas Cowboys": "Cowboys",
}

async function scrapeThirdDownConversion(url) {
  const { data } = await axios.get(url); // fetch HTML
   const $ = cheerio.load(data);
  const out = [];

  $('tbody tr').each((_, tr) => {
    const $tr = $(tr);

    // first td (whatever the first column is)
    const $firstTd = $tr.children('td').first();
    const firstDataSort = $firstTd.attr('data-sort') ?? null;

    // the team cell: <td class="text-left nowrap" data-sort="TeamName">...</td>
    const $teamTd = $tr.find('td.text-left.nowrap').first();
    const teamDataSort = $teamTd.attr('data-sort') ?? null;
    const teamName = $teamTd.text().trim() || null;

    // optional: collect all numeric/stat data-sort values (td.text-right)
    const rightStats = $tr.find('td.text-right').first().attr('data-sort') ?? null;

    out.push({
      firstDataSort,
      teamDataSort,
      teamName,
      rightStats
    });
  });

  return out;
  };
async function scrapeDefensiveRedZone() {
  try {
    const url = 'https://www.pro-football-reference.com/years/2025/opp.htm';
    await delay(3000);
    const { data } = await axios.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' } 
    });
const html = data.replace(/<!--/g, '').replace(/-->/g, '');
const $ = cheerio.load(html);

const results = [];

$('#team_conversions tbody tr').each((_, row) => {
  const team = $(row).find('td[data-stat="team"] a').text().trim();
  const rz = $(row).find('td[data-stat="red_zone_pct"]').text().trim();

  if (!team || !rz) return;

  results.push({
    team,
    red_zone_pct: parseFloat(rz.replace('%', ''))
  });
});

    return results;
  } catch (error) {
    console.error("Error scraping defensive red zone data:", error);
    return [];
  }
}
async function scrapeDefensiveYards() {
  const url = 'https://www.pro-football-reference.com/years/2025/opp.htm';
  await delay(3000);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);
  const data = [];

  $('#team_stats tbody tr').each((i, el) => {
    const teamName = $(el).find('td.left').text().trim();
    const defensiveYds = parseFloat($(el).find('td[data-stat="total_yards"]').text()) || 0;

    if (teamName && teamName !== 'League Average') {
      data.push({
        team: teamName,
        defensive_yards: defensiveYds,
      });
    }
  });

  return data;
}
async function scrapeOtherDefensive() {
  const url = 'https://www.pro-football-reference.com/years/2025/opp.htm';
  await delay(3000);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);
  const data = [];

  $('#team_stats tbody tr').each((i, el) => {
    const teamName = $(el).find('td.left').text().trim();
    const defensivePassYds = parseFloat($(el).find('td[data-stat="pass_yds"]').text()) || 0;
    const defensiveRushYds = parseFloat($(el).find('td[data-stat="rush_yds"]').text()) || 0;
    let defensiveTouchdowns = parseFloat($(el).find('td[data-stat="pass_td"]').text()) || 0;
    defensiveTouchdowns += parseFloat($(el).find('td[data-stat="rush_td"]').text()) || 0;
    if (teamName && teamName !== 'League Average') {
      data.push({
        team: teamName,
        defensive_pass_yds: defensivePassYds,
        defensive_rush_yds: defensiveRushYds,
        defensive_touchdowns: defensiveTouchdowns
      });
    }
  });

  return data;
}
function toNumber(v) {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  const s = String(v).replace(/[,\s]/g, '');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

function parseScoreField(field) {
  if (field == null) return null;
  if (typeof field === 'number') return field;
  if (typeof field === 'string') {
    const n = Number(field.replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : null;
  }
  if (typeof field === 'object') {
    if (field.value != null) return Number(field.value);
    if (field.displayValue != null) {
      const n = Number(String(field.displayValue).replace(/[^\d.-]/g, ''));
      return Number.isFinite(n) ? n : null;
    }
    return null;
  }
  return null;
}

function findStatObject(statsData, matchFn) {
  if (!statsData?.splits?.categories) return null;
  for (const cat of statsData.splits.categories) {
    if (!Array.isArray(cat.stats)) continue;
    for (const s of cat.stats) {
      const name = String(s.name || '').toLowerCase();
      const display = String(s.displayName || '').toLowerCase();
      const abbr = String(s.abbreviation || '').toLowerCase();
      if (matchFn({ name, display, abbr, raw: s })) return s;
    }
  }
  return null;
}

function getStatValue(statObj) {
  if (!statObj) return 0;
  // prefer a total value field, then value, then displayValue. Avoid perGameValue unless used deliberately.
  if (statObj.value != null) return toNumber(statObj.value);
  if (statObj.displayValue != null) return toNumber(statObj.displayValue);
  if (statObj.perGameValue != null) return toNumber(statObj.perGameValue);
  return 0;
}

async function fetchTeamStats(teamId) {
  const scheduleUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/schedule`;
  const statsUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${YEAR}/types/${SEASON_TYPE}/teams/${teamId}/statistics`;

  // fetch schedule
  const scheduleRes = await fetch(scheduleUrl);
  if (!scheduleRes.ok) throw new Error(`Schedule fetch failed ${scheduleRes.status}`);
  const scheduleData = await scheduleRes.json();
  const events = scheduleData.events || [];

  const finalEvents = events.filter(ev => {
    const st = ev.competitions?.[0]?.status?.type?.name;
    return st === 'STATUS_FINAL';
  });

  let gamesPlayed = 0;
  let wins = 0, losses = 0, ties = 0;
  let totalPointsScored = 0, totalPointsAllowed = 0;

  for (const ev of finalEvents) {
    const comp = ev.competitions?.[0];
    if (!comp) continue;
    const comps = comp.competitors || [];
    const teamComp = comps.find(c => String(c.id) === String(teamId) || String(c.team?.id) === String(teamId));
    const oppComp = comps.find(c => c !== teamComp);
    if (!teamComp || !oppComp) continue;

    const teamScore = parseScoreField(teamComp.score ?? teamComp.team?.score ?? teamComp.score?.value ?? teamComp.score?.displayValue);
    const oppScore = parseScoreField(oppComp.score ?? oppComp.team?.score ?? oppComp.score?.value ?? oppComp.score?.displayValue);
    if (teamScore == null || oppScore == null) continue;

    gamesPlayed++;
    totalPointsScored += teamScore;
    totalPointsAllowed += oppScore;

    if (teamComp.winner === true) wins++;
    else if (oppComp.winner === true) losses++;
    else {
      if (teamScore > oppScore) wins++;
      else if (teamScore < oppScore) losses++;
      else ties++;
    }
  }

  const points_per_game = gamesPlayed ? totalPointsScored / gamesPlayed : 0;
  const points_allowed_per_game = gamesPlayed ? totalPointsAllowed / gamesPlayed : 0;

  // fetch stats
  const statsRes = await fetch(statsUrl);
  if (!statsRes.ok) throw new Error(`Statistics fetch failed ${statsRes.status}`);
  const statsData = await statsRes.json();

  const passingStat =
  findStatObject(statsData, ({ abbr }) => abbr === 'nyds' || abbr.includes('nyds'))||
  findStatObject(statsData, ({ display }) => display.includes('passing yards')) ||
  findStatObject(statsData, s => s.name === 'netpassingyards');




  const rushingStat =
    findStatObject(statsData, s => s.name === 'rushingyards') ||
    findStatObject(statsData, ({ display }) => display.includes('rushing yards')) ||
    findStatObject(statsData, ({ abbr }) => abbr === 'ryds' || abbr.includes('rush'));

  const offensiveSacksStat =
    findStatObject(statsData, s => s.name === 'sacks') ||
    findStatObject(statsData, ({ display }) => display.includes('total sacks')) ||
    findStatObject(statsData, ({ abbr }) => abbr === 'sacks' || abbr.includes('sacks'));
  const defensiveCategory = statsData?.splits?.categories?.find(
  c => String(c.name).toLowerCase() === 'defensive'
);

  const defensiveSacksStat =
  defensiveCategory?.stats?.find(s =>
    ['sacks'].includes(String(s.name).toLowerCase()) ||
    String(s.displayName || '').toLowerCase().includes('sacks') ||
    String(s.abbreviation || '').toLowerCase() === 'sacks'
  ) || null;

  const tdStat =
    findStatObject(statsData, s => s.name === 'totaltouchdowns') ||
    findStatObject(statsData, ({ display }) => display.includes('total touchdowns') || display.includes('total touchdown')) ||
    findStatObject(statsData, ({ abbr }) => abbr === 'ttd' || abbr === 'td') ||
    findStatObject(statsData, ({ display, name }) => display.includes('total points') || name.includes('totalpoints'));

  // NEW: Red Zone Scoring Percentage
  const redZoneStat =
    findStatObject(statsData, s => s.name === 'redzonetouchdownpct') ||
    findStatObject(statsData, ({ display }) => display.includes('red zone touchdown')) ||
    findStatObject(statsData, ({ abbr }) => abbr === 'rz%');

  // NEW: Third Down Conversion Percentage
  const thirdDownStat =
    findStatObject(statsData, s => s.name === 'thirddownconvpct') ||
    findStatObject(statsData, ({ display }) => display.includes('3rd down') || display.includes('third down')) ||
    findStatObject(statsData, ({ abbr }) => abbr === '3rdc%');
 
  let totalPassingYards = Math.round(getStatValue(passingStat));
  let totalRushingYards = Math.round(getStatValue(rushingStat));
  let totalTouchdowns = Math.round(getStatValue(tdStat));
  let redZoneScoringPct = Number(getStatValue(redZoneStat).toFixed(2));
  let thirdDownConvPct = Number(getStatValue(thirdDownStat).toFixed(2));
  let offensiveSacks = Math.round(getStatValue(offensiveSacksStat));
  let defensiveSacks = Math.round(getStatValue(defensiveSacksStat));
  if (tdStat && (String(tdStat.name || '').toLowerCase().includes('totalpoints') || String(tdStat.displayName || '').toLowerCase().includes('total points'))) {
    const pts = toNumber(getStatValue(tdStat));
    if (pts > 20 && !totalTouchdowns) {
      totalTouchdowns = Math.round(pts / 7);
    }
  }

  if (totalPassingYards > 8000) {
    const netPass = findStatObject(statsData, s => s.name === 'netpassingyards' || (s.displayName||'').toLowerCase().includes('net passing'));
    const netVal = getStatValue(netPass);
    if (netVal && netVal < totalPassingYards) totalPassingYards = Math.round(netVal);
  }

  totalPassingYards = Number.isFinite(totalPassingYards) ? totalPassingYards : 0;
  totalRushingYards = Number.isFinite(totalRushingYards) ? totalRushingYards : 0;
  totalTouchdowns = Number.isFinite(totalTouchdowns) ? totalTouchdowns : 0;
  redZoneScoringPct = Number.isFinite(redZoneScoringPct) ? redZoneScoringPct : 0;
  thirdDownConvPct = Number.isFinite(thirdDownConvPct) ? thirdDownConvPct : 0;
  const defensiveRedZoneRates = await scrapeDefensiveRedZone();
  const thirdDownRates = await scrapeThirdDownConversion('https://www.teamrankings.com/nfl/stat/opponent-third-down-conversion-pct')
  const databaseTeamName = await supabase 
  .from('teams')
  .select('name')
  .eq('api_team_id', teamId)
  .single();
   const defensiveYards = await scrapeDefensiveYards();

  const defensive_yards = defensiveYards.find(r => {
    const convertedName = nameConversions2[r.team] || r.team;
    return convertedName === databaseTeamName.data.name;
  });
  let otherDefense = await scrapeOtherDefensive()
  otherDefense = otherDefense.find(r => {
    const convertedName = nameConversions2[r.team] || r.team;
    return convertedName === databaseTeamName.data.name;
  });
  const defensive_passing_yds = otherDefense.defensive_pass_yds
  const defensive_rushing_yds = otherDefense.defensive_rush_yds
  const defensive_touchdowns = otherDefense.defensive_touchdowns
  const defensive_yards_per_game = defensive_yards ? (toNumber(defensive_yards.defensive_yards) / gamesPlayed).toFixed(2) : 0;
  const teamThirdDownRate = thirdDownRates.find(r => {
    const convertedName = nameConversions[r.teamName] || r.teamName;
    return convertedName === databaseTeamName.data.name;
  });
  const teamDefRedZone = defensiveRedZoneRates.find(r => {
    const convertedName = nameConversions2[r.team] || r.team;
    return convertedName === databaseTeamName.data.name;
  });
  return {
    team_id: String(teamId),
    games_played: Number(gamesPlayed),
    wins: Number(wins),
    losses: Number(losses),
    ties: Number(ties),
    points_per_game: Number(points_per_game.toFixed(3)),
    total_passing_yards: totalPassingYards,
    total_rushing_yards: totalRushingYards,
    total_touchdowns: totalTouchdowns,
    points_allowed_per_game: Number(points_allowed_per_game.toFixed(3)),
    offensive_yards_per_game: Number((totalPassingYards + totalRushingYards) / (gamesPlayed || 1)).toFixed(2),
    offensive_red_zone_conversion_percentage: redZoneScoringPct,
    offensive_third_down_conversion_percentage: thirdDownConvPct,
    defensive_yards_per_game: Number(defensive_yards_per_game),
    defensive_third_down_conversion_percentage: teamThirdDownRate ? Number(teamThirdDownRate.rightStats*100).toFixed(2) : 0,
    defensive_red_zone_conversion_percentage: teamDefRedZone ? Number(teamDefRedZone.red_zone_pct).toFixed(2) : 0,
    offensive_sacks: offensiveSacks || 0,
    defensive_sacks: defensiveSacks || 0,
    defensive_passing_yards: Number(defensive_passing_yds),
    defensive_rushing_yards: Number(defensive_rushing_yds),
    defensive_touchdowns: Number(defensive_touchdowns),
    last_updated: new Date()
  };
}

async function updateAllTeamStats() {
  for (const teamId of TEAM_IDS) {
    try {
      console.log(`\n--- team ${teamId} ---`);
      const payload = await fetchTeamStats(teamId);
      const { error } = await supabase
        .from('team_stats')
        .upsert([payload], { onConflict: 'team_id' });
      if (error) console.error(`Upsert error ${teamId}:`, error);
      else console.log(`Updated ${teamId}`, {
        games: payload.games_played,
        wins: payload.wins,
        losses: payload.losses,
        ties: payload.ties,
        ppg: payload.points_per_game,
        papg: payload.points_allowed_per_game,
        pass: payload.total_passing_yards,
        rush: payload.total_rushing_yards,
        tds: payload.total_touchdowns,
        offensive_ypg: payload.offensive_yards_per_game,
        offensive_red_zone_conversion_percentage: payload.offensive_red_zone_conversion_percentage,
        offensive_third_down_conversion_percentage: payload.offensive_third_down_conversion_percentage,
        defensive_yards_per_game: payload.defensive_yards_per_game,
        defensive_third_down_conversion_percentage: payload.defensive_third_down_conversion_percentage,
        defensive_red_zone_conversion_percentage: payload.defensive_red_zone_conversion_percentage,
        last_updated: new Date(),
        offensive_sacks: payload.offensive_sacks,
        defensive_sacks: payload.defensive_sacks
      });
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error(`Failed ${teamId}:`, e.message || e);
    }
  }
  console.log('done');
}

if (import.meta.url === `file://${process.argv[1]}` || typeof require !== 'undefined' && require.main === module) {
updateAllTeamStats();
}