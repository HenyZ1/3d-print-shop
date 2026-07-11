import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MapPin, Swords, Gift, Building2, Wrench } from 'lucide-react'

const categories = [
  { icon: Swords, label: 'DnD / FRP Figür', href: '#services' },
  { icon: Gift, label: 'Kişiye Özel', href: '#services' },
  { icon: Building2, label: 'Mimari Maket', href: '#services' },
  { icon: Wrench, label: 'Sanayi Prototip', href: '#services' },
]

const stats = [
  { value: '16K', label: 'MSLA' },
  { value: '25μ', label: 'Katman' },
  { value: '218mm', label: 'Hacim' },
  { value: '48sa', label: 'Teslim' },
]

export default function Hero() {
  return (
    <section id="hero" className="theme-dark bg-surface relative min-h-screen flex items-center overflow-hidden bg-grid-small">
      {/* Atmospheric orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent/12 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-accent-warm/8 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto px-6 w-full pt-28 pb-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 text-sm border border-primary/20">
            <MapPin size={14} className="text-accent" />
            <span className="text-text-secondary">Manisa & İzmir</span>
            <span className="text-text-muted">·</span>
            <span className="text-accent font-semibold">16K MSLA</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-secondary">25μ detay</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] mb-6 tracking-tight"
        >
          Figürler, maketler,{' '}
          <span className="relative inline-block">
            <span className="text-gradient">prototipler</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full origin-left"
            />
          </span>
          <br />
          <span className="text-gradient-soft">mikron seviyede.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          DnD/FRP minyatür, kişiye özel masaüstü figür, mimari maket ve sanayi prototipi —
          <span className="text-text-primary font-medium"> Saturn 4 Ultra</span> ile pürüzsüz yüzeyli SLA reçine baskı.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href="#order" className="btn-primary text-base flex items-center gap-2 px-8 py-4 group">
            Fotoğraf Yükle, Teklif Al
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#gallery" className="btn-outline text-base flex items-center gap-2 px-8 py-4 group">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <Sparkles size={12} className="text-accent" />
            </div>
            Örnekleri Gör
          </a>
        </motion.div>

        {/* Category quick-chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-14"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <a
                key={cat.label}
                href={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-border/60 text-sm text-text-secondary hover:text-text-primary hover:border-primary/40 transition-all"
              >
                <Icon size={15} className="text-primary-light" />
                {cat.label}
              </a>
            )
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto pt-8 border-t border-border/40"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-heading text-gradient tracking-tight">{stat.value}</div>
              <div className="text-text-secondary text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into light section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
    </section>
  )
}
