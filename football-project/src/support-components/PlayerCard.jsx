import { useState, useEffect } from 'react'
import { getSinglePlayerStats } from '../fetch-supabase/getSinglePlayerStats.js'
import styles from '/src/styling/PlayerCard.module.css'
export default function PlayerCard({playerId, type}) {
  const [playerStats, setPlayerStats] = useState([])

  useEffect(() => {
    async function load() {
      const stats = await getSinglePlayerStats(playerId, type)
      setPlayerStats(stats)
    }
    load()
  }, [])

  if (playerStats.length === 0) return null

  const p = playerStats[0]
  if(p.players.position === "QB"){
  return (
    <div className={styles.card_container}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{((p.passing_completions / p.passing_attempts) * 100).toFixed(1)}</h3>
          <h3 className={styles.stat_header}>Cmp%</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{(p.passing_yards / p.games_played).toFixed(0)}</h3>
          <h3 className={styles.stat_header}>P YPG</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{(p.passing_touchdowns / p.interceptions).toFixed(1)}</h3>
    <h3 className={styles.stat_header}>TD/INT</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.passer_rating.toFixed(1)}</h3>
    <h3 className={styles.stat_header}>RTG</h3>
  </div>
</div>

    </div>
  )
}
else if(p.players.position === "RB"){
  return (
    <div className={styles.card_container}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{(p.rushing_yards / p.games_played).toFixed(0)}</h3>
          <h3 className={styles.stat_header}>Rush YPG</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{(p.rushing_yards / p.rushing_attempts).toFixed(1)}</h3>
          <h3 className={styles.stat_header}>YPC</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.rushing_touchdowns}</h3>
    <h3 className={styles.stat_header}>Rush TD</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.receptions}</h3>
    <h3 className={styles.stat_header}>Rec</h3>
  </div>
  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.receiving_yards}</h3>
    <h3 className={styles.stat_header}>Rec Yds</h3>
  </div>
</div>

    </div>
  )
}
if(p.players.position === "WR" || p.players.position==="TE"){
  return (
    <div className={styles.card_container}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.receptions}</h3>
          <h3 className={styles.stat_header}>Rec</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{(p.receiving_yards / p.games_played).toFixed(0)}</h3>
          <h3 className={styles.stat_header}>Rec YPG</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{(p.receiving_yards / p.receptions).toFixed(1)}</h3>
    <h3 className={styles.stat_header}>Yds/Rec</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.receiving_touchdowns}</h3>
    <h3 className={styles.stat_header}>Rec TD</h3>
  </div>
</div>

    </div>
  )
}
}