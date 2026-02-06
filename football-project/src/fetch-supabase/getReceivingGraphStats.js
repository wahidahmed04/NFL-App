import { supabase } from "../supabaseClient.js";
export async function getReceivingGraphStats(){
    const {data: playerYards, error: yardsError} = await supabase
    .from("player_stats_offense")
    .select("players(name), receiving_yards")
    .order("receiving_yards", {ascending: false})
    .limit(5)
    if(yardsError) throw yardsError
    const {data: playerTouchdowns, error: touchdownsError} = await supabase
    .from("player_stats_offense")
    .select("players(name), receiving_touchdowns")
    .order("receiving_touchdowns", {ascending: false})
    .limit(5)
    if(touchdownsError) throw touchdownsError
    const {data: receptions, error: receptionsError} = await supabase
    .from("player_stats_offense")
    .select("players(name), receptions")
    .order("receptions", {ascending: false})
    .limit(5)
    if(receptionsError) throw receptionsError
    const {data: playerYPR, error: YPRError} = await supabase
  .from('player_stats_offense')
  .select('receiving_yards, receptions, games_played, players(position, name)')
  .in('players.position', ['WR', 'TE']);

    if(YPRError) throw YPRError
    const withDerived = playerYPR.map(p => ({
  ...p,
  YPR: p.receptions > (1.875*p.games_played) ? (p.receiving_yards / p.receptions): 0
}));
const topYPR = withDerived
  .sort((a, b) => b.YPR - a.YPR)
  .slice(0, 5);
  const res = {topYards: playerYards, topTouchdowns: playerTouchdowns, topReceptions: receptions, topYPR }
  return res
}