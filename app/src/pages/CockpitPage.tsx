import Navbar from '@/sections/Navbar'
import AgentCockpit from '@/sections/AgentCockpit'
import Contact from '@/sections/Contact'

export default function CockpitPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <Navbar />
      <main className="pt-20">
        <AgentCockpit />
      </main>
      <Contact />
    </div>
  )
}
