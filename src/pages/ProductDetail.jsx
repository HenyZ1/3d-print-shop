import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronLeft, MessageCircle, ArrowLeft } from 'lucide-react'
import { getProduct, products, fmt, waOrder, productJsonLd, SITE } from '../data/products'
import usePageSeo from '../hooks/usePageSeo'
import useJsonLd from '../hooks/useJsonLd'
import ScrollProgress from '../components/ui/ScrollProgress'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import WhatsAppFab from '../components/ui/WhatsAppFab'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [idx, setIdx] = useState(0)

  usePageSeo({
    title: product
      ? `${product.name} — 3D Baskı | MicronForge Mağaza`
      : 'Ürün Bulunamadı | MicronForge',
    description: product
      ? `${product.name}: ${product.desc} ${product.material}. WhatsApp'tan sipariş ver — Manisa & İzmir SLA reçine 3D baskı.`
      : 'Aradığın ürün bulunamadı. MicronForge mağazasındaki tüm baskıları incele.',
    path: product ? `/magaza/${product.id}` : '/magaza',
  })

  const jsonLd = useMemo(() => (product ? productJsonLd(product) : null), [product])
  useJsonLd('product-jsonld', jsonLd)

  if (!product) {
    return (
      <div className="min-h-screen bg-surface">
        <ScrollProgress />
        <Navbar />
        <section className="theme-dark bg-surface min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-4">Ürün bulunamadı</h1>
            <p className="text-text-secondary mb-8">Aradığın ürün kaldırılmış olabilir.</p>
            <Link to="/magaza" className="btn-primary px-7 py-3.5 inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Mağazaya Dön
            </Link>
          </div>
        </section>
        <Footer />
        <WhatsAppFab />
      </div>
    )
  }

  const priceValue = product.price ?? product.priceFrom
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />

      <section className="theme-dark bg-surface pt-28 pb-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[130px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link to="/magaza" className="hover:text-text-primary transition-colors inline-flex items-center gap-1">
              <ChevronLeft size={15} /> Mağaza
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Galeri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-3xl overflow-hidden glass-card aspect-[4/5] bg-surface-light/40">
                <img
                  src={product.photos[idx]}
                  alt={`${product.name} — SLA reçine 3D baskı`}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.photos.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.photos.map((ph, i) => (
                    <button
                      key={ph}
                      onClick={() => setIdx(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        i === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={ph} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Bilgi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] px-3 py-1 rounded-full bg-primary/15 text-primary-light font-semibold uppercase tracking-wider border border-primary/20">
                  {product.categoryLabel}
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-surface-light/60 text-text-secondary font-mono uppercase tracking-wider border border-border-light">
                  {product.material}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 tracking-tight">{product.name}</h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">{product.desc}</p>

              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                  {product.price != null ? 'Fiyat' : 'Başlangıç fiyatı'}
                </div>
                <div className="text-4xl font-bold text-gradient font-heading tracking-tight mb-1">
                  {fmt(priceValue)} ₺{product.price == null && "'den"}
                </div>
                <p className="text-text-secondary/70 text-xs">
                  Standart boyut içindir; boyut, renk ve adet ile değişir.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={waOrder(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={17} /> WhatsApp'tan Sipariş Ver
                </a>
                <a
                  href="https://wa.me/905311034535"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline py-4 px-6 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={17} /> Soru Sor
                </a>
              </div>

              <ul className="text-sm text-text-secondary space-y-2">
                <li>• 16K MSLA, 25 mikron katman — pürüzsüz yüzey</li>
                <li>• Farklı boyut, renk ve reçine seçeneği</li>
                <li>• Manisa & İzmir teslim + Türkiye geneli kargo</li>
              </ul>
            </motion.div>
          </div>

          {/* İlgili ürünler */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold font-heading mb-6">Benzer Ürünler</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/magaza/${p.id}`}
                    className="group glass-card rounded-2xl overflow-hidden lift transition-all duration-500"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-surface-light/40">
                      <img
                        src={p.photos[0]}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold font-heading leading-tight mb-1">{p.name}</div>
                      <div className="text-sm text-gradient font-bold font-heading">
                        {fmt(p.price ?? p.priceFrom)} ₺{p.price == null && "'den"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
