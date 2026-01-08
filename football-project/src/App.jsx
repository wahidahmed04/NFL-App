import { useState, useEffect } from 'react'

import OffensiveTeamStatsTable from './table-components/OffensiveTeamStatsTable.jsx'
import OffensivePlayerStatsTable from './table-components/OffensivePlayerStatsTable.jsx'
import DefensivePlayerStatsTable from './table-components/DefensivePlayerStatsTable.jsx'
function App() {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    async function load(){
      const data = await getTeams()
      setTeams(data)
    }
    load()
  }, [])
  return (
    <>
    <OffensiveTeamStatsTable/>
    </>
  )
}

export default App
