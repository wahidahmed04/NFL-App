import { supabase } from "/src/supabaseClient.js";
export async function getDefensivePlayerStats(){
    const {data, error} = await supabase
    .from("player_stats_defense")
    .select(`
    *,
    players (
      name,
      position
    )
  `)
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}