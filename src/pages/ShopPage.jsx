import ScrollProgress from '../components/ui/ScrollProgress'
import Navbar from '../components/ui/Navbar'
import Shop from '../components/ui/Shop'
import Footer from '../components/ui/Footer'
import WhatsAppFab from '../components/ui/WhatsAppFab'

export default function ShopPage() {
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
