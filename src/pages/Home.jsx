import usePageSeo from '../hooks/usePageSeo'
import ScrollProgress from '../components/ui/ScrollProgress'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/ui/Hero'
import TrustBar from '../components/ui/TrustBar'
import Services from '../components/ui/Services'
import Process from '../components/ui/Process'
import ShopBanner from '../components/ui/ShopBanner'
import BlogPreview from '../components/ui/BlogPreview'
import Pricing from '../components/ui/Pricing'
import Materials from '../components/ui/Materials'
import Stats from '../components/ui/Stats'
import Features from '../components/ui/Features'
import OrderForm from '../components/ui/OrderForm'
import Testimonials from '../components/ui/Testimonials'
import FAQ from '../components/ui/FAQ'
import CTA from '../components/ui/CTA'
import Footer from '../components/ui/Footer'
import WhatsAppFab from '../components/ui/WhatsAppFab'

export default function Home() {
  usePageSeo({
    title: 'MicronForge | Manisa & İzmir SLA Reçine 3D Baskı — Figür, Maket, Prototip',
    description:
      'Manisa & İzmir bölgesinde profesyonel SLA reçine 3D baskı. DnD/FRP minyatür, kişiye özel figür, mimari maket ve sanayi prototip. 16K MSLA, 25 mikron detay, 48 saatte teslim. Fotoğraf gönder, teklif al.',
    path: '/',
  })

  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <ShopBanner />
      <BlogPreview />
      <Pricing />
      <Materials />
      <Stats />
      <Features />
      <OrderForm />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
