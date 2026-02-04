import { supabase } from "../supabaseClient.js";
export async function getRushingGraphStats(){
    const {data: playerYards, error: yardsError} = await supabase
    .from("player_stats_offense")
    .select("player_id, rushing_yards")
    .order("rushing_yards", {ascending: false})
    .limit(5)
    if(yardsError) throw yardsError
    const {data: playerTouchdowns, error: touchdownsError} = await supabase
    .from("player_stats_offense")
    .select("player_id, rushing_touchdowns")
    .order("rushing_touchdowns", {ascending: false})
    .limit(5)
    if(touchdownsError) throw touchdownsError
    const {data: playerYPC, error: YPCError} = await supabase
  .from('player_stats_offense')
  .select('player_id, rushing_attempts, rushing_yards, games_played, players(position)')
  .eq('players.position', 'RB');

    if(YPCError) throw YPCError
    const withDerived = playerYPC.map(p => ({
  ...p,
  YPC: p.rushing_attempts > (6.25*p.games_played) ? (p.rushing_yards / p.rushing_attempts): 0
}));
const topYPC = withDerived
  .sort((a, b) => b.YPC - a.YPC)
  .slice(0, 5);
  const res = {topYards: playerYards, topTouchdowns: playerTouchdowns, topYPC}
  return res
}