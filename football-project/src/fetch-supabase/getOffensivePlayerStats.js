import { supabase } from "/src/supabaseClient.js";
export async function getOffensivePlayerStats(){
    const {data, error} = await supabase
      .from("player_stats_offense")
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