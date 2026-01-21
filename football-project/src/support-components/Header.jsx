import {useState, useEffect} from 'react'
import styles from '/src/styling/Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
<>
       <h1 className={styles.title}>NFL Stats Tracker</h1>
              <nav className={styles.navbar}>
                <ul>
                  <li><Link to="/offense/players">Player Offensive Stats</Link></li>
                  <li><Link to="/defense/players">Player Defensive Stats</Link></li>
                  <li><Link to="/offense/teams">Team Offensive Stats</Link></li>
                  <li><Link to="/defense/teams">Team Defensive Stats</Link></li>
                  <li><Link to="/games">Games</Link></li>
                  <li><Link to="/">Home</Link></li>
                </ul>
              </nav>
</>
  )
}
