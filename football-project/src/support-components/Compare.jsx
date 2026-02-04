import { useState, useEffect } from 'react'
import { supabase } from '/src/supabaseClient.js'
import styles from '/src/styling/Compare.module.css'
import { getStatsByName } from '../fetch-supabase/getStatsByName'
import OffenseBarChart from './OffenseBarChart.jsx'
import DefensiveBarChart from './DefensiveBarChart.jsx'
import DefensivePlayerCard from './DefensivePlayerCard.jsx'
import PlayerCard from './PlayerCard.jsx'
export default function Compare() {
  const [inputOne, setInputOne] = useState('')
  const [inputTwo, setInputTwo] = useState('')
  const [playerNames, setPlayerNames] = useState([])
  const [selectedNameOne, setSelectedNameOne] = useState('')
  const [selectedNameTwo, setSelectedNameTwo] = useState('') 
  const offensivePositions = ["QB", "WR", "RB", "TE"]
  const defensivePositions = ["DT", "DE", "CB", "S", "LB"]
  const [statsOne, setStatsOne] = useState([])
  const [statsTwo, setStatsTwo] = useState([])
  const [positionOne, setPositionOne] = useState('')
  const [positionTwo, setPositionTwo] = useState('')
  useEffect(() => {
  async function load() {
    try {


      // Helper to fetch all rows with pagination
      async function fetchAll(table, foreignKey) {
        let allData = [];
        let from = 0;
        const batchSize = 1000;

        while (true) {
          const { data, error } = await supabase
            .from(table)
            .select(`${foreignKey} (name, position, id)`)
            .range(from, from + batchSize - 1);

          if (error) throw error;
          if (!data || data.length === 0) break;

          allData.push(...data);
          from += batchSize;
        }

        return allData;
      }

      // Fetch offense and defense
      const offense = await fetchAll("player_stats_offense", "players:player_stats_player_id_fkey");
      const defense = await fetchAll("player_stats_defense", "players:player_stats_defense_player_id_fkey");

      // Filter by allowed positions in JS
      const offenseFiltered = offense
        .map(p => ({
          name: p.players?.name,
          position: p.players?.position,
          id: p.players?.id
        }))
        .filter(p => p.name && offensivePositions.includes(p.position));

      const defenseFiltered = defense
        .map(p => ({
          name: p.players?.name,
          position: p.players?.position,
          id: p.players?.id
        }))
        .filter(p => p.name && defensivePositions.includes(p.position));

      // Combine and remove duplicates
      const allPlayers = [...offenseFiltered, ...defenseFiltered];
      const uniquePlayers = Array.from(
        new Map(allPlayers.map(p => [p.name, p])).values()
      );

      setPlayerNames(uniquePlayers);

      
    } catch (error) {
      console.error(error);
    }
  }

  load();
}, []);

useEffect(() => {
  if(!selectedNameOne) return
  async function load(){
  const stats = await getStatsByName(selectedNameOne)
  setStatsOne(stats)
  }
  load()
}, [selectedNameOne])
useEffect(() => {
  if(!selectedNameTwo) return
  async function load(){
  const stats = await getStatsByName(selectedNameTwo)
  setStatsTwo(stats)
  }
  load()
}, [selectedNameTwo])
  function getSuggestions(input) {
    if (!input) return []
    return playerNames
      .filter(obj =>
        obj.name.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 5)
  }

  const suggestionsOne = getSuggestions(inputOne)
  const suggestionsTwo = getSuggestions(inputTwo)

  return (
    <div className={styles.all_container}>
      {/* Player 1 */}
      <div className={styles.inputs_container}>
      <div className={styles.input_block}>

        <input className={styles.name_input}
          value={inputOne}
          onChange={e => {setInputOne(e.target.value); setSelectedNameOne(''); setStatsOne([])}}
          placeholder="Search player 1"
        />
        {suggestionsOne.length > 0 && !selectedNameOne && (
          <div className={styles.results_container}>
            {suggestionsOne.map(obj => (
              <div key={obj.name} className={styles.individual_result_container}>
              <h3 className={styles.individual_result}
                onClick={() => {setInputOne(obj.name); 
                  setSelectedNameOne(obj.name);
                  setPositionOne(obj.position)

                }}
              >
                {obj.name}
              </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Player 2 */}
      <div className={styles.input_block}>

        <input className={styles.name_input}
          value={inputTwo}
          onChange={e => {setInputTwo(e.target.value); setSelectedNameTwo(''); setStatsTwo([])}}
          placeholder="Search player 2"
        />
        {suggestionsTwo.length > 0 && !selectedNameTwo && (
          <div className={styles.results_container}>
            {suggestionsTwo.map(obj => (
              <div key={obj.name} className={styles.individual_result_container}>
              <h3 className={styles.individual_result}
                onClick={() => {setInputTwo(obj.name); setSelectedNameTwo(obj.name);
                  setPositionTwo(obj.position)
                }}
              >
                {obj.name}
              </h3>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <div className={styles.card_graph_container}>
        <div className={styles.first_card_graph_container}>
      {selectedNameOne && statsOne.length > 0 && (
          <>
          {["WR", "QB", "TE", "RB"].includes(positionOne) && (
            <div>
            <div className={styles.card_container}>
            <PlayerCard playerId={statsOne[0].player_id} type="Offense"/>
            </div>
            <OffenseBarChart name={selectedNameOne} position={positionOne} stats={statsOne}/>
            </div>
          )}
          {["DE", "DT", "S", "CB", "LB"].includes(positionOne) && (
            <div>
            <div className={styles.card_container}>
            <DefensivePlayerCard playerId={statsOne[0].player_id} type="Defense"/>
            </div>
            <DefensiveBarChart name={selectedNameOne} position={positionOne} stats={statsOne}/>
            </div>
          )}
          </>
        
)}
</div>
<div className={styles.second_card_graph_container}>
{selectedNameTwo && statsTwo.length > 0 && (
        <>
        {["WR", "QB", "TE", "RB"].includes(positionTwo) && (
          <div>
          <div className={styles.second_card_container}>
            <PlayerCard playerId={statsTwo[0].player_id} type="Offense"/>
          </div>
          <OffenseBarChart name={selectedNameTwo} position={positionTwo} stats={statsTwo}/>
          </div>
          )}
        {["DE", "DT", "S", "CB", "LB"].includes(positionTwo) && (
          <div>
          <div className={styles.second_card_container}>
            <DefensivePlayerCard playerId={statsTwo[0].player_id} type="Defense"/>
            </div>
            <DefensiveBarChart name={selectedNameTwo} position={positionTwo} stats={statsTwo}/>
            </div>
          )}
          </>

    
)}
</div>
</div>
{((selectedNameOne && statsOne.length > 0) || (selectedNameTwo && statsTwo.length > 0)) && (
<h3 className={styles.footnote}>Graph values represent a performance grade (0–100), not raw statistical totals.</h3>
)}
    </div>
  )
}
