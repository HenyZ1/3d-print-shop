import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'

// Ana sayfada mağazaya yönlendiren hafif tanıtım bandı (görseller lazy, fold altı).
const previews = ['/shop/urun-02.jpg', '/shop/urun-18.jpg', '/shop/urun-11.jpg', '/shop/urun-12.jpg']

export default function ShopBanner() {
  return (
    <section className="theme-dark bg-surface py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <span className="badge badge-primary">Mağaza</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mt-5 mb-4 tracking-tight">
              Hazır <span className="text-gradient">Baskı Mağazası</span>
            </h2>
            <p className="text-text-secondary text-lg mb-7 max-w-md">
              15+ gerçek baskı — film & oyun figürleri, kristal dekor objeleri ve koleksiyon setleri.
              Beğen, WhatsApp'tan sipariş ver.
            </p>
            <Link to="/magaza" className="btn-primary px-7 py-3.5 inline-flex items-center gap-2 group">
              <ShoppingBag size={16} /> Mağazaya Git
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {previews.map((p) => (
              <Link
                key={p}
                to="/magaza"
                className="aspect-square rounded-2xl overflow-hidden border border-border-light bg-surface-light/40 group"
              >
                <img
                  src={p}
                  loading="lazy"
                  alt="MicronForge 3D baskı ürünü"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
