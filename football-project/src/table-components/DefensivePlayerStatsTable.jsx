import {useState, useEffect} from 'react'
import styles from '/src/styling/DefensivePlayerStatsTable.module.css'
import { getDefensivePlayerStats } from '/src/fetch-supabase/getDefensivePlayerStats.js'
import { supabase } from '../supabaseClient.js'
export default function DefensivePlayerStatsTable() {
    const abbreviationMap = {
  "ARI": "ARI",
  "ATL": "ATL",
  "BAL": "BAL",
  "BUF": "BUF",
  "CAR": "CAR",
  "CHI": "CHI",
  "CIN": "CIN",
  "CLE": "CLE",
  "DAL": "DAL",
  "DEN": "DEN",
  "DET": "DET",
  "GNB": "GB",
  "HOU": "HOU",
  "IND": "IND",
  "JAX": "JAX",
  "KAN": "KC",
  "LVR": "LV",
  "LAC": "LAC",
  "LAR": "LAR",
  "MIA": "MIA",
  "MIN": "MIN",
  "NWE": "NE",
  "NOR": "NO",
  "NYG": "NYG",
  "NYJ": "NYJ",
  "PHI": "PHI",
  "PIT": "PIT",
  "SFO": "SF",
  "SEA": "SEA",
  "TAM": "TB",
  "TEN": "TEN",
  "WAS": "WSH"
}
const [playerStats, setPlayerStats] = useState([])
  useEffect(() => {
  async function load() {
    const stats = await getDefensivePlayerStats()

    setPlayerStats(stats)
  }

  load()
}, [])
  return (
    <div>
      <h1>Defensive Player Stats</h1>
      <table>
        <caption>Defensive Player Stats Table</caption>
        <thead>
          <tr>
          <th>PLAYER</th>
          <th>TM</th>
          <th>G</th>
          <th>GS</th>
          <th>INT</th>
          <th>INT_YDS</th>
          <th>INT_TDS</th>
          <th>PD</th>
          <th>FF</th>
          <th>FMB</th>
          <th>FR</th>
          <th>FMB_YDS</th>
          <th>FRTD</th>
          <th>COMB_TCKL</th>
          <th>SOLO_TCKL</th>
          <th>AST_TCKL</th>
          <th>TFL</th>
          <th>QBHITS</th>
          <th>SK</th>
          <th>SFTY</th>
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
              <td>{player.interceptions}</td>
              <td>{player.interception_yards}</td>
              <td>{player.interception_touchdowns}</td>
              <td>{player.passes_defended}</td>
              <td>{player.forced_fumbles}</td>
              <td>{player.fumbles}</td>
              <td>{player.fumbles_recovered}</td>
              <td>{player.recovered_fumble_yards}</td>
              <td>{player.fumble_return_touchdowns}</td>
              <td>{player.combined_tackles}</td>
              <td>{player.solo_tackles}</td>
              <td>{player.assisted_tackles}</td>
              <td>{player.tackles_for_loss}</td>
              <td>{player.qb_hits}</td>
              <td>{player.sacks}</td>
              <td>{player.safeties}</td>
            </tr>
            )
})}
        </tbody>
      </table>
    </div>
  )
}
