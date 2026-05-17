import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10 text-center"
      >
        <div className="glass-strong rounded-3xl p-12 md:p-16 glow-primary">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles size={16} className="text-primary-light" />
            <span className="text-sm text-primary-light font-medium">Ilk sipariste %20 indirim</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Projenizi Hayata <span className="text-gradient">Gecirin</span>
          </h2>

          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            3D modelinizi yukleyin, aninda fiyat teklifi alin. Profesyonel ekibimiz
            projenizi en yuksek kalitede uretsin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base flex items-center gap-2 px-10 py-4">
              Ucretsiz Teklif Al
              <ArrowRight size={18} />
            </button>
            <button className="btn-outline text-base px-10 py-4">
              Bize Ulasin
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Ucretsiz tasarim danismanligi
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Hizli fiyat teklifi
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
