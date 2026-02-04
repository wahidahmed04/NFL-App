import {supabase} from '../supabaseClient.js'
import {getDefensiveMaxStats} from './getDefensiveMaxStats.js'
export async function retrieveDefensiveMaxes(){
    const {data: players, error: playerError} = await supabase 
    .from("player_stats_defense")
    .select("*")
    if(playerError){
        console.error(playerError)
        throw playerError
    }
    
    const statKeys = [
        "sacks",
        "qb_hits",
        "tackles_for_loss",
        "forced_fumbles",
        "combined_tackles",
        "interceptions",
        "passes_defended",
        "interception_yards",
    ]
    const stats = await getDefensiveMaxStats(players, statKeys)
    return stats
}