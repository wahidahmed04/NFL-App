// fetchGames.js

import {supabase} from "../supabaseClient.js"; // your supabase client

const CURRENT_SEASON = 2025; // change to current season
const TOTAL_WEEKS = 18; // NFL regular season
// Map ESPN team IDs to your Supabase team IDs


async function fetchGames() {
  const allGames = [];

  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasonType=${CURRENT_SEASON}&week=${week}`;
    console.log(`Fetching week ${week}...`);
    const res = await fetch(url);
    const data = await res.json();

    if (!data.events || data.events.length === 0) continue;

    for (const event of data.events) {
      if (event.season?.type !== 2) continue; // skip preseason/postseason
      const status = event.status?.type?.description || "unknown";
      const isFinal = status.toLowerCase().includes("final");
      if (!isFinal) continue;

      const comp = event.competitions?.[0];
      if (!comp) continue;

      const home = comp.competitors.find(c => c.homeAway === "home");
      const away = comp.competitors.find(c => c.homeAway === "away");

      const home_team_id = home.team.id;
      const away_team_id = away.team.id;
      if (!home_team_id || !away_team_id) {
        console.log(`Missing team mapping for ESPN IDs: ${home.team.id}, ${away.team.id}`);
        continue;
      }

      allGames.push({
        api_game_id: event.id,
        season: CURRENT_SEASON,
        week,
        game_date: event.date,
        home_team_id,
        away_team_id,
        home_score: parseInt(home.score),
        away_score: parseInt(away.score),
        status,
      });
    }
  }

  if (allGames.length === 0) {
    console.log("No regular-season games found.");
    return;
  }

  console.log(`Inserting ${allGames.length} games...`);

  const { data, error } = await supabase
    .from("games")
    .upsert(allGames, { onConflict: ["api_game_id"] });

  if (error) console.error("Insert error:", error);
  else console.log(`${data.length} games inserted or updated.`);
}

fetchGames();