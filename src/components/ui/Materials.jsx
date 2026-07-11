import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Thermometer, Zap, Shield, Sparkles } from 'lucide-react'

const materials = [
  {
    id: 'standart',
    name: 'Standart Reçine',
    tagline: 'En çok tercih edilen',
    description: 'DnD/FRP minyatür, kişiye özel figür, mimari maket ve genel amaç için ideal. Pürüzsüz yüzey, hızlı kuruma ve yüksek detay bir arada.',
    cure: 'UV 405nm',
    detail: '25 mikron',
    use: 'Figür, Maket, Hediye',
    best: 'DnD figür · Mimari maket · Stand',
    color: '#6C3CE9',
    gradient: 'linear-gradient(135deg, #6C3CE9, #8B5CF6)',
    features: ['25μ detay', 'Yüksek detay', 'Çeşitli renk'],
  },
  {
    id: 'tough',
    name: 'Tough (ABS-like) Reçine',
    tagline: 'Sanayi ve mockup için',
    description: 'ABS benzeri mekanik dayanıklılık. Kırılgan değil, darbe dayanıklı. Sanayi prototipi, mockup, montaj parçası ve fonksiyonel test için.',
    cure: 'UV 405nm',
    detail: '50 mikron',
    use: 'Prototip, Mockup, Mekanik',
    best: 'Manisa OSB · Mockup · Ar-Ge',
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #FF6B35, #DC2626)',
    features: ['Darbe direnci', 'Mockup kalitesi', 'Kolay işlenebilir'],
  },
  {
    id: 'renkli',
    name: 'Renkli & Özel Reçine',
    tagline: 'Boyamasız teslim',
    description: 'Boyamaya gerek kalmadan canlı renkler. Şeffaf, gri/siyah, beyaz ve 8+ renk seçeneği. Hediye, koleksiyon ve sunum modeli için.',
    cure: 'UV 405nm',
    detail: '25-50 mikron',
    use: 'Hediye, Dekoratif, Koleksiyon',
    best: 'Yayıncı stand · Hediye figür',
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, #00E5FF, #06B6D4)',
    features: ['8+ renk seçeneği', 'Şeffaf seçenek', 'Boyamasız'],
  },
]

export default function Materials() {
  const [active, setActive] = useState('standart')
  const activeMat = materials.find((m) => m.id === active) || materials[0]

  return (
    <section id="materials" className="py-24 px-6 relative overflow-hidden bg-surface-light">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary">Reçineler</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-5 mb-4">
            Projene Uygun <span className="text-gradient">Reçine Tipi</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Standart, Tough (ABS-like) ve Renkli olmak üzere üç ana grubumuz var. Detaylı seçenekler için bizimle iletişime geç.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {materials.map((m, i) => (
              <motion.button
                key={m.id}
                onClick={() => setActive(m.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`group relative text-left p-5 rounded-2xl transition-all duration-300 ${
                  active === m.id ? 'glass-strong' : 'bg-surface/40 border border-border/40 hover:border-border-light'
                }`}
              >
                {active === m.id && (
                  <motion.div
                    layoutId="materialIndicator"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `${m.color}10`,
                      border: `1px solid ${m.color}30`,
                      boxShadow: `0 0 30px ${m.color}20`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold font-heading text-lg">{m.name}</div>
                    <div className="text-text-secondary text-xs mt-1">{m.tagline}</div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: m.gradient, boxShadow: `0 0 20px ${m.color}40` }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden h-full"
              >
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{ background: activeMat.gradient }}
                />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex-shrink-0"
                      style={{ background: activeMat.gradient, boxShadow: `0 8px 40px ${activeMat.color}40` }}
                    />
                    <div>
                      <h3 className="text-3xl font-bold font-heading">{activeMat.name}</h3>
                      <p className="text-text-secondary text-sm">{activeMat.tagline}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">{activeMat.description}</p>

                  <div
                    className="px-4 py-3 rounded-xl mb-6"
                    style={{
                      background: `${activeMat.color}10`,
                      border: `1px solid ${activeMat.color}25`,
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-widest mb-1 font-bold" style={{ color: activeMat.color }}>
                      İdeal Kullanım
                    </div>
                    <div className="text-sm font-heading font-semibold">{activeMat.best}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="rounded-xl bg-surface/60 border border-border/60 p-4">
                      <div className="flex items-center gap-2 mb-2 text-text-secondary text-xs">
                        <Thermometer size={14} />
                        KURUMA
                      </div>
                      <div className="font-heading font-semibold text-sm">{activeMat.cure}</div>
                    </div>
                    <div className="rounded-xl bg-surface/60 border border-border/60 p-4">
                      <div className="flex items-center gap-2 mb-2 text-text-secondary text-xs">
                        <Zap size={14} />
                        KATMAN
                      </div>
                      <div className="font-heading font-semibold text-sm">{activeMat.detail}</div>
                    </div>
                    <div className="rounded-xl bg-surface/60 border border-border/60 p-4">
                      <div className="flex items-center gap-2 mb-2 text-text-secondary text-xs">
                        <Shield size={14} />
                        ALAN
                      </div>
                      <div className="font-heading font-semibold text-sm">{activeMat.use}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} style={{ color: activeMat.color }} />
                    <span className="font-heading font-semibold text-sm">Öne Çıkan Özellikler</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeMat.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: `${activeMat.color}15`,
                          border: `1px solid ${activeMat.color}30`,
                          color: activeMat.color,
                        }}
                      >
                        <Check size={12} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
