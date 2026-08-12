import { motion } from 'framer-motion'
import { Check, MessageCircle, Camera } from 'lucide-react'

const tiers = [
  {
    name: 'Mini',
    badge: 'Küçük',
    desc: 'Küçük figür, aksesuar, anahtarlık boyutu',
    size: '< 5 cm',
    items: [
      '32mm DnD karakter',
      '1/100 mimari figür',
      'Anahtarlık / mini stand',
      'Standart reçine',
      'Boyasız teslim',
    ],
    color: '#6C3CE9',
  },
  {
    name: 'Detay',
    badge: 'Öne Çıkan',
    desc: 'Orta boyut, yüksek detay',
    size: '5 - 10 cm',
    items: [
      '75mm koleksiyon figür',
      'Kişisel masaüstü stand',
      'Sevgili / çift figürü',
      'Tough reçine seçeneği',
      'Astar atılmış teslim',
      'İç destek temizleme',
    ],
    color: '#00E5FF',
    featured: true,
  },
  {
    name: 'Boss',
    badge: 'Büyük',
    desc: 'Büyük figür, terrain, sanayi mockup',
    size: '> 10 cm',
    items: [
      'Boss yaratık / ejderha',
      'Terrain & zar kulesi',
      'Sanayi mockup parça',
      'Mimari maket seti',
      'Renkli / şeffaf reçine',
      'Parçalı baskı + montaj',
    ],
    color: '#FF6B35',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-surface-light">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-accent">Boyut Paketleri</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Hangi Boyut <span className="text-gradient">Senin İçin?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Boyuta göre farklı seçenekler. Net fiyat için <span className="text-accent font-semibold">foto gönder</span> — her ürün özel hesaplanır.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass-card rounded-3xl p-8 transition-all duration-500 lift ${
                tier.featured ? 'lg:-mt-4 lg:mb-4 glow-accent' : ''
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-br from-accent to-cyan-500 text-surface shadow-lg shadow-accent/40">
                    En Cok Tercih Edilen
                  </span>
                </div>
              )}

              <div
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-25"
                style={{ background: tier.color }}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold font-heading">{tier.name}</h3>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      background: `${tier.color}15`,
                      color: tier.color,
                      border: `1px solid ${tier.color}30`,
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                <p className="text-text-secondary text-sm mb-2">{tier.desc}</p>
                <p className="text-text-muted text-xs font-mono mb-6">Boyut: {tier.size}</p>

                {/* Price block - now with ? */}
                <div className="mb-6 py-4 rounded-2xl bg-surface/40 border border-border/40 text-center">
                  <div className="text-7xl font-bold font-heading text-gradient leading-none mb-2">?</div>
                  <div className="text-text-secondary text-xs uppercase tracking-widest mb-1">Fiyat</div>
                  <div className="text-text-muted text-[11px]">Foto gönder, özel teklif al</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{
                          background: `${tier.color}15`,
                          border: `1px solid ${tier.color}30`,
                        }}
                      >
                        <Check size={11} style={{ color: tier.color }} />
                      </div>
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#order"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold font-heading text-sm transition-all ${
                    tier.featured
                      ? 'bg-gradient-to-br from-accent to-cyan-500 text-surface hover:shadow-lg hover:shadow-accent/40'
                      : 'glass border border-border-light hover:border-primary/40'
                  }`}
                >
                  <Camera size={14} />
                  Foto Gönder
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-text-secondary mb-4">B2B / toplu sipariş / sanayi mockup için özel çözümler</p>
          <a
            href="https://wa.me/905311034535"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp üzerinden iletişime geç
          </a>
        </motion.div>
      </div>
    </section>
  )
}
