import Navbar from '@/sections/Navbar'
import FolderDossiers from '@/sections/FolderDossiers'
import Contact from '@/sections/Contact'

export default function DossiersPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="pt-20 bg-transparent">
        <FolderDossiers />
      </main>
      <Contact />
    </div>
  )
}
