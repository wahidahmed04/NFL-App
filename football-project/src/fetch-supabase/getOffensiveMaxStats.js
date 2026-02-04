export function getOffensiveMaxStats(players, statKeys) {
  return players.reduce((maxes, player) => {
    statKeys.forEach(key => {
      if (!isQualified(player, key)) return
      const value = player[key]
      if (value != null) {
        maxes[key] = Math.max(maxes[key] ?? 0, value)
      }
    })
    return maxes
  }, {})
}

function isQualified(player, statKey) {
  switch (statKey) {
    case 'completion_pct':
      return player.passing_attempts >= 100
    case 'ypc':
      return player.rushing_attempts >= 50
    case 'ypr':
      return player.receptions >= 40
    case 'passer_rating':
      return player.passing_attempts >= player.games_played*14
    default:
      return true
  }
}