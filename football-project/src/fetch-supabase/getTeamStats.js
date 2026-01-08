import { supabase } from "/src/supabaseClient.js";

export async function getTeamStats(){
    const {data, error} = await supabase
    .from("team_stats")
    .select(`
    *,
    teams (
      abbreviation
    )
  `)
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}
const stats = await getTeamStats()
console.log(stats)