import { supabase } from "../supabaseClient.js";
export async function getDefenseGraphStats(){
    const {data: playerSacks, error: sacksError} = await supabase
    .from("player_stats_defense")
    .select("players(name), sacks")
    .order("sacks", {ascending: false})
    .limit(5)
    if(sacksError) throw sacksError
    const {data: playerQBHits, error: QBHitsError} = await supabase
    .from("player_stats_defense")
    .select("players(name), qb_hits")
    .order("qb_hits", {ascending: false})
    .limit(5)
    if(QBHitsError) throw QBHitsError
    const {data: playerTFL, error: TFLError} = await supabase
  .from('player_stats_defense')
  .select('players(name), tackles_for_loss')
  .order("tackles_for_loss", {ascending: false})
  .limit(5)
  if(TFLError) throw TFLError
  const {data: playerTackles, error: TacklesError} = await supabase
  .from('player_stats_defense')
  .select('players(name), combined_tackles')
  .order("combined_tackles", {ascending: false})
  .limit(5)
  if(TacklesError) throw TacklesError
  const {data: playerInt, error: IntError} = await supabase
  .from('player_stats_defense')
  .select('players(name), interceptions')
  .order("interceptions", {ascending: false})
  .limit(5)
  if(IntError) throw IntError
  const {data: playerPD, error: PDsError} = await supabase
  .from('player_stats_defense')
  .select('players(name), passes_defended')
  .order("passes_defended", {ascending: false})
  .limit(5)
  if(PDsError) throw PDsError
  const {data: playerFF, error: FFError} = await supabase
  .from('player_stats_defense')
  .select('players(name), forced_fumbles')
  .order("forced_fumbles", {ascending: false})
  .limit(5)
  if(FFError) throw FFError
  const res = {topSacks: playerSacks, topQBHits: playerQBHits, topTFL: playerTFL, topTackles: playerTackles, topInt: playerInt, topPD: playerPD, topFF: playerFF}
  return res
}