import {useState, useEffect} from 'react'
import styles from '/src/styling/OffensivePlayerStatsTable.module.css'
import { getOffensivePlayerStats } from '/src/fetch-supabase/getOffensivePlayerStats.js'
import { supabase } from '../supabaseClient.js'
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
    <div>
      <h1>Offensive Player Stats</h1>
      <table>
        <caption>Offensive Player Stats Table</caption>
        <thead>
          <tr>
          <th>PLAYER</th>
          <th>TM</th>
          <th>G</th>
          <th>GS</th>
          <th>PASS_ATT</th>
          <th>PASS_CMP</th>
          <th>PASS_YDS</th>
          <th>PASS_TDS</th>
          <th>INT</th>
          <th>PASS_RATE</th>
          <th>RUSH_ATT</th>
          <th>RUSH_YDS</th>
          <th>RUSH_TDS</th>
          <th>REC</th>
          <th>REC_YDS</th>
          <th>REC_TDS</th>
          <th>TGT</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player) => {

            return(
            <tr key={player.id}>
              <td>{player.players.name}</td>
              <td>{player.team}</td>
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
})}
        </tbody>
      </table>
    </div>
  )
}
