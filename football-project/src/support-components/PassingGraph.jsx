import {useState, useEffect} from 'react'
import { getPassingGraphStats } from '../fetch-supabase/getPassingGraphStats.js'
import styles from '/src/styling/PassingGraph.module.css'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
export default function PassingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const passingStats = await getPassingGraphStats()
      console.log(passingStats);
      setStats(passingStats)
    }
    load()
  }, [])
  return (
    <div className={styles.all_graphs}>
      <div className={styles.graph_container}>
  <BarChart
  layout="vertical"
  width={560}
  height={430}
  data={stats.topYards}
  margin={{left: 40, right: 30, top: 20, bottom: 10}}
>
  <XAxis tick={{fill: "white"}} type="number" />
  <YAxis dataKey="players.name" type="category" tick={{ fill: "white" }} />
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip content={<CustomTooltip1/>}/>
  <Legend formatter={() => 'Passing Yards'}/>
  <Bar dataKey="passing_yards" fill="#f017ff" />
</BarChart>
</div>
<div className={styles.graph_container}>
<BarChart
  layout="vertical"
  width={560}
  height={430}
  data={stats.topTouchdowns}
  margin={{ left: 40, right:30, top: 20, bottom: 10}}
>
  <XAxis tick={{fill: "white"}} type="number"/>
  <YAxis dataKey="players.name" type="category" tick={{ fill: "white" }} />
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip content={<CustomTooltip2/>} />
  <Legend formatter={() => 'Passing Touchdowns'} />
  <Bar dataKey="passing_touchdowns" fill='#1784ff' />
</BarChart>
</div>
<div className={styles.graph_container}>
<BarChart 
  margin={{left: 40, right: 30, top: 20, bottom: 10}}
  layout="vertical"
  width={560}
  height={430}
  data={stats.topCompletion}
>
  <XAxis tick={{fill: "white"}} domain={stats.topCompletion?.length > 0 ? [Math.round(stats.topCompletion[stats.topCompletion.length-1].completion_pct*0.95), 
  Math.round(stats.topCompletion[0].completion_pct*1.05)] : [0, 100]} type="number" />
  <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
  <CartesianGrid strokeDasharray="6 6" />
  <Tooltip content={<CustomTooltip3/>} />
  <Legend formatter={() => 'Completion %'} />
  <Bar dataKey="completion_pct" fill='#ff173a' />
</BarChart>
</div>
    </div>
  )
}
const CustomTooltip1 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#f017ff'}}>
          Passing Yards :
          <span>&nbsp;{payload[0].value}</span>
        </p>
      </div>
    )
  }
}
const CustomTooltip2 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#1784ff'}}>
           Passing Touchdowns:
          <span>&nbsp;{payload[0].value}</span>
        </p>
      </div>
    )
  }
  
}

const CustomTooltip3 = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className={styles.tooltip_container}>
        <p style={{color: '#ff173a'}}>
           Completion Percentage:
          <span>&nbsp;{payload[0].value.toFixed(2)}%</span>
        </p>
      </div>
    )
  }
  
}