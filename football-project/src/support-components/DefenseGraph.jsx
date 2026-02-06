import {useState, useEffect} from 'react'
import { getDefenseGraphStats } from '../fetch-supabase/getDefenseGraphStats.js'
import styles from '/src/styling/DefenseGraph.module.css'
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'

export default function DefenseGraph(){
    const [stats, setStats] = useState([])
    useEffect(() => {
        async function load(){
            const defense = await getDefenseGraphStats()
            setStats(defense)
            console.log(defense);
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
          data={stats.topFF}
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip1/>}/>
          <Legend formatter={() => 'Forced Fumbles'}/>
          <Bar dataKey="forced_fumbles" fill="#f017ff" />
        </BarChart>
        </div>
        <div className={styles.graph_container}>
        <BarChart
          layout="vertical"
          width={560}
          height={430}
          data={stats.topInt}
          margin={{ left: 40, right:30, top: 20, bottom: 10}}
        >
          <XAxis tick={{fill: "white"}} type="number"/>
          <YAxis dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip2/>} />
          <Legend formatter={() => 'Interceptions'} />
          <Bar dataKey="interceptions" fill='#1784ff' />
        </BarChart>
        </div>
        <div className={styles.graph_container}>
        <BarChart 
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
          layout="vertical"
          width={560}
          height={430}
          data={stats.topPD}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip3/>} />
          <Legend formatter={() => 'Passes Defended'} />
          <Bar dataKey="passes_defended" fill='#ff173a' />
        </BarChart>
        </div>
         <div className={styles.graph_container}>
        <BarChart 
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
          layout="vertical"
          width={560}
          height={430}
          data={stats.topQBHits}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip4/>} />
          <Legend formatter={() => 'QB Hits'} />
          <Bar dataKey="qb_hits" fill='#17fff0' />
        </BarChart>
        </div>
        <div className={styles.graph_container}>
        <BarChart 
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
          layout="vertical"
          width={560}
          height={430}
          data={stats.topSacks}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip5/>} />
          <Legend formatter={() => 'Sacks'} />
          <Bar dataKey="sacks" fill='#e8ff17' />
        </BarChart>
        </div>
         <div className={styles.graph_container}>
        <BarChart 
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
          layout="vertical"
          width={560}
          height={430}
          data={stats.topTFL}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip6/>} />
          <Legend formatter={() => 'Tackles For Loss'} />
          <Bar dataKey="tackles_for_loss" fill='#3eff17' />
        </BarChart>
        </div>
         <div className={styles.graph_container}>
        <BarChart 
          margin={{left: 40, right: 30, top: 20, bottom: 10}}
          layout="vertical"
          width={560}
          height={430}
          data={stats.topTackles}
        >
          <XAxis tick={{fill: "white"}} type="number" />
          <YAxis  dataKey="players.name" type="category" tick={{ fill: "white" }} />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip7/>} />
          <Legend formatter={() => 'Combined Tackles'} />
          <Bar dataKey="combined_tackles" fill='#fa741a' />
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
                  Forced Fumbles :
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
                   Interceptions:
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
                   Passes Defended:
                  <span>&nbsp;{payload[0].value}</span>
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
                   QB Hits:
                  <span>&nbsp;{payload[0].value}</span>
                </p>
              </div>
            )
          }
          
}
const CustomTooltip5 = ({active, payload}) => {
          if(active && payload && payload.length) {
            return (
              <div className={styles.tooltip_container}>
                <p style={{color: '#e8ff17'}}>
                   Sacks:
                  <span>&nbsp;{payload[0].value.toFixed(1)}</span>
                </p>
              </div>
            )
          }
          
}
const CustomTooltip6 = ({active, payload}) => {
          if(active && payload && payload.length) {
            return (
              <div className={styles.tooltip_container}>
                <p style={{color: '#3eff17' }}>
                   Tackles For Loss:
                  <span>&nbsp;{payload[0].value}</span>
                </p>
              </div>
            )
          }
          
}
const CustomTooltip7 = ({active, payload}) => {
          if(active && payload && payload.length) {
            return (
              <div className={styles.tooltip_container}>
                <p style={{color: '#fa741a'}}>
                   Combined Tackles:
                  <span>&nbsp;{payload[0].value}</span>
                </p>
              </div>
            )
          }
          
}