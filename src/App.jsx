import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/ui/Navbar'
import Hero from './components/ui/Hero'
import TrustBar from './components/ui/TrustBar'
import Services from './components/ui/Services'
import Process from './components/ui/Process'
import Shop from './components/ui/Shop'
import Pricing from './components/ui/Pricing'
import Materials from './components/ui/Materials'
import Stats from './components/ui/Stats'
import Features from './components/ui/Features'
import OrderForm from './components/ui/OrderForm'
import Testimonials from './components/ui/Testimonials'
import FAQ from './components/ui/FAQ'
import CTA from './components/ui/CTA'
import Footer from './components/ui/Footer'
import WhatsAppFab from './components/ui/WhatsAppFab'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <Shop />
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
