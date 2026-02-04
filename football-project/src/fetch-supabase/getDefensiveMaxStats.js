export function getDefensiveMaxStats(players, statKeys) {
  return players.reduce((maxes, player) => {
    statKeys.forEach(key => {
      const value = player[key]
      if (value != null) {
        maxes[key] = Math.max(maxes[key] ?? 0, value)
      }
    })
    return maxes
  }, {})
}
