import { supabase } from "/src/supabaseClient.js";
export async function getAllGames(){
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
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}