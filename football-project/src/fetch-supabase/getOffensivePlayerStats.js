import { supabase } from "/src/supabaseClient.js";
export async function getOffensivePlayerStats(){
    const {data, error} = await supabase
      .from("offensive_ranking")
  .select(`
    *,
    players (
      name,
      position
    )
  `).order('total_offense_score', {ascending: false}).limit(2000)
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}