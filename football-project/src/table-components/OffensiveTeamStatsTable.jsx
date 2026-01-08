import {useState, useEffect} from 'react'
import styles from '/src/styling/OffensiveTeamStatsTable.module.css'
import {getTeamStats} from '../fetch-supabase/getTeamStats.js'
import { supabase } from '../supabaseClient.js'
export default function OffensiveTeamStatsTable() {
  
  const [teamStats, setTeamStats] = useState([])
  useEffect(() => {
  async function load() {
    const stats = await getTeamStats()

    setTeamStats(stats)
  }

  load()
}, [])
  return (
    <div>
      <h1 className={styles.title}>Offensive Stats</h1>
      <table>
        <caption>Team Offensive Stats Table</caption>
        <thead>
          <tr>
          <th>TM</th>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>T</th>
          <th>PPG</th>
          <th>PASS_YDS</th>
          <th>RUSH_YDS</th>
          <th>TDS</th>
          <th>YPG</th>
          <th>RDZN_CONV%</th>
          <th>THRD_DOWN_CONV%</th>
          <th>SK</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.map((team) => {

            return(
            <tr key={team.id}>
              <td>{team.teams.abbreviation}</td>
              <td>{team.games_played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.ties}</td>
              <td>{team.points_per_game}</td>
              <td>{team.total_passing_yards}</td>
              <td>{team.total_rushing_yards}</td>
              <td>{team.total_touchdowns}</td>
              <td>{team.offensive_yards_per_game}</td>
              <td>{team.offensive_red_zone_conversion_percentage}</td>
              <td>{team.offensive_third_down_conversion_percentage}</td>
              <td>{team.offensive_sacks}</td>


            </tr>
            )
})}
        </tbody>
      </table>
    </div>
  )
}
