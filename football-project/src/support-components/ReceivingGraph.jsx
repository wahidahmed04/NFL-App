import {useState, useEffect} from 'react'
import { getReceivingGraphStats } from '../fetch-supabase/getReceivingGraphStats.js'
export default function ReceivingGraph() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    async function load(){
      const receivingStats = await getReceivingGraphStats()
      setStats(receivingStats)
      console.log(receivingStats);
      
    }
    load()
  }, [])
  return (
    <div>
      
    </div>
  )
}
