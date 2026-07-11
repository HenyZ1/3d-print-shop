import { motion } from 'framer-motion'
import { ScanLine, Zap, ShieldCheck, MapPin } from 'lucide-react'

const items = [
  {
    icon: ScanLine,
    title: '25μ Mikron Detay',
    desc: 'Saturn 4 Ultra · 16K MSLA',
    color: '#6C3CE9',
  },
  {
    icon: Zap,
    title: '48 Saatte Teslim',
    desc: 'Express ile aynı gün',
    color: '#0E9BB8',
  },
  {
    icon: ShieldCheck,
    title: 'Kalite Garantisi',
    desc: 'Memnun kalmazsan yeniden',
    color: '#F97316',
  },
  {
    icon: MapPin,
    title: 'Manisa & İzmir',
    desc: 'Elden teslim + kargo',
    color: '#8B5CF6',
  },
]

export default function TrustBar() {
  return (
    <section className="px-6 -mt-8 relative z-30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-surface-card rounded-3xl p-6 md:p-8 border border-border"
          style={{ boxShadow: '0 20px 50px rgba(30, 30, 70, 0.08)' }}
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="font-bold font-heading text-sm md:text-base text-text-primary">{item.title}</div>
                  <div className="text-text-secondary text-xs">{item.desc}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
