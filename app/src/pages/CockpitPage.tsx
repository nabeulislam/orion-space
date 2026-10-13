import Navbar from '@/sections/Navbar'
import AgentCockpit from '@/sections/AgentCockpit'
import Contact from '@/sections/Contact'

export default function CockpitPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="pt-20 bg-transparent">
        <AgentCockpit />
      </main>
      <Contact />
    </div>
  )
}
