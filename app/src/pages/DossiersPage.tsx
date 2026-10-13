import Navbar from '@/sections/Navbar'
import FolderDossiers from '@/sections/FolderDossiers'
import Contact from '@/sections/Contact'

export default function DossiersPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <Navbar />
      <main className="pt-20">
        <FolderDossiers />
      </main>
      <Contact />
    </div>
  )
}
