import {useState, useEffect} from 'react'
import styles from '/src/styling/OffensivePlayerStatsTable.module.css'
import { getOffensivePlayerStats } from '/src/fetch-supabase/getOffensivePlayerStats.js'
import { supabase } from '../supabaseClient.js'
import Header from '../Header.jsx'
export default function OffensivePlayerStatsTable() {
    
const [playerStats, setPlayerStats] = useState([])
  useEffect(() => {
  async function load() {
    const stats = await getOffensivePlayerStats()

    setPlayerStats(stats)
  }

  load()
}, [])
  return (
    <div className={styles.all_container}>
      <Header/>
      <h1 className={styles.title}>Offensive Player Stats</h1>
      <table>
        <thead>
              <tr className={styles.header_row}>
      <th colSpan="6"></th>
      <th colSpan="6">PASSING</th>   
      <th colSpan="3">RUSHING</th>
      <th colSpan="4">RECEIVING</th> 
    </tr>
          <tr className={styles.header_row}>
            <th>Rk</th>
          <th>PLAYER</th>
          <th>TM</th>
          <th>POS</th>
          <th>G</th>
          <th>GS</th>
          <th>ATT</th>
          <th>CMP</th>
          <th>YDS</th>
          <th>TD</th>
          <th>INT</th>
          <th>RATE</th>
          <th>ATT</th>
          <th>YDS</th>
          <th>TD</th>
          <th>REC</th>
          <th>YDS</th>
          <th>TD</th>
          <th>TGT</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player, index) => {
            const rows = []
            if(index % 22 === 0 && index != 0){
              rows.push(<tr key={`group-header-${index}`} className={styles.header_row}>
      <th colSpan="6"></th>
      <th colSpan="6">PASSING</th>   
      <th colSpan="3">RUSHING</th>
      <th colSpan="4">RECEIVING</th> 
    </tr>)
    rows.push(<tr key={`column-header-${index}`} className={styles.header_row}>
      <th>Rk</th>
          <th>PLAYER</th>
          <th>TM</th>
          <th>POS</th>
          <th>G</th>
          <th>GS</th>
          <th>ATT</th>
          <th>CMP</th>
          <th>YDS</th>
          <th>TD</th>
          <th>INT</th>
          <th>RATE</th>
          <th>ATT</th>
          <th>YDS</th>
          <th>TD</th>
          <th>REC</th>
          <th>YDS</th>
          <th>TD</th>
          <th>TGT</th>
          </tr>)
            }
            rows.push
            (
            <tr key={`player-${player.id}`}>
              <td>{index+1}</td>
              <td>{player.players.name}</td>
              <td>{player.team}</td>
              <td>{player.players.position}</td>
              <td>{player.games_played}</td>
              <td>{player.games_started}</td>
              <td>{player.passing_attempts}</td>
              <td>{player.passing_completions}</td>
              <td>{player.passing_yards}</td>
              <td>{player.passing_touchdowns}</td>
              <td>{player.interceptions}</td>
              <td>{player.passer_rating}</td>
              <td>{player.rushing_attempts}</td>
              <td>{player.rushing_yards}</td>
              <td>{player.rushing_touchdowns}</td>
              <td>{player.receptions}</td>
              <td>{player.receiving_yards}</td>
              <td>{player.receiving_touchdowns}</td>
              <td>{player.targets}</td>
            </tr>
            )
            return rows
})}
        </tbody>
      </table>
    </div>
  )
}
