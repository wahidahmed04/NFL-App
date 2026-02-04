export function getDefensiveGraphStats(position, stats, maxStats){
    let data = [];
    if(position==="DE" || position==="DT"){
        data = [{
            Sacks: maxStats.sacks === 0 ? 0 : Math.min(stats[0].sacks /maxStats.sacks *100, 100), 
            QBHits: maxStats.qb_hits === 0 ? 0: Math.min(stats[0].qb_hits/maxStats.qb_hits * 100, 100),
        TacklesForLoss: Math.min(stats[0].tackles_for_loss / maxStats.tackles_for_loss * 100, 100),
    ForcedFumbles: Math.min(stats[0].forced_fumbles/maxStats.forced_fumbles * 100, 100),
CombinedTackles: Math.min(stats[0].combined_tackles / maxStats.combined_tackles * 100, 100)
}]
    }
    if(position==="LB"){
        data = [
            {
                Sacks: maxStats.sacks === 0 ? 0 : Math.min(stats[0].sacks /maxStats.sacks *100, 100), 
            TacklesForLoss: Math.min(stats[0].tackles_for_loss / maxStats.tackles_for_loss * 100, 100),
    ForcedFumbles: Math.min(stats[0].forced_fumbles/maxStats.forced_fumbles * 100, 100),
CombinedTackles: Math.min(stats[0].combined_tackles / maxStats.combined_tackles * 100, 100),
Interceptions: Math.min(stats[0].interceptions/maxStats.interceptions * 100, 100)
        }
        ]
    }
    if(position==="CB"||position==="S"){
        data = [
            {
            Interceptions: Math.min(stats[0].interceptions/maxStats.interceptions * 100, 100),
            CombinedTackles: Math.min(stats[0].combined_tackles / maxStats.combined_tackles * 100, 100),
            PassesDefended: Math.min(stats[0].passes_defended / maxStats.passes_defended * 100, 100),
            InterceptionYards: Math.min(stats[0].interception_yards / maxStats.interception_yards * 100, 100)}
        ]
    }
    return data
}