import {useState, useEffect} from 'react'
import {retrieveOffensiveMaxes} from '../fetch-supabase/retrieveOffensiveMaxes.js'
import { getOffensiveGraphStats } from '../fetch-supabase/getOffensiveGraphStats.js'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import styles from '/src/styling/OffenseBarChart.module.css'
export default function OffenseBarChart({name, position, stats}) {
  const [maxes, setMaxes] = useState({})
  const [graphStats, setGraphStats] = useState([])
  useEffect(() => {
    async function load(){
      const maxStats = await retrieveOffensiveMaxes()
      setMaxes(maxStats)
      const playerStats = getOffensiveGraphStats(position, stats, maxStats)
      setGraphStats(playerStats)
      console.log(playerStats);
      
    }
    load()
  }, [])
return (
  <>

   {graphStats.length > 0 &&   position==="QB" && (
    <div className={styles.graph_container}>
      <BarChart width={500} height={400} data={graphStats}>
        <YAxis domain={[0, 100]} tick={{fill: "white"}}/>

        <CartesianGrid strokeDasharray= "6 6"/>
        <Legend 
        verticalAlign="bottom" 

        wrapperStyle={{ 
          paddingTop: "20px", 
          paddingRight: "30px", // Example of adding a right margin
          // You can also add marginTop, marginLeft, etc.
        }} />
        <Tooltip content={<CustomTooltip1/>}/>
        <Bar dataKey="CompletionPct" fill='#f017ff'/>
        <Bar dataKey="Interceptions" fill='#e8ff17'/>
        <Bar dataKey="PasserRating" fill='#17fff0'/>
        <Bar dataKey="PassingTDs" fill='#ff173a'/>
      <Bar dataKey="PassingYards" fill='#1784ff'/>
      
      
      
      </BarChart>
      </div>
  )}
  {graphStats.length > 0 && (position==="WR"||position==="TE") && (
    <div className={styles.graph_container}>
      <BarChart width={500} height={400} data={graphStats}>
        <YAxis domain={[0, 100]} tick={{fill: "white"}}/>

        <CartesianGrid strokeDasharray= "6 6"/>
        <Legend 
        verticalAlign="bottom" 

        wrapperStyle={{ 
          paddingTop: "20px", 
          paddingRight: "30px", // Example of adding a right margin
          // You can also add marginTop, marginLeft, etc.
        }} />
        <Tooltip content={<CustomTooltip2/>}/>
        <Bar dataKey="ReceivingTDs" fill='#e8ff17'/>
        <Bar dataKey="ReceivingYards" fill='#ff173a'/>
        <Bar dataKey="Receptions" fill='#17fff0'/>
        <Bar dataKey="YPR" fill='#f017ff'/>
        
        
        
      
      
      </BarChart>
      </div>
  )}
  {graphStats.length > 0 && (position==="RB") && (
    <div className={styles.graph_container}>
      <BarChart width={500} height={400} data={graphStats}>
        <YAxis tick={{fill: "white"}} domain={[0, 100]}/>

        <CartesianGrid strokeDasharray= "6 6"/>
        <Legend 
        verticalAlign="bottom" 

        wrapperStyle={{ 
          paddingTop: "20px", 
          paddingRight: "30px", // Example of adding a right margin
          // You can also add marginTop, marginLeft, etc.
        }} />
        <Tooltip content={<CustomTooltip3/>}/>
         <Bar dataKey="ReceivingYards" fill='#1784ff'/>
         <Bar dataKey="Receptions" fill='#f017ff'/>
         <Bar dataKey="RushingTDs" fill='#17fff0'/>
        <Bar dataKey="RushingYards" fill='#e8ff17'/>
        <Bar dataKey="YPC" fill='#ff173a'/>
        
        
       
        
        
      
      
      </BarChart>
      </div>
  )}
  </>
)

}

const CustomTooltip1 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#f017ff'}}>
          Completion Pct:
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#e8ff17' }}>
          Interceptions:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#17fff0'}}>
          Passer Rating:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
        <p style={{color:'#ff173a'}}>
          Passing TDs:
          <span>&nbsp;{payload[3].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#1784ff'}}>Passing Yards: 
          <span>&nbsp;{payload[4].value.toFixed(1)}</span>
        </p>
        
        
        
        
      </div>
    )
  }
}
const CustomTooltip2 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#e8ff17' }}>
          Receiving TDs:
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
         <p style={{color:'#ff173a'}}>
          Receiving Yards:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
         <p style={{color: '#17fff0'}}>
          Receptions:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#f017ff'}}>
          Y/R:
          <span>&nbsp;{payload[3].value.toFixed(1)}</span>
        </p>
        
       
       
      </div>
    )
  }
}
const CustomTooltip3 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#1784ff'}}>Receiving Yards: 
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#f017ff'}}>
          Receptions:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
         <p style={{color: '#17fff0'}}>
          Rushing TDs:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#e8ff17' }}>
          Rushing Yards:
          <span>&nbsp;{payload[3].value.toFixed(1)}</span>
        </p>
         <p style={{color:'#ff173a'}}>
          Y/C:
          <span>&nbsp;{payload[4].value.toFixed(1)}</span>
        </p>
       
      </div>
    )
  }
}