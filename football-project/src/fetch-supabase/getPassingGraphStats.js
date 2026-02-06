import { supabase } from "../supabaseClient.js";
export async function getPassingGraphStats(){
    const {data: playerYards, error: yardsError} = await supabase
    .from("player_stats_offense")
    .select("passing_yards, players(name)")
    .order("passing_yards", {ascending: false})
    .limit(5)
    if(yardsError) throw yardsError
    const {data: playerTouchdowns, error: touchdownsError} = await supabase
    .from("player_stats_offense")
    .select("players(name), passing_touchdowns")
    .order("passing_touchdowns", {ascending: false})
    .limit(5)
    if(touchdownsError) throw touchdownsError
    const {data: playerCompletion, error: completionError} = await supabase
  .from('player_stats_offense')
  .select('passing_attempts, passing_completions, games_played, players(name, position)')
  .eq('players.position', 'QB');

    if(completionError) throw completionError
    const withDerived = playerCompletion.map(p => ({
  ...p,
  completion_pct: p.passing_attempts > (14*p.games_played) ? (p.passing_completions / p.passing_attempts) * 100 : 0
}));
const topCompletion = withDerived
  .sort((a, b) => b.completion_pct - a.completion_pct)
  .slice(0, 5);
  const res = {topYards: playerYards, topTouchdowns: playerTouchdowns, topCompletion}
  return res
}