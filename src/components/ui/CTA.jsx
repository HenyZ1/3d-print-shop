import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MessageCircle, Camera, Image } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Bold gradient conversion card */}
          <div
            className="theme-dark relative rounded-[2.5rem] p-10 md:p-16 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #5021C9 0%, #6C3CE9 45%, #7C3AED 100%)',
              boxShadow: '0 30px 80px rgba(108, 60, 233, 0.35)',
            }}
          >
            {/* Decorative glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-grid-small opacity-[0.07]" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
                <Sparkles size={14} className="text-white" />
                <span className="text-xs text-white font-bold uppercase tracking-widest">Manisa & Izmir</span>
                <span className="text-xs text-white/60">·</span>
                <span className="text-sm text-white font-semibold">Ucretsiz fiyat teklifi</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 tracking-tight leading-[1.1] text-white">
                Foto gönder, 30 dakikada <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white">teklif al.</span>
              </h2>

              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                STL dosyana gerek yok. WhatsApp'tan ya da siteden modelinin fotoğrafını gönder,
                fiyat ve üretim süresi an içinde elinde olsun.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                <a
                  href="#order"
                  className="text-base flex items-center gap-2 px-10 py-4 rounded-xl font-bold font-heading bg-white text-primary hover:bg-white/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-black/20 group"
                >
                  <Camera size={18} />
                  Foto Yukle, Teklif Al
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/905311034535"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base px-10 py-4 rounded-xl flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/15 text-white font-bold font-heading transition-all backdrop-blur-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp'tan Yaz
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: Camera, text: 'STL dosyana gerek yok' },
                  { icon: Sparkles, text: '30 dakikada teklif' },
                  { icon: Image, text: 'Instagram\'dan portfolyo' },
                ].map((b, i) => {
                  const Icon = b.icon
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/15 text-white">
                        <Icon size={16} />
                      </div>
                      <span className="text-sm text-white/90 text-left">{b.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
