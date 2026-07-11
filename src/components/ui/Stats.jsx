import { motion } from 'framer-motion'
import { ScanLine, Layers, Box, Clock } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

// Honest, capability-based specs — real machine/process numbers, not
// fabricated social proof.
const stats = [
  {
    icon: ScanLine,
    value: 16,
    suffix: 'K',
    label: 'MSLA Çözünürlük',
    sublabel: 'Saturn 4 Ultra ekran',
    color: '#6C3CE9',
  },
  {
    icon: Layers,
    value: 25,
    suffix: 'μ',
    label: 'Katman Detayı',
    sublabel: 'Mikron seviyesinde',
    color: '#0E9BB8',
  },
  {
    icon: Box,
    value: 218,
    suffix: 'mm',
    label: 'Baskı Hacmi',
    sublabel: '218 × 123 × 250 mm',
    color: '#F97316',
  },
  {
    icon: Clock,
    value: 48,
    suffix: 'sa',
    label: 'Teslim Süresi',
    sublabel: 'Express ile aynı gün',
    color: '#8B5CF6',
  },
]

export default function Stats() {
  return (
    <section className="cv-auto py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-accent">Teknik Güç</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-5 mb-4">
            Neden <span className="text-gradient">Reçine Baskı?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Saturn 4 Ultra 16K MSLA ile filament baskının ulaşamadığı detay ve pürüzsüz yüzey kalitesi.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 md:p-8 lift group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${stat.color}15`, boxShadow: `0 0 30px ${stat.color}18` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>

                <div className="text-4xl md:text-5xl font-bold font-heading mb-1 tracking-tight">
                  <span className="text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>

                <div className="text-sm font-semibold text-text-primary mt-2">{stat.label}</div>
                <div className="text-xs text-text-secondary mt-1">{stat.sublabel}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
