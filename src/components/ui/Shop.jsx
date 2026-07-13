import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Heart, Maximize2, ShoppingBag, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Gerçek baskılarımız — stl_photos arşivinden. Her ürün gerçek fotoğraf + fiyat.
// Fiyatlar standart boyut/tek renk içindir; boyut, adet ve boyama ile değişir.
const products = [
  {
    id: 'buz-ejderha',
    name: 'Buz Ejderhası',
    desc: 'Dev boyut, dikenli kristal gövde — vitrinlik koleksiyon parçası.',
    category: 'dekor',
    categoryLabel: 'Kristal Sanat',
    material: 'Şeffaf Reçine',
    price: 1850,
    featured: true,
    photos: ['/shop/urun-02.jpg'],
  },
  {
    id: 'anka-kusu',
    name: 'Kristal Anka Kuşu',
    desc: 'Açık kanatlı, ince tüy detaylı büyük dekoratif heykel.',
    category: 'dekor',
    categoryLabel: 'Kristal Sanat',
    material: 'Şeffaf Reçine',
    price: 1650,
    featured: true,
    photos: ['/shop/urun-03.jpg'],
  },
  {
    id: 'kurt',
    name: 'Low-Poly Kurt',
    desc: 'Geometrik uluyan kurt, buzul görünümlü şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Şeffaf Reçine',
    price: 450,
    photos: ['/shop/urun-01.jpg', '/shop/urun-10.jpg'],
  },
  {
    id: 'kurukafa',
    name: 'Anatomik Kurukafa',
    desc: 'Gerçek oranlı kafatası, masaüstü dekoru — şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Şeffaf Reçine',
    price: 380,
    photos: ['/shop/urun-05.jpg', '/shop/urun-04.jpg'],
  },
  {
    id: 'boga',
    name: 'Boğa Heykeli',
    desc: 'Wall Street tarzı saldıran boğa, metalik bronz kaplama.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Metalik Boyalı',
    price: 680,
    photos: ['/shop/urun-15.jpg'],
  },
  {
    id: 'atlas',
    name: 'Atlas Heykeli',
    desc: 'Dünyayı taşıyan Atlas — mitolojik, antik patine dekor.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Boyalı Reçine',
    price: 720,
    photos: ['/shop/urun-21.jpg', '/shop/urun-23.jpg'],
  },
  {
    id: 'hulk',
    name: 'Hulk Figürü',
    desc: 'El boyaması kaslı Hulk, ~20 cm sergi figürü.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Boyalı Reçine',
    price: 880,
    photos: ['/shop/urun-18.jpg', '/shop/urun-19.jpg'],
  },
  {
    id: 'spiderman',
    name: 'Spider-Man Figürü',
    desc: 'Poz veren, el boyaması Örümcek Adam figürü.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Boyalı Reçine',
    price: 750,
    photos: ['/shop/urun-06.jpg', '/shop/urun-07.jpg'],
  },
  {
    id: 'gandalf',
    name: 'Beyaz Büyücü',
    desc: 'Asalı beyaz büyücü, ince el boyama — LOTR koleksiyonu.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Boyalı Reçine',
    price: 720,
    photos: ['/shop/urun-16.jpg'],
  },
  {
    id: 'gollum',
    name: 'Gollum',
    desc: 'Kaya üzerinde Gollum / Sméagol, detaylı el boyama.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Boyalı Reçine',
    price: 560,
    photos: ['/shop/urun-20.jpg'],
  },
  {
    id: 'yoda',
    name: 'Usta Yoda',
    desc: 'Asasıyla Usta Yoda, zümrüt yeşili şeffaf reçine.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Renkli Reçine',
    price: 420,
    photos: ['/shop/urun-12.jpg', '/shop/urun-13.jpg'],
  },
  {
    id: 'grogu',
    name: 'Grogu (Baby Yoda)',
    desc: 'Sevimli Grogu minyatürü, yeşil şeffaf reçine.',
    category: 'figur',
    categoryLabel: 'Film & Oyun',
    material: 'Renkli Reçine',
    price: 220,
    photos: ['/shop/urun-14.jpg', '/shop/urun-24.jpg'],
  },
  {
    id: 'sirinler',
    name: 'Şirinler Seti',
    desc: '4 Şirin + mantar ev + Gargamel — 6 parça boyalı set.',
    category: 'set',
    categoryLabel: 'Set & Koleksiyon',
    material: 'Boyalı Reçine',
    price: 1250,
    photos: ['/shop/urun-11.jpg', '/shop/urun-17.jpg'],
  },
  {
    id: 'grogu-ikili',
    name: 'Grogu İkili Set',
    desc: 'İki farklı pozda Grogu — hediyelik ikili paket.',
    category: 'set',
    categoryLabel: 'Set & Koleksiyon',
    material: 'Renkli Reçine',
    price: 380,
    photos: ['/shop/urun-22.jpg'],
  },
  {
    id: 'ozel-figur',
    name: 'Kişiye Özel Figür / Büst',
    desc: 'Fotoğrafından 3D figür veya büst. Fiyat modele göre değişir.',
    category: 'ozel',
    categoryLabel: 'Kişiye Özel',
    material: 'Boyalı Reçine',
    price: null,
    priceFrom: 300,
    photos: ['/shop/urun-08.jpg', '/shop/urun-09.jpg'],
  },
]

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'figur', label: 'Film & Oyun' },
  { id: 'dekor', label: 'Dekoratif & Sanat' },
  { id: 'set', label: 'Set & Koleksiyon' },
  { id: 'ozel', label: 'Kişiye Özel' },
]

