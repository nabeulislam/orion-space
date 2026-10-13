import Navbar from '@/sections/Navbar'
import MissionControl from '@/sections/MissionControl'
import Contact from '@/sections/Contact'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <Navbar />
      <main className="pt-20">
        <MissionControl />
      </main>
      <Contact />
    </div>
  )
}
