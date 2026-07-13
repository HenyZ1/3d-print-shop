import usePageSeo from '../hooks/usePageSeo'
import ScrollProgress from '../components/ui/ScrollProgress'
import Navbar from '../components/ui/Navbar'
import Shop from '../components/ui/Shop'
import Footer from '../components/ui/Footer'
import WhatsAppFab from '../components/ui/WhatsAppFab'

export default function ShopPage() {
  usePageSeo({
    title: 'Mağaza | Hazır 3D Baskılar — Figür, Dekor & Koleksiyon · MicronForge',
    description:
      'MicronForge hazır baskı mağazası: film & oyun figürleri (Hulk, Yoda, Gollum, Spider-Man), kristal dekor objeleri ve koleksiyon setleri. Beğen, WhatsApp\'tan sipariş ver. Manisa & İzmir SLA reçine 3D baskı, farklı boyut ve renk seçeneği.',
    path: '/magaza',
  })

  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />
      <Shop />
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
