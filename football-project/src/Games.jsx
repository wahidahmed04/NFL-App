import {useState, useEffect} from 'react'
import Header from './Header'
import styles from '/src/styling/Games.module.css'
import {getAllGames} from '/src/fetch-supabase/getAllGames.js'
export default function Games() {
  const [games, setGames] = useState([])
  const [week, setWeek] = useState(0)
  const [weekGames, setWeekGames] = useState([])
  let maxWeek = 18
  useEffect(() => {
  async function load() {
    const dbGames = await getAllGames()
    setGames(dbGames)
    setWeek(dbGames[0].week)
    getWeek(dbGames[0].week, dbGames)
    maxWeek = dbGames[0].week
  }

  load()
}, [])
  const getWeek = (week, arr) => {
    setWeekGames(arr.filter((game) => game.week === week))
  }
  return (
    <div className={styles.all_container}>
      <Header/>
      <h1 className={styles.title}>Games</h1>
      <div className={styles.fl}>
      <button onClick={()=> {
        if(week > 1){
        setWeek(week-1); getWeek(week-1, games)}}
        } className={styles.button}>Previous</button>
      <h1 className={styles.week_header}>Week {week}</h1>
      
      <button onClick={()=> {
        if(week < 18){setWeek(week+1);getWeek(week+1, games)}
        }} className={styles.button}>Next</button>

      </div>
        <div className={styles.games_container}>
        {weekGames.map((game) => {
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
        }

        
      )}
    </div>
    </div>
  )
}