const fmt = (n) => new Intl.NumberFormat('tr-TR').format(n)

const waOrder = (name) =>
  `https://wa.me/905311034535?text=${encodeURIComponent(
    `Merhaba! "${name}" ürününü sipariş vermek istiyorum. Fiyat ve teslim bilgisi alabilir miyim?`
  )}`

export default function Shop() {
  const [filter, setFilter] = useState('all')
  const [liked, setLiked] = useState(new Set())
  const [lightbox, setLightbox] = useState(null) // { product, index }

  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter)

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const openLightbox = (product, index = 0) => setLightbox({ product, index })
  const closeLightbox = () => setLightbox(null)
  const step = (dir) =>
    setLightbox((lb) => {
      if (!lb) return lb
      const len = lb.product.photos.length
      return { ...lb, index: (lb.index + dir + len) % len }
    })

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <section id="magaza" className="theme-dark bg-surface py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge badge-primary">Mağaza</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
              Hazır <span className="text-gradient">Baskılarımız</span>
            </h2>
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
                  <button
                    onClick={() => openLightbox(item, 0)}
                    className="relative aspect-[4/5] bg-surface-light/40 overflow-hidden block text-left"
                    aria-label={`${item.name} fotoğrafını büyüt`}
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
                      onClick={(e) => { e.stopPropagation(); toggleLike(item.id) }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); toggleLike(item.id) } }}
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
                      <Maximize2 size={13} /> Fotoğrafı Büyüt
                      {item.photos.length > 1 && (
                        <span className="text-text-secondary">· {item.photos.length}</span>
                      )}
                    </span>
                  </button>

                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[9px] px-2 py-0.5 rounded-md bg-primary/10 text-primary-light font-mono uppercase tracking-wider border border-primary/15">
                        {item.material}
                      </div>
                    </div>

                    <h3 className="text-base font-semibold font-heading mb-1 leading-tight">{item.name}</h3>
                    <p className="text-text-secondary text-xs mb-4 leading-relaxed flex-1">{item.desc}</p>

                    <div className="flex items-end justify-between gap-2 mt-auto">
                      <div>
                        {item.price != null ? (
                          <>
                            <div className="text-[10px] text-text-secondary uppercase tracking-wider">Fiyat</div>
                            <div className="text-lg font-bold text-gradient font-heading tracking-tight">
                              {fmt(item.price)} ₺
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-[10px] text-text-secondary uppercase tracking-wider">Başlangıç</div>
                            <div className="text-lg font-bold text-gradient font-heading tracking-tight">
                              {fmt(item.priceFrom)} ₺
                            </div>
                          </>
                        )}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row gap-5"
            >
              <div className="relative flex-1 min-h-0 flex items-center justify-center">
                <img
                  src={lightbox.product.photos[lightbox.index]}
                  alt={lightbox.product.name}
                  className="max-h-[62vh] md:max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                />
                {lightbox.product.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => step(-1)}
                      aria-label="Önceki"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Sonraki"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="md:w-64 flex-shrink-0 glass-card rounded-2xl p-5 flex flex-col">
                <button
                  onClick={closeLightbox}
                  aria-label="Kapat"
                  className="self-end w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors mb-2"
                >
                  <X size={16} />
                </button>
                <div className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary-light font-mono uppercase tracking-wider border border-primary/15 self-start mb-3">
                  {lightbox.product.material}
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{lightbox.product.name}</h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">{lightbox.product.desc}</p>

                {lightbox.product.photos.length > 1 && (
                  <div className="flex gap-2 mb-4">
                    {lightbox.product.photos.map((ph, i) => (
                      <button
                        key={ph}
                        onClick={() => setLightbox((lb) => ({ ...lb, index: i }))}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                          i === lightbox.index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={ph} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider">
                    {lightbox.product.price != null ? 'Fiyat' : 'Başlangıç'}
                  </div>
                  <div className="text-2xl font-bold text-gradient font-heading tracking-tight">
                    {fmt(lightbox.product.price ?? lightbox.product.priceFrom)} ₺
                  </div>
                </div>

                <a
                  href={waOrder(lightbox.product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-br from-primary to-primary-light rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                >
                  <ShoppingBag size={15} /> WhatsApp'tan Sipariş Ver
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
