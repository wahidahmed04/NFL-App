import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './support-components/Home.jsx'
import OffensivePlayerStatsTable from './table-components/OffensivePlayerStatsTable.jsx'
import OffensiveTeamStatsTable from './table-components/OffensiveTeamStatsTable.jsx'
import DefensivePlayerStatsTable from './table-components/DefensivePlayerStatsTable.jsx'
import DefensiveTeamStatsTable from './table-components/DefensiveTeamStatsTable.jsx'
import Games from './support-components/Games.jsx'
import Graphs from './support-components/Graphs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offense/teams" element={<OffensiveTeamStatsTable />} />
        <Route path="/offense/players" element={<OffensivePlayerStatsTable />} />
        <Route path="/defense/teams" element={<DefensiveTeamStatsTable />} />
        <Route path="/defense/players" element={<DefensivePlayerStatsTable />} />
        <Route path="/games" element={<Games />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
