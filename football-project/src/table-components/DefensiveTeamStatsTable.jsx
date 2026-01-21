import {useState, useEffect} from 'react'
import styles from '/src/styling/DefensiveTeamStatsTable.module.css'
import {getTeamStats} from '/src/fetch-supabase/getTeamStats.js'
import { supabase } from '../supabaseClient.js'
import Header from '../support-components/Header.jsx'
export default function DefensiveTeamStats() {
  const [teamStats, setTeamStats] = useState([])
  useEffect(() => {
  async function load() {
    const stats = await getTeamStats()

    const statsWithNames = await Promise.all(
      stats.map(async (team) => {
        const { data, error } = await supabase
          .from("teams")
          .select("abbreviation")
          .eq("api_team_id", team.team_id)
          .single()

        if (error) throw error

        return {
          ...team,
          teamName: data.abbreviation
        }
      })
    )

    setTeamStats(statsWithNames)
  }

  load()
}, [])
  return (
    <div className={styles.all_container}>
      <Header/>
      <h1 className={styles.title}>Defensive Team Stats</h1>
      <table>
        <thead>
          <tr className={styles.header_row}>
          <th>TM</th>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>T</th>
          <th>PAPG</th>
          <th>PYD</th>
          <th>RYD</th>
          <th>TD</th>
          <th>YPG</th>
          <th>RD%</th>
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
          <th>PAPG</th>
          <th>PYD</th>
          <th>RYD</th>
          <th>TD</th>
          <th>YPG</th>
          <th>RD%</th>
          <th>3D%</th>
          <th>SK</th>
          </tr>)
            }
            rows.push(
            <tr key={`team-${team.id}`}>
              <td>{team.teamName}</td>
              <td>{team.games_played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.ties}</td>
              <td>{team.points_allowed_per_game}</td>
              <td>{team.defensive_passing_yards}</td>
              <td>{team.defensive_rushing_yards}</td>
              <td>{team.defensive_touchdowns}</td>
              <td>{team.defensive_yards_per_game}</td>
              <td>{team.defensive_red_zone_conversion_percentage}</td>
              <td>{team.defensive_third_down_conversion_percentage}</td>
              <td>{team.defensive_sacks}</td>


            </tr>
            )
            return rows
})}
        </tbody>
      </table>
    </div>
  )
}
