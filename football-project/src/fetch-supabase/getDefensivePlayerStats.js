import { supabase } from "/src/supabaseClient.js";
export async function getDefensivePlayerStats() {
  let all = [];
  let from = 0;
  const size = 500; // smaller page avoids payload limits

  while (true) {
    const { data, error } = await supabase
      .from("player_stats_defense")
      .select(`
        *,
        players (
          name,
          position
        )
      `)
      .order("score", { ascending: false })
      .order("id", { ascending: false })
      .range(from, from + size - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    all.push(...data);
    if (data.length < size) break;

    from += size;
  }

  return all;
}
