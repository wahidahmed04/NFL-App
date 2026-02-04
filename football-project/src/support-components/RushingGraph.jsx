import {useState, useEffect} from 'react'
import { getRushingGraphStats } from '../fetch-supabase/getRushingGraphStats.js'
export default function RushingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const rushingStats = await getRushingGraphStats()
      setStats(rushingStats)
      console.log(rushingStats);
      
    }
    load()
  }, [])
  return (
    <div>
      
    </div>
  )
}
