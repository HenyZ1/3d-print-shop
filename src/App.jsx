import Navbar from './components/ui/Navbar'
import Hero from './components/ui/Hero'
import Products from './components/ui/Products'
import Features from './components/ui/Features'
import Process from './components/ui/Process'
import Testimonials from './components/ui/Testimonials'
import CTA from './components/ui/CTA'
import Footer from './components/ui/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <Products />
      <Process />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
