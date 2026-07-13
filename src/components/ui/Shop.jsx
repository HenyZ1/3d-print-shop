import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Heart, ShoppingBag, MessageCircle, Eye } from 'lucide-react'
import { products, filters, fmt, waOrder, SITE } from '../../data/products'
import useJsonLd from '../../hooks/useJsonLd'

export default function Shop() {
  const [filter, setFilter] = useState('all')
  const [liked, setLiked] = useState(new Set())

  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter)

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'MicronForge Hazır Baskı Mağazası',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}/magaza/${p.id}`,
        name: p.name,
      })),
    }),
    []
  )
  useJsonLd('shop-itemlist-jsonld', jsonLd)

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section id="magaza" className="theme-dark bg-surface py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 pt-8"
        >
          <span className="badge badge-primary">Mağaza</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Hazır <span className="text-gradient">Baskılarımız</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Gerçek baskılarımızdan seç, WhatsApp'tan sipariş ver. Aynı modeli farklı boyut,
            renk ve reçineyle de basıyoruz.
          </p>
          <p className="text-text-secondary/70 max-w-lg mx-auto text-xs mt-3">
            * Fiyatlar standart boyut içindir; boyut, adet ve boyama detayına göre değişir.
            Kesin fiyat için WhatsApp'tan yazın.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-2 text-text-secondary text-sm mr-2">
            <Filter size={14} />
            <span className="hidden sm:inline uppercase text-xs tracking-wider">Kategori:</span>
          </div>
          {filters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat.id
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary border border-border-light bg-surface-light/40'
              }`}
            >
              {filter === cat.id && (
                <motion.span
                  layoutId="shopFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group glass-card rounded-3xl overflow-hidden lift hover:glow-primary transition-all duration-500 flex flex-col"
              >
                <Link
                  to={`/magaza/${item.id}`}
                  className="relative aspect-[4/5] bg-surface-light/40 overflow-hidden block"
                  aria-label={`${item.name} detayları`}
                >
                  <img
                    src={item.photos[0]}
                    alt={`${item.name} — SLA reçine 3D baskı`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider z-10 bg-primary/25 text-white border border-white/20 backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>

                  {item.featured && (
                    <span className="absolute top-3 right-12 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider z-10 bg-accent/25 text-accent border border-accent/40 backdrop-blur-sm">
                      XL
                    </span>
                  )}

                  <span
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(item.id) }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); toggleLike(item.id) } }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20 cursor-pointer ${
                      liked.has(item.id)
                        ? 'bg-accent-warm/25 border border-accent-warm/40'
                        : 'glass border border-white/10 hover:border-accent-warm/40'
                    }`}
                  >
                    <Heart
                      size={13}
                      className={`transition-colors ${
                        liked.has(item.id) ? 'text-accent-warm fill-accent-warm' : 'text-white/80'
                      }`}
                    />
                  </span>

                  <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 glass-strong border border-border-light rounded-xl py-2 text-xs font-medium pointer-events-none">
                    <Eye size={13} /> Detayları Gör
                    {item.photos.length > 1 && (
                      <span className="text-text-secondary">· {item.photos.length} foto</span>
                    )}
                  </span>
                </Link>

                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] px-2 py-0.5 rounded-md bg-primary/10 text-primary-light font-mono uppercase tracking-wider border border-primary/15">
                      {item.material}
                    </div>
                  </div>

                  <Link to={`/magaza/${item.id}`} className="hover:text-primary-light transition-colors">
                    <h3 className="text-base font-semibold font-heading mb-1 leading-tight">{item.name}</h3>
                  </Link>
                  <p className="text-text-secondary text-xs mb-4 leading-relaxed flex-1">{item.desc}</p>

                  <div className="flex items-end justify-between gap-2 mt-auto">
                    <div>
                      <div className="text-[10px] text-text-secondary uppercase tracking-wider">
                        {item.price != null ? 'Fiyat' : 'Başlangıç'}
                      </div>
                      <div className="text-lg font-bold text-gradient font-heading tracking-tight">
                        {fmt(item.price ?? item.priceFrom)} ₺{item.price == null && "'den"}
                      </div>
                    </div>
                    <a
                      href={waOrder(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gradient-to-br from-primary to-primary-light rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-white hover:shadow-lg hover:shadow-primary/30 transition-shadow whitespace-nowrap"
                    >
                      <ShoppingBag size={13} /> Sipariş
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-text-secondary mb-5">
            Aradığın modeli bulamadın mı? Fotoğrafını gönder, sana özel basalım.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/905311034535"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-7 py-3.5 inline-flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp'tan Yaz
            </a>
            <a
              href="https://instagram.com/micronforge3d"
              target="_blank"
              rel="noreferrer"
              className="btn-outline px-7 py-3.5 inline-flex items-center gap-2 group"
            >
              Instagram'da daha fazlası
              <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
