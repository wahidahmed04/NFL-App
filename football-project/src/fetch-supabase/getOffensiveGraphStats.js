export function getOffensiveGraphStats(position, stats, maxStats){
    let data = [];
    if(position==="QB"){
        data = [{
            PassingYards: Math.min(stats[0].passing_yards /maxStats.passing_yards *100, 100), 
            CompletionPct: Math.min((stats[0].passing_completions/stats[0].passing_attempts * 100) /maxStats.completion_pct * 100, 100),
        PassingTDs: Math.min(stats[0].passing_touchdowns / maxStats.passing_touchdowns * 100, 100),
    Interceptions: Math.min((1- stats[0].interceptions/maxStats.interceptions) * 100, 100),
PasserRating: Math.min(stats[0].passer_rating / maxStats.passer_rating * 100, 100)
}]
    }
    if(position==="WR" || position==="TE"){
        data = [
            {YPR: stats[0].receptions === 0 ? 0 : Math.min((stats[0].receiving_yards/stats[0].receptions)/maxStats.ypr * 100, 100),
            ReceivingTDs: Math.min(stats[0].receiving_touchdowns / maxStats.receiving_touchdowns * 100, 100),
            Receptions: Math.min(stats[0].receptions / maxStats.receptions * 100, 100),
            ReceivingYards: Math.min(stats[0].receiving_yards / maxStats.receiving_yards * 100, 100)}
        ]
    }
    if(position==="RB"){
        data = [
            {RushingYards: Math.min(stats[0].rushing_yards /maxStats.rushing_yards * 100, 100),
            YPC: stats[0].rushing_attempts === 0 ? 0 : Math.min((stats[0].rushing_yards/stats[0].rushing_attempts) / maxStats.ypc * 100, 100),
            RushingTDs: Math.min(stats[0].rushing_touchdowns / maxStats.rushing_touchdowns * 100, 100),
            Receptions: Math.min(stats[0].receptions / maxStats.receptions * 100, 100),
            ReceivingYards: Math.min(stats[0].receiving_yards / maxStats.receiving_yards * 100, 100)}
        ]
    }
    return data
}