import {useState, useEffect} from 'react'
import {retrieveDefensiveMaxes} from '../fetch-supabase/retrieveDefensiveMaxes.js'
import { getDefensiveGraphStats } from '../fetch-supabase/getDefensiveGraphStats.js'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import styles from '/src/styling/OffenseBarChart.module.css'
export default function OffenseBarChart({name, position, stats}) {
  const [maxes, setMaxes] = useState({})
  const [graphStats, setGraphStats] = useState([])
  useEffect(() => {
    async function load(){
      const maxStats = await retrieveDefensiveMaxes()
      setMaxes(maxStats)
      const playerStats = getDefensiveGraphStats(position, stats, maxStats)
      setGraphStats(playerStats)
      console.log(playerStats);
      
    }
    load()
  }, [])
return (
  <>

   {graphStats.length > 0 && (position==="DE"||position==="DT") && (
    <div className={styles.graph_container}>
      <BarChart width={500} height={400} data={graphStats}>
        <YAxis tick={{fill: "white"}}/>

        <CartesianGrid strokeDasharray= "6 6"/>
        <Legend 
        verticalAlign="bottom" 

        wrapperStyle={{ 
          paddingTop: "20px", 
          paddingRight: "30px", // Example of adding a right margin
          // You can also add marginTop, marginLeft, etc.
        }} />
        <Tooltip content={<CustomTooltip1/>}/>
        <Bar dataKey="CombinedTackles" fill='#1784ff'/>
        <Bar dataKey="ForcedFumbles" fill='#ff173a'/>
        <Bar dataKey="QBHits" fill='#e8ff17'/>
        <Bar dataKey="Sacks" fill='#f017ff'/>
        
        <Bar dataKey="TacklesForLoss" fill='#17fff0'/>
        
      
      
      
      
      </BarChart>
      </div>
  )}
  {graphStats.length > 0 && (position==="CB"||position==="S") && (
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
        <Bar dataKey="CombinedTackles" fill='#ff173a'/>
        <Bar dataKey="InterceptionYards" fill='#f017ff'/>
        <Bar dataKey="Interceptions" fill='#e8ff17'/>  
        <Bar dataKey="PassesDefended" fill='#17fff0'/>
        
      </BarChart>
      </div>
  )}
  {graphStats.length > 0 && (position==="LB") && (
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
        <Bar dataKey="CombinedTackles" fill='#e8ff17'/>
         <Bar dataKey="ForcedFumbles" fill='#17fff0'/>
         <Bar dataKey="Interceptions" fill='#ff173a'/>
         <Bar dataKey="Sacks" fill='#1784ff'/>
         <Bar dataKey="TacklesForLoss" fill='#f017ff'/>
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
        <p style={{color: '#1784ff'}}>
            Combined Tackles: 
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
        <p style={{color:'#ff173a'}}>
          Forced Fumbles:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#e8ff17' }}>
          QB Hits:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#f017ff'}}>
          Sacks:
          <span>&nbsp;{payload[3].value.toFixed(1)}</span>
        </p>
        
        <p style={{color: '#17fff0'}}>
          Tackles For Loss:
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
        <p style={{color:'#ff173a'}}>
          Combined Tackles:
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#f017ff'}}>
          Interception Yards:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#e8ff17' }}>
          Interceptions:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
         
         <p style={{color: '#17fff0'}}>
          Passes Defended:
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
        <p style={{color: '#e8ff17' }}>
          Combined Tackles:
          <span>&nbsp;{payload[0].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#17fff0'}}>
          Forced Fumbles:
          <span>&nbsp;{payload[1].value.toFixed(1)}</span>
        </p>
        <p style={{color:'#ff173a'}}>
          Interceptions:
          <span>&nbsp;{payload[2].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#1784ff'}}>
            Sacks: 
          <span>&nbsp;{payload[3].value.toFixed(1)}</span>
        </p>
        <p style={{color: '#f017ff'}}>
          Tackles For Loss:
          <span>&nbsp;{payload[4].value.toFixed(1)}</span>
        </p>
      </div>
    )
  }
}