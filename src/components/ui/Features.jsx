import { motion } from 'framer-motion'
import { Layers, Zap, Shield, Palette, Truck, Headphones, ChevronRight } from 'lucide-react'

export default function Features() {
  return (
    <section id="features" className="cv-auto py-24 px-6 relative bg-surface-light overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary">Neden Biz?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Farkımızı <span className="text-gradient">Keşfet</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Kalite, hız ve müşteri memnuniyetini her siparişte önceliğimiz olarak görüyoruz.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* Big feature card - Precision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2 glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden group lift"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-700" />
            <div className="absolute inset-0 bg-grid-small opacity-30" />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <Layers size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                Mikron Seviye <span className="text-gradient">Detay</span>
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
                25 mikron katman kalınlığı ile SLA reçine baskının verebileceği en yüksek detay. Pürüzsüz yüzey, FDM'de imkansız ince detaylar.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {['SLA', 'MSLA', 'DLP', '4K LCD'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/10 text-primary-light border border-primary/20 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/40">
                {[
                  { v: '25μ', l: 'Katman' },
                  { v: '16K', l: 'Çözünürlük' },
                  { v: '405nm', l: 'UV LED' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-xl md:text-2xl font-bold font-heading text-gradient">{s.v}</div>
                    <div className="text-xs text-text-secondary mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Materials count */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-3xl p-6 md:p-7 relative overflow-hidden group lift"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                <Palette size={22} className="text-accent" />
              </div>
              <div className="text-5xl font-bold font-heading text-gradient-cool mb-2">15+</div>
              <h3 className="text-lg font-semibold font-heading mb-2">Reçine Çeşidi</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Standart, Tough, Esnek, Şeffaf, Castable ve dahası.</p>
            </div>
          </motion.div>

          {/* Speed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-3xl p-6 md:p-7 relative overflow-hidden group lift"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-warm/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent-warm/15 flex items-center justify-center mb-4">
                <Zap size={22} className="text-accent-warm" />
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2">48 Saatte Teslim</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Standart siparişleriniz en geç iki iş günü içinde üretime hazır.</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-warm font-medium">
                Express seçenek <ChevronRight size={12} />
              </div>
            </div>
          </motion.div>

          {/* Quality guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-card rounded-3xl p-6 md:p-7 relative overflow-hidden group lift"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-primary-light" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-2">%100 Kalite Garantisi</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Her ürün titiz kalite kontrol sürecinden geçer. Memnun kalmazsanız ücretsiz yeniden basım.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Free shipping */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-card rounded-3xl p-6 md:p-7 relative overflow-hidden group lift"
          >
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/15 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Truck size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading mb-2">Güvenli Kargo</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Manisa & İzmir elden teslim. Türkiye geneli kırılgan paketleme ile güvenli kargo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-6 glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group lift"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Headphones size={24} className="text-primary-light" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-2">7/24 Uzman Destek</h3>
                  <p className="text-text-secondary leading-relaxed max-w-xl">
                    Tasarım aşamasından teslimata kadar her adımda yanınızdayız. WhatsApp, telefon ve e-posta destek.
                  </p>
                </div>
              </div>
              <a href="#order" className="btn-primary text-sm py-2.5 px-5 flex-shrink-0 flex items-center gap-2">
                Bize Ulaşın <ChevronRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
