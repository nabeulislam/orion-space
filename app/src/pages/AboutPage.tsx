import Navbar from '@/sections/Navbar'
import MissionControl from '@/sections/MissionControl'
import Contact from '@/sections/Contact'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="pt-20 bg-transparent">
        <MissionControl />
      </main>
      <Contact />
    </div>
  )
}
