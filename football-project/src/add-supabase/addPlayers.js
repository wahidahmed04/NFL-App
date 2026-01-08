import { supabase } from '../supabaseClient.js'; // adjust path if needed


const teamIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,33,34];
const normalize = name =>
  name
    .replace(/[\.\-\,]/g, '')         // remove periods, hyphens, commas
    .replace(/\s+(jr|sr|ii|iii|iv|v|vi)$/i, '') // remove suffixes like Jr, Sr, II, III
    .trim();
function parseWeight(weightStr) {
  if (!weightStr) return null;
  const match = weightStr.match(/\d+/);
  return match ? parseFloat(match[0]) : null;
}
// Include all 32 NFL team IDs here (these match ESPN's internal IDs)
async function addPlayers() {
  for (const teamId of teamIds) {
    try {
      const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/roster`);
      const data = await res.json();

      if (!data.athletes || !Array.isArray(data.athletes)) {
        console.log(`No athletes found for team ${teamId}`);
        continue;
      }

      // Flatten all position groups (offense, defense, etc.)
      const allPlayers = data.athletes.flatMap(group => group.items || []);

const players = allPlayers
  .map(p => ({
    api_player_id: String(p.id),
    name: p.displayName || `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "Unknown",
    team_id: teamId,
    position: p.position?.abbreviation || null,
    jersey_number: p.jersey ? String(p.jersey) : null,
    headshot_url: p.headshot?.href || null,
    height: p.displayHeight || null,
    weight: parseWeight(p.displayWeight) || null,
    normalized_name: normalize(p.displayName) || normalize(`${p.firstName ?? ""} ${p.lastName ?? ""}`.trim())|| "Unknown"
  }));


      for (const player of players) {
        const { error } = await supabase
          .from('players')
          .upsert(player, { onConflict: ['api_player_id'] });

        if (error) console.error(`Error inserting player ${player.name}:`, error.message);
      }

      console.log(`Team ${teamId} players added/updated. Total: ${players.length}`);
    } catch (err) {
      console.error(`Failed to fetch team ${teamId} roster:`, err);
    }
  }

  console.log('All teams processed.');
}

addPlayers();
