import { Link, useLocation } from 'react-router-dom'
import styles from '/src/styling/Header.module.css'

export default function Header() {
  const location = useLocation() // gets current path

  const navItems = [
    { to: '/offense/players', label: 'Player Offensive Stats' },
    { to: '/defense/players', label: 'Player Defensive Stats' },
    { to: '/offense/teams', label: 'Team Offensive Stats' },
    { to: '/defense/teams', label: 'Team Defensive Stats' },
    { to: '/games', label: 'Games' },
    { to: '/graphs', label: 'Graphs' },
    { to: '/', label: 'Home' }
  ]

  return (
    <>
      <h1 className={styles.title}>NFL Stats Tracker</h1>
      <nav className={styles.navbar}>
        <ul>
          {navItems.map(item => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? styles.selected : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
