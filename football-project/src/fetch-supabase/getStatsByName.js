import { supabase } from "/src/supabaseClient.js";

export async function getStatsByName(name) {
  if (!name) return []

  const { data, error } = await supabase
    .from("players")
    .select("id, position")
    .eq("name", name)
    .single()

  if (error || !data) {
    console.error(error)
    return []
  }

  const { id, position } = data

  if (["QB", "RB", "WR", "TE"].includes(position)) {
    const { data: stats, error } = await supabase
      .from("player_stats_offense")
      .select("*")
      .eq("player_id", id)

    if (error) {
      console.error(error)
      return []
    }

    return stats
  }

  if (["DT", "DE", "CB", "S", "LB"].includes(position)) {
    const { data: stats, error } = await supabase
      .from("player_stats_defense")
      .select("*")
      .eq("player_id", id)

    if (error) {
      console.error(error)
      return []
    }

    return stats
  }

  return []
}
