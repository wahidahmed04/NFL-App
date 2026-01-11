import {useState, useEffect} from 'react'
import Header from './Header'
import styles from '/src/styling/Games.module.css'
export default function Games() {
  return (
    <div className={styles.all_container}>
      <Header/>
      <h1 className={styles.title}>Games</h1>
    </div>
  )
}
