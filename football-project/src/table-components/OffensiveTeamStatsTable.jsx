import {useState, useEffect} from 'react'
import styles from '/src/styling/OffensiveTeamStatsTable.module.css'
import {getTeamStats} from '../fetch-supabase/getTeamStats.js'
import { supabase } from '../supabaseClient.js'
import Header from '../support-components/Header.jsx'
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
    <div className={styles.all_container}>
      <Header/>
      <h1 className={styles.title}>Offensive Team Stats</h1>
      <table>
        <thead>
          <tr className={styles.header_row}>
          <th>TM</th>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>T</th>
          <th>PPG</th>
          <th>PYD</th>
          <th>RYD</th>
          <th>TD</th>
          <th>YPG</th>
          <th>RZ%</th>
          <th>3D%</th>
          <th>SK</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.map((team, index) => {
            const rows = []
            if(index % 20 === 0 && index != 0){
              rows.push(<tr key={`column-header-${index}`} className={styles.header_row}>
          <th>TM</th>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>T</th>
          <th>PPG</th>
          <th>PYD</th>
          <th>RYD</th>
          <th>TD</th>
          <th>YPG</th>
          <th>RZ%</th>
          <th>3D%</th>
          <th>SK</th>
          </tr>)
            }
            rows.push
            (
            <tr key={`team-${team.id}`}>
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
            return rows
})}
        </tbody>
      </table>
    </div>
  )
}
