import { motion } from 'framer-motion'
import { Layers, Zap, Shield, Palette, Truck, Headphones } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Katman Katman Mukemmellik',
    description: '0.05mm hassasiyetinde baski ile her detayi yakaliyoruz. FDM ve SLA teknolojileri ile sinirsiz olasiliklat.',
    color: '#6C3CE9',
  },
  {
    icon: Palette,
    title: '50+ Malzeme Secenegi',
    description: 'PLA, ABS, PETG, Resin, Nylon ve daha fazlasi. Projenize en uygun malzemeyi birlikte secelim.',
    color: '#00E5FF',
  },
  {
    icon: Zap,
    title: 'Hizli Uretim',
    description: 'Siparisinizi 24 saat icinde hazirliyoruz. Acil siparisler icin ekspres uretim secenegi de mevcut.',
    color: '#FF6B35',
  },
  {
    icon: Shield,
    title: 'Kalite Garantisi',
    description: 'Her urun %100 kalite kontrolden gecirilir. Memnun kalmazsaniz ucretsiz yeniden basim yapiyoruz.',
    color: '#8B5CF6',
  },
  {
    icon: Truck,
    title: 'Ucretsiz Kargo',
    description: '200 TL ve uzeri siparislerde Turkiye genelinde ucretsiz kargo. Guvenli paketleme garantisi.',
    color: '#6C3CE9',
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Uzman ekibimiz tasarim asamasindan teslimata kadar her adimda yaninizdayiz.',
    color: '#00E5FF',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 relative bg-surface-light">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Neden Biz?</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-4">
            Farkimizi <span className="text-gradient">Kesfet</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Kalite, hiz ve musteri memnuniyetinde sektorun onununde olmak icin calisiyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl glass hover:glow-primary transition-all duration-500 cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}20` }}
                >
                  <Icon size={26} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
