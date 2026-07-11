import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Heart, Eye, MessageCircle, RotateCcw, Maximize2 } from 'lucide-react'
import ProductVisual from './ProductVisual'
import STLModal from './STLModal'

const CardModelViewer = lazy(() => import('../three/CardModelViewer'))

// To showcase real prints:
// 1. Drop .stl/.3mf file in /public/models/stl/
// 2. Set stlFile: '/models/stl/file.ext'
// 3. Card automatically shows 3D badge + opens interactive viewer on click

const galleryItems = [
  {
    id: 1,
    title: 'Gandalf Diorama',
    desc: 'Yüksek detaylı sahne, LOTR fan koleksiyonu',
    category: 'frp',
    categoryLabel: 'Koleksiyon',
    shape: 'icosahedron',
    color: '#6C3CE9',
    price: 1450,
    material: 'Tough Reçine',
    detail: '25μ',
    stlFile: null, // 78MB — küçültülmüş STL eklenince 3D açılır
  },
  {
    id: 2,
    title: 'Emerald Karambit',
    desc: 'Detaylı bıçak modeli, koleksiyon ve dekor',
    category: 'kisisel',
    categoryLabel: 'Dekoratif',
    shape: 'octahedron',
    color: '#10B981',
    price: 650,
    material: 'Renkli Reçine',
    detail: '25μ',
    stlFile: '/models/stl/karambit.stl',
  },
  {
    id: 3,
    title: 'Princess Figure',
    desc: 'Stilize karakter figürü, hediye / koleksiyon',
    category: 'kisisel',
    categoryLabel: 'Kişiye Özel',
    shape: 'sphere',
    color: '#FF6B35',
    price: 480,
    material: 'Standart Reçine',
    detail: '25μ',
    stlFile: '/models/stl/princess.stl',
  },
  {
    id: 4,
    title: 'Little Yoda',
    desc: 'Chibi tarzı minyatür, masaüstü koleksiyon',
    category: 'frp',
    categoryLabel: 'Koleksiyon',
    shape: 'sphere',
    color: '#8B5CF6',
    price: 380,
    material: 'Standart Reçine',
    detail: '25μ',
    stlFile: '/models/stl/yoda.stl',
  },
  {
    id: 5,
    title: 'Gollum Kalemlik',
    desc: 'Fonksiyonel masaüstü aksesuar, fanlar için',
    category: 'kisisel',
    categoryLabel: 'Masaüstü',
    shape: 'cylinder',
    color: '#00E5FF',
    price: 720,
    material: 'Tough Reçine',
    detail: '50μ',
    stlFile: null, // 3MF çok yüksek poligonlu — STL export'u eklenince 3D açılır
  },
  {
    id: 6,
    title: 'Monochrome Portrait',
    desc: 'AI üretim portre rölyef, kişisel hediye',
    category: 'kisisel',
    categoryLabel: 'Kişiye Özel',
    shape: 'cube',
    color: '#6C3CE9',
    price: 850,
    material: 'Gri Reçine',
    detail: '25μ',
    stlFile: null, // 63MB — küçültülmüş STL eklenince 3D açılır
  },
  {
    id: 7,
    title: 'Mimari Maket İnsanları',
    desc: '1/100 ölçek, 20 adet figür seti (örnek)',
    category: 'mimari',
    categoryLabel: 'Mimari',
    shape: 'cylinder',
    color: '#00E5FF',
    price: 180,
    material: 'Standart Reçine',
    detail: '50μ',
    stlFile: null,
  },
  {
    id: 8,
    title: 'Elektronik Kutu Prototipi',
    desc: 'Mockup sunum modeli, Manisa OSB',
    category: 'sanayi',
    categoryLabel: 'Sanayi',
    shape: 'cube',
    color: '#8B5CF6',
    price: 1450,
    material: 'Tough Reçine',
    detail: '50μ',
    stlFile: null,
  },
  {
    id: 9,
    title: 'Cephe Detay · 1/200',
    desc: 'Modern bina cephesi, iç mimari brief',
    category: 'mimari',
    categoryLabel: 'Mimari',
    shape: 'cube',
    color: '#00E5FF',
    price: 320,
    material: 'Gri Reçine',
    detail: '50μ',
    stlFile: null,
  },
]

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'frp', label: 'Koleksiyon / Figür' },
  { id: 'kisisel', label: 'Kişiye Özel' },
  { id: 'mimari', label: 'Mimari Maket' },
  { id: 'sanayi', label: 'Sanayi Prototip' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [liked, setLiked] = useState(new Set())
  const [modalItem, setModalItem] = useState(null)
  const [active3D, setActive3D] = useState(null) // only one card renders 3D at a time

  // Boot the STL worker early so the first "3D'yi Başlat" click is instant.
  useEffect(() => {
    let done = false
    const warm = () => {
      if (done) return
      done = true
      import('../three/stlWorkerClient').then((m) => m.warmupSTLWorker())
      import('../three/webglWarmup').then((m) => m.warmupWebGL())
    }
    const t = setTimeout(warm, 1500)
    window.addEventListener('pointerdown', warm, { once: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('pointerdown', warm)
    }
  }, [])

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === filter)

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <>
      <section id="gallery" className="theme-dark bg-surface py-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge badge-primary">Galeri</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
              Gerçek <span className="text-gradient">Baskılarımız</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              "3D Önizle" rozeti olan ürünlere tıkla, modeli 360° döndür ve farklı reçineleri dene.
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
                    layoutId="galleryFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group glass-card rounded-3xl overflow-hidden lift hover:glow-primary transition-all duration-500"
                >
                  <div className="relative h-64 bg-surface-light/40 overflow-hidden">
                    {item.stlFile ? (
                      <Suspense fallback={<ProductVisual shape={item.shape} color={item.color} />}>
                        <CardModelViewer
                          url={item.stlFile}
                          color={item.color}
                          shape={item.shape}
                          active={active3D === item.id}
                          onStart={() => setActive3D(item.id)}
                        />
                      </Suspense>
                    ) : (
                      <ProductVisual shape={item.shape} color={item.color} />
                    )}

                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 pointer-events-none"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {item.categoryLabel}
                    </span>

                    {item.stlFile && (
                      <span className="absolute top-4 right-16 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 bg-accent/20 text-accent border border-accent/40 flex items-center gap-1 pointer-events-none">
                        <RotateCcw size={10} /> 3D
                      </span>
                    )}

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(item.id) }}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                        liked.has(item.id)
                          ? 'bg-accent-warm/20 border border-accent-warm/40'
                          : 'glass border border-white/10 hover:border-accent-warm/40'
                      }`}
                    >
                      <Heart
                        size={14}
                        className={`transition-colors ${
                          liked.has(item.id) ? 'text-accent-warm fill-accent-warm' : 'text-text-secondary'
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); setModalItem(item) }}
                        className="flex-1 glass-strong border border-border-light rounded-xl py-2 flex items-center justify-center gap-1.5 text-xs font-medium hover:border-primary/40 transition-colors"
                      >
                        {item.stlFile ? (<><Maximize2 size={13} /> Büyüt</>) : (<><Eye size={13} /> Detay</>)}
                      </button>
                      <a
                        href="https://wa.me/905311034535"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gradient-to-br from-primary to-primary-light rounded-xl py-2 flex items-center justify-center gap-1.5 text-xs font-medium text-white hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                      >
                        <MessageCircle size={13} /> Soru Sor
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary-light font-mono uppercase tracking-wider border border-primary/15">
                        {item.material}
                      </div>
                      <div className="text-[10px] text-text-secondary font-mono">{item.detail} katman</div>
                    </div>

                    <h3 className="text-lg font-semibold font-heading mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm mb-4">{item.desc}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-text-secondary uppercase tracking-wider">Fiyat</div>
                      <a
                        href="https://wa.me/905311034535"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xl font-bold text-gradient font-heading tracking-tight hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
                      >
                        <span>?</span>
                        <span className="text-xs text-text-secondary normal-case font-normal tracking-normal">Sor</span>
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
            <a href="https://instagram.com/micronforge3d" target="_blank" rel="noreferrer" className="btn-outline px-8 py-4 inline-flex items-center gap-2 group">
              Instagram'da daha fazlası (@micronforge3d)
              <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <STLModal open={!!modalItem} item={modalItem} onClose={() => setModalItem(null)} />
    </>
  )
}
