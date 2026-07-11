import { motion } from 'framer-motion'
import { Camera, MessageCircle, PackageCheck, Truck } from 'lucide-react'

const steps = [
  {
    icon: Camera,
    title: 'Foto Gönder',
    description: 'WhatsApp veya site üzerinden modelinin fotoğrafını, örnek görselini veya çizimini yükle. STL dosyana gerek yok.',
    color: '#6C3CE9',
    time: '2 dk',
  },
  {
    icon: MessageCircle,
    title: 'Teklif & Reçine Seçimi',
    description: '30 dakika içinde fiyat, süre ve reçine önerisi alırsın. Standart, Tough veya renkli — birlikte karar veririz.',
    color: '#00E5FF',
    time: '30 dk',
  },
  {
    icon: PackageCheck,
    title: 'Baskı + UV Kuruma',
    description: 'Saturn 4 Ultra 16K MSLA ile 25μ baskı, IPA yıkama ve UV kuruma. Destek temizleme + kalite kontrol.',
    color: '#FF6B35',
    time: '6-24 sa',
  },
  {
    icon: Truck,
    title: 'Teslim / Kargo',
    description: 'Manisa & İzmir elden teslim, Türkiye geneli kargo. Kırılgan parçalar için özel paketleme.',
    color: '#8B5CF6',
    time: '1-2 gün',
  },
]

export default function Process() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="badge badge-accent">Sürecimiz</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Nasıl <span className="text-gradient">Çalışır?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Siparişten teslimata dört basit adımda hayallerinizi gerçeğe dönüştürüyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px origin-left"
            style={{
              background: 'linear-gradient(90deg, #6C3CE9 0%, #00E5FF 33%, #FF6B35 66%, #8B5CF6 100%)',
              opacity: 0.4,
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                <div className="relative inline-flex mb-6">
                  {/* Animated outer ring */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 blur-md"
                    style={{ background: `${step.color}40` }}
                  />

                  {/* Main icon container */}
                  <div
                    className="relative w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                      border: `1px solid ${step.color}30`,
                      boxShadow: `0 8px 32px ${step.color}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: step.color }} />
                  </div>

                  {/* Step number */}
                  <div
                    className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white font-heading shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`,
                      boxShadow: `0 4px 16px ${step.color}50`,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Time badge */}
                <div className="mb-3">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      color: step.color,
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}25`,
                    }}
                  >
                    {step.time}
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-heading mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed px-2">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent/20 text-sm text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Toplam: <span className="text-accent font-semibold font-heading">~48 saat</span> içinde sende
          </div>
        </motion.div>
      </div>
    </section>
  )
}
