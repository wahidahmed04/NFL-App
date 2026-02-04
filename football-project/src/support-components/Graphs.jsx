import {useState, useEffect} from 'react'
import Header from './Header.jsx'
import styles from '/src/styling/Graphs.module.css'
import Compare from './Compare.jsx'
import Explore from './Explore.jsx'

export default function Graphs() {
    const [selected, setSelected] = useState('Compare')
  return (
    <div className={styles.all_container}>
        <Header/>
        <h1 className={styles.title}>Graphs</h1>
        <div className={styles.button_container}>
        <button className={selected === 'Compare' ? styles.selected_graph_header_button :
        styles.graph_header_button} onClick={() => setSelected('Compare')}>
            Compare
        </button>
        <button className={selected === 'Explore' ? styles.selected_graph_header_button :
            styles.graph_header_button} onClick={() => setSelected('Explore')}>
            Explore
        </button>
        
        </div>
        {selected === 'Compare' ? (
            <Compare/>
        ) :
        <Explore />
        }
    </div>
  )
}
