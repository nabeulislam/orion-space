import { Routes, Route } from 'react-router'
import CosmicBackground from './components/CosmicBackground'
import useLenis from './hooks/useLenis'
import Home from './pages/Home'
import DossiersPage from './pages/DossiersPage'
import GamesPage from './pages/GamesPage'
import CockpitPage from './pages/CockpitPage'
import AboutPage from './pages/AboutPage'
import AgentPage from './pages/AgentPage'

export default function App() {
  // Global smooth momentum scrolling across all routes
  useLenis()

  return (
    <div className="relative min-h-screen text-white selection:bg-orion/30 selection:text-white">
      {/* Persistent Space & Earth Globe Canvas across the entire portal */}
      <CosmicBackground />

      {/* Primary Route Views */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dossiers" element={<DossiersPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/cockpit" element={<CockpitPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/agent" element={<AgentPage />} />
        </Routes>
      </div>
    </div>
  )
}
