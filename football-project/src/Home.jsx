import {useState, useEffect} from 'react'
import styles from '/src/styling/Home.module.css'
import {getRecentGames} from '/src/fetch-supabase/getRecentGames.js'
import { Link } from 'react-router-dom'
import Header from './Header'
export default function Home() {
  const [recentGames, setRecentGames] = useState([])
  useEffect(() => {
  async function load() {
    const games = await getRecentGames()
    setRecentGames(games)
  }

  load()
}, [])

  return (
    <div className={styles.all_container}>
        <Header/>
        <h1 className={styles.recent_header}>Recent Games</h1>
        <div className={styles.games_container}>
        {recentGames.map((game) => {
          return (
            <div key={game.id} className={styles.game_container}>
              <div className={styles.scores}>
                <img src={game.home_team.logo_url} className={styles.team_img}/>
                <span>{game.home_score}</span>
                <span>-</span>
                <span>{game.away_score}</span>
                <img src={game.away_team.logo_url} className={styles.team_img}/>
                <div className={styles.break}></div>
                <span className={styles.smaller}>{game.home_team.abbreviation}</span>
                <span className={styles.smaller}>vs</span>
                <span className={styles.smaller}>{game.away_team.abbreviation}</span>
              </div>
            
              
            </div>
          )
        })}
        </div>
    </div>
  )
}
