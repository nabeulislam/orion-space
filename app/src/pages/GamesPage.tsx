import Navbar from '@/sections/Navbar'
import EarthDetectiveAcademy from '@/sections/EarthDetectiveAcademy'
import Contact from '@/sections/Contact'

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <Navbar />
      <main className="pt-20">
        <EarthDetectiveAcademy />
      </main>
      <Contact />
    </div>
  )
}
