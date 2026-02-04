import { useState, useEffect } from 'react'
import { getSinglePlayerStats } from '../fetch-supabase/getSinglePlayerStats.js'
import styles from '/src/styling/PlayerCard.module.css'
export default function DefensivePlayerCard({playerId, type}) {
  const [playerStats, setPlayerStats] = useState([])
  const [onBack, setOnBack] = useState(false) 
  useEffect(() => {
    async function load() {
      const stats = await getSinglePlayerStats(playerId, type)
      setPlayerStats(stats)
    }
    load()
  }, [])

  if (playerStats.length === 0) return null

  const p = playerStats[0]
  if(p.players.position === "CB" || p.players.position==="S"){
  return (
    <div onClick={() => setOnBack(!onBack)} className={styles.card_container}>
      <div className={onBack ? styles.card_flipped : styles.card}>
      <div className={styles.front}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.interceptions}</h3>
          <h3 className={styles.stat_header}>INT</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.passes_defended}</h3>
          <h3 className={styles.stat_header}>PD</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.interception_yards}</h3>
    <h3 className={styles.stat_header}>INT YDS</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.forced_fumbles}</h3>
    <h3 className={styles.stat_header}>FF</h3>
  </div>
    <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.combined_tackles}</h3>
    <h3 className={styles.stat_header}>Comb Tkl</h3>
  </div>
</div>
</div>
<div className={styles.back}>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
      <div className={styles.bio_container}>

      <h3>Age: {p.players.age}</h3>

       <h3>Height: {p.players.height}</h3>

       <h3>Weight: {p.players.weight}</h3>

       <h3>Position: {p.players.position}</h3>
       </div>
</div>
</div>
    </div>
  )
}
if(p.players.position === "LB"){
  return (
    <div onClick={() => setOnBack(!onBack)} className={styles.card_container}>
      <div className={onBack ? styles.card_flipped : styles.card}>
      <div className={styles.front}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.combined_tackles}</h3>
          <h3 className={styles.stat_header}>Comb Tkl</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.tackles_for_loss}</h3>
          <h3 className={styles.stat_header}>TFL</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.sacks}</h3>
    <h3 className={styles.stat_header}>Sacks</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.interceptions}</h3>
    <h3 className={styles.stat_header}>INT</h3>
  </div>
    <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.forced_fumbles}</h3>
    <h3 className={styles.stat_header}>FF</h3>
  </div>
</div>

    </div>
    <div className={styles.back}>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
      <div className={styles.bio_container}>

      <h3>Age: {p.players.age}</h3>

       <h3>Height: {p.players.height}</h3>

       <h3>Weight: {p.players.weight}</h3>

       <h3>Position: {p.players.position}</h3>
       </div>
</div>
    </div>
    </div>
  )
}
if(p.players.position === "DT" || p.players.position ==="DE"){
  return (
    <div onClick={() => setOnBack(!onBack)} className={styles.card_container}>
      <div className={onBack ? styles.card_flipped : styles.card}>
      <div className={styles.front}>
      <img className={styles.player_image} src={p.players.headshot_url}/>
      <div className={styles.line_break}></div>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
       <div className={styles.stats_row}>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.sacks}</h3>
          <h3 className={styles.stat_header}>Sacks</h3>
        </div>
        <div className={styles.stat_col}>
          <h3 className={styles.stats}>{p.qb_hits}</h3>
          <h3 className={styles.stat_header}>QB Hits</h3>
        </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.tackles_for_loss}</h3>
    <h3 className={styles.stat_header}>TFL</h3>
  </div>

  <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.forced_fumbles}</h3>
    <h3 className={styles.stat_header}>FF</h3>
  </div>
    <div className={styles.stat_col}>
    <h3 className={styles.stats}>{p.safeties}</h3>
    <h3 className={styles.stat_header}>Sfty</h3>
  </div>
</div>

    </div>
    <div className={styles.back}>
      <h3 className={styles.name}>{p.players.name}</h3> 
      <div className={styles.line_break}></div>
      <div className={styles.bio_container}>

      <h3>Age: {p.players.age}</h3>

       <h3>Height: {p.players.height}</h3>

       <h3>Weight: {p.players.weight}</h3>

       <h3>Position: {p.players.position}</h3>
       </div>
</div>
    </div>
    </div>
  )
}
}