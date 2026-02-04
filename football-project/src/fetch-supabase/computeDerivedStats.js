export function computeDerivedStats(player) {
  return {
    ypr:
      player.receptions > 0
        ? player.receiving_yards / player.receptions
        : 0,

    ypc:
      player.rushing_attempts > 0
        ? player.rushing_yards / player.rushing_attempts
        : 0,

    completion_pct:
      player.passing_attempts > 0
        ? (player.passing_completions / player.passing_attempts) * 100
        : 0
  }
}
