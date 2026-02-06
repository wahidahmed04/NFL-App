import {useState, useEffect} from 'react'
import { getRushingGraphStats } from '../fetch-supabase/getRushingGraphStats.js'
import styles from '/src/styling/RushingGraph.module.css'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
export default function RushingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const rushingStats = await getRushingGraphStats()
      console.log(rushingStats);
      setStats(rushingStats)}
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
        <Legend formatter={() => 'Rushing Yards'}/>
        <Bar dataKey="rushing_yards" fill="#f017ff" />
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
        <Legend formatter={() => 'Rushing Touchdowns'}/>
        <Bar dataKey="rushing_touchdowns" fill='#1784ff' />
      </BarChart>
      </div>
      <div className={styles.graph_container}>
      <BarChart 
        margin={{left: 40, right:30, top: 20, bottom: 10}}
        layout="vertical"
        width={560}
        height={430}
        data={stats.topYPC}
      >
        <XAxis tick={{fill: "white"}} domain={stats.topYPC?.length > 0 ? [Math.round(stats.topYPC[stats.topYPC.length-1].YPC*0.95), 
        Math.round(stats.topYPC[0].YPC*1.05)] : [0, 100]} type='number' />
        <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
        <CartesianGrid strokeDasharray="6 6" />
        <Tooltip content={<CustomTooltip3/>} />
        <Legend />
        <Bar dataKey="YPC" fill='#ff173a' />
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
              Rushing Yards:
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
               Rushing Touchdowns:
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
               Yards Per Carry:
              <span>&nbsp;{payload[0].value.toFixed(2)}</span>
            </p>
          </div>
        )
      }
    }

