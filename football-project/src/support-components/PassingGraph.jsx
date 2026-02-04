import {useState, useEffect} from 'react'
import { getPassingGraphStats } from '../fetch-supabase/getPassingGraphStats.js'
export default function PassingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const passingStats = await getPassingGraphStats()
      console.log(passingStats);
      setStats(stats)
    }
    load()
  }, [])
  return (
    <div>
      
    </div>
  )
}
