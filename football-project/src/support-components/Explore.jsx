import {useState, useEffect} from 'react'
import styles from '/src/styling/Explore.module.css'
import PassingGraph from './PassingGraph.jsx'
import RushingGraph from './RushingGraph.jsx'
import ReceivingGraph from './ReceivingGraph.jsx'
import DefenseGraph from './DefenseGraph.jsx'
export default function Explore() {
  const [selected, setSelected] = useState('')
  return (
    <div>
      <h1 className={styles.title}>Leaders</h1>
      <div className={styles.button_container}>
      <button onClick={() => setSelected('Passing')}className={selected === "Passing" ? styles.selected : styles.button}>Passing</button>
      <button onClick={() => setSelected('Rushing')} className={selected === "Rushing" ? styles.selected : styles.button}>Rushing</button>
      <button onClick={() => setSelected('Receiving')} className={selected === "Receiving" ? styles.selected : styles.button}>Receiving</button>
      <button onClick={() => setSelected('Defense')} className={selected === "Defense" ? styles.selected : styles.button}>Defense</button>
      </div>
        {selected === "Passing" && (
        <PassingGraph/>
      )}
      {selected === "Rushing" && (
        <RushingGraph/>
      )}
      {selected === "Receiving" && (
        <ReceivingGraph/>
      )}
      {selected === "Defense" && (
        <DefenseGraph/>
      )}
    </div>
  )
}
