import {useState, useEffect} from 'react'
import styles from '/src/styling/DefensiveTeamStatsTable.module.css'
import {getTeamStats} from '/src/fetch-supabase/getTeamStats.js'
import { supabase } from '../supabaseClient.js'
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
    <div>
      <h1>Defensive Stats</h1>
      <table>
        <caption>Team Defensive Stats Table</caption>
        <thead>
          <tr>
          <th>TM</th>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>T</th>
          <th>PAPG</th>
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
})}
        </tbody>
      </table>
    </div>
  )
}
