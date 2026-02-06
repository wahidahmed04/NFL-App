import {useState, useEffect} from 'react'
import { getReceivingGraphStats } from '../fetch-supabase/getReceivingGraphStats.js'
import styles from '/src/styling/ReceivingGraph.module.css'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
export default function RushingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const receivingStats = await getReceivingGraphStats()
      console.log(receivingStats);
      setStats(receivingStats)}
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
        margin={{left: 40, right:30, top: 20, bottom: 10}}
      >
        <XAxis tick={{fill: "white"}} type="number" />
        <YAxis dataKey="players.name" type="category" tick={{ fill: "white" }} />
        <CartesianGrid strokeDasharray="6 6" />
        <Tooltip content={<CustomTooltip1/>}/>
        <Legend formatter={() => 'Receiving Yards'}/>
        <Bar dataKey="receiving_yards" fill="#f017ff" />
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
        <Legend formatter={() => 'Receiving Touchdowns'}/>
        <Bar dataKey="receiving_touchdowns" fill='#1784ff' />
      </BarChart>
      </div>
      <div className={styles.graph_container}>
      <BarChart 
        margin={{left: 40, right: 30, top: 20, bottom: 10}}
        layout="vertical"
        width={560}
        height={430}
        data={stats.topYPR}
      >
        <XAxis tick={{fill: "white"}} domain={stats.topYPR?.length > 0 ? [Math.round(stats.topYPR[stats.topYPR.length-1].YPR*0.95), 
        Math.round(stats.topYPR[0].YPR*1.05)] : [0, 100]} type='number' />
        <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
        <CartesianGrid strokeDasharray="6 6" />
        <Tooltip content={<CustomTooltip3/>} />
        <Legend />
        <Bar dataKey="YPR" fill='#ff173a' />
      </BarChart>
      </div>
       <div className={styles.graph_container}>
      <BarChart 
        margin={{left: 40, right:30, top: 20, bottom: 10}}
        layout="vertical"
        width={560}
        height={430}
        data={stats.topReceptions}
      >
        <XAxis tick={{fill: "white"}}  type='number' />
        <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
        <CartesianGrid strokeDasharray="6 6" />
        <Tooltip content={<CustomTooltip4/>} />
        <Legend formatter={() => 'Receptions'}/>
        <Bar dataKey="receptions" fill='#17fff0' />
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
              Receiving Yards:
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
               Receiving Touchdowns:
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
               Yards Per Reception:
              <span>&nbsp;{payload[0].value.toFixed(2)}</span>
            </p>
          </div>
        )
      }
    }
    const CustomTooltip4 = ({active, payload}) => {
      if(active && payload && payload.length) {
        return (
          <div className={styles.tooltip_container}>
            <p style={{color: '#17fff0'}}>
               Receptions:
              <span>&nbsp;{payload[0].value.toFixed(0)}</span>
            </p>
          </div>
        )
      }
    }