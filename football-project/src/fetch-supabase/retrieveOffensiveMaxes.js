import {supabase} from '../supabaseClient.js'
import { computeDerivedStats } from './computeDerivedStats.js'
import {getOffensiveMaxStats} from './getOffensiveMaxStats.js'
export async function retrieveOffensiveMaxes(){
    const {data: players, error: playerError} = await supabase 
    .from("player_stats_offense")
    .select("*")
    if(playerError){
        console.error(playerError)
        throw playerError
    }
    const allPlayers = players.map((player, index) => {
        return {
        ...player,
        ...computeDerivedStats(player)
        }
})
    const statKeys = [
        "passing_yards",
        "completion_pct",
        "passing_touchdowns",
        "interceptions",
        "passer_rating",
        "rushing_yards",
        "ypc",
        "rushing_touchdowns",
        "receptions",
        "receiving_yards",
        "ypr",
        "receiving_touchdowns"
    ]
    const stats = await getOffensiveMaxStats(allPlayers, statKeys)
    return stats
}