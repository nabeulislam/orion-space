import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import DossiersPage from './pages/DossiersPage'
import GamesPage from './pages/GamesPage'
import CockpitPage from './pages/CockpitPage'
import AboutPage from './pages/AboutPage'
import AgentPage from './pages/AgentPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dossiers" element={<DossiersPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/cockpit" element={<CockpitPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/agent" element={<AgentPage />} />
    </Routes>
  )
}
