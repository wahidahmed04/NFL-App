import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import OffensivePlayerStatsTable from './table-components/OffensivePlayerStatsTable.jsx'
import OffensiveTeamStatsTable from './table-components/OffensiveTeamStatsTable.jsx'
import DefensivePlayerStatsTable from './table-components/DefensivePlayerStatsTable.jsx'
import DefensiveTeamStatsTable from './table-components/DefensiveTeamStatsTable.jsx'
import Games from './Games.jsx'
const router = createBrowserRouter([
  {
  path: '/',
  element: <Home/>,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/offense/teams',
  element: <OffensiveTeamStatsTable/>,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/offense/players',
  element: <OffensivePlayerStatsTable/>,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/defense/teams',
  element: <DefensiveTeamStatsTable/>,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/defense/players',
  element: <DefensivePlayerStatsTable/>,
  errorElement: <div>404 Not Found</div>
},
{
  path: '/games',
  element: <Games/>,
  errorElement: <div>404 Not Found</div>
}

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
