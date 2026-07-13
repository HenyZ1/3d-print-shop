import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Printer, MessageCircle, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Anasayfa', href: '#hero' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Mağaza', href: '#magaza' },
  { label: 'Fiyat', href: '#pricing' },
  { label: 'Reçineler', href: '#materials' },
  { label: 'SSS', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount] = useState(3)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''))
    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-card border-b border-border shadow-[0_4px_24px_rgba(20,20,50,0.06)]'
          : 'theme-dark bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/40 transition-all duration-500 group-hover:scale-105">
              <Printer size={20} className="text-white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
          </div>
          <span className="text-xl font-bold font-heading tracking-tight">
            Micron<span className="text-gradient">Forge</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 bg-surface-light px-2 py-1.5 rounded-full border border-border/60">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 border border-primary/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/905311034535"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="relative p-2.5 rounded-xl hover:bg-green-500/10 transition-colors group border border-transparent hover:border-green-500/30"
          >
            <MessageCircle size={20} className="text-text-secondary group-hover:text-green-400 transition-colors" />
          </a>

          <a href="#order" className="btn-primary hidden sm:flex items-center gap-2 text-sm py-2.5 px-5">
            <Sparkles size={14} />
            Teklif Al
          </a>

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors py-3 px-4 rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-sm py-3 mt-3 flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                Teklif Al
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
