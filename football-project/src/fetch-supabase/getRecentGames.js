import { supabase } from "/src/supabaseClient.js";
export async function getRecentGames(){
    const {data, error} = await supabase
      .from("games")
  .select(`
    *,
    home_team:home_team_id (
      abbreviation,
      logo_url
    ),
    away_team:away_team_id (
      abbreviation,
      logo_url
    )
  `)
  .order("game_date", { ascending: false })
  .limit(6);
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}