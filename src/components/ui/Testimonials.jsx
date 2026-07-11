import { motion } from 'framer-motion'
import { Eye, ShieldCheck, Lock } from 'lucide-react'

// Honest commitments a new workshop can genuinely make — no fabricated
// reviews or ratings.
const promises = [
  {
    icon: Eye,
    title: 'Önce Onay, Sonra Baskı',
    text: 'Modelini ve baskı ayarlarını onaylamadan üretime geçmeyiz. Boyut, renk ve detayı net konuşur, sürpriz yaşatmayız.',
    color: '#6C3CE9',
  },
  {
    icon: ShieldCheck,
    title: 'Kalite Garantisi',
    text: 'Baskı hatası bizden kaynaklıysa ücretsiz yeniden basarız. Her parça paketlenmeden önce tek tek kontrol edilir.',
    color: '#0E9BB8',
  },
  {
    icon: Lock,
    title: 'Gizlilik & Güven',
    text: 'Özel tasarımların, dosyaların ve prototiplerin bizimle güvende. İzin vermeden hiçbir modeli paylaşmaz, çoğaltmayız.',
    color: '#F97316',
  },
]

export default function Testimonials() {
  return (
    <section id="guarantee" className="cv-auto py-24 px-6 relative bg-surface-light overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-accent">Güvence</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Sana <span className="text-gradient">Sözümüz</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Yeni bir atölyeyiz ama işimizi ciddiye alıyoruz. Her siparişte sözümüz net.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((p, index) => {
            const Icon = p.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-8 relative group hover:glow-primary transition-all duration-500 lift"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}28` }}
                >
                  <Icon size={26} style={{ color: p.color }} />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed">{p.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://instagram.com/micronforge3d"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            Gerçek baskılarımızı Instagram'da gör → @micronforge3d
          </a>
        </motion.div>
      </div>
    </section>
  )
}
