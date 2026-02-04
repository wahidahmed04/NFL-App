import {supabase} from '/src/supabaseClient.js'
export async function getSinglePlayerStats(playerId, type) {
    if(type === "Offensive" || type === "offensive" || type === "Offense" || type === "offense"){
    const {data, error} = await supabase
    .from("player_stats_offense")
    .select(`
    *,
    players (
    name,
    position,
    headshot_url,
    jersey_number, 
    height,
    weight, 
    age
    )
  `)
  .eq("player_id", playerId)
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
    }
    else {
        const {data, error} = await supabase
    .from("player_stats_defense")
    .select(` 
    *,
    players (
    name,
    position,
    headshot_url,
    jersey_number, 
    height,
    weight, 
    age
    )
  `)
  .eq("player_id", playerId)
  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
    }
}


