import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import ProductScene from '../three/ProductScene'

const products = [
  {
    id: 1,
    name: 'Geometrik Vazo',
    description: 'Modern geometrik tasarimli dekoratif vazo',
    price: 249,
    oldPrice: 349,
    rating: 4.9,
    reviews: 128,
    shape: 'torus',
    color: '#6C3CE9',
    tag: 'Populer',
    material: 'PLA+',
  },
  {
    id: 2,
    name: 'Organik Lamba',
    description: 'Dogadan esinlenen benzersiz masa lambasi',
    price: 399,
    oldPrice: null,
    rating: 4.8,
    reviews: 96,
    shape: 'sphere',
    color: '#00E5FF',
    tag: 'Yeni',
    material: 'PETG',
  },
  {
    id: 3,
    name: 'Kristal Heykel',
    description: 'Low-poly kristal tasarimli sanat eseri',
    price: 189,
    oldPrice: 259,
    rating: 4.7,
    reviews: 204,
    shape: 'icosahedron',
    color: '#FF6B35',
    tag: 'Indirim',
    material: 'Resin',
  },
  {
    id: 4,
    name: 'Minimalist Saksisi',
    description: 'Sade ve elegant bitki saksisi',
    price: 149,
    oldPrice: null,
    rating: 4.9,
    reviews: 312,
    shape: 'cylinder',
    color: '#8B5CF6',
    tag: null,
    material: 'PLA',
  },
  {
    id: 5,
    name: 'Masa Organizator',
    description: 'Cok bolmeli modern masa duzenleyici',
    price: 329,
    oldPrice: 429,
    rating: 4.6,
    reviews: 78,
    shape: 'cube',
    color: '#6C3CE9',
    tag: 'Populer',
    material: 'ABS',
  },
  {
    id: 6,
    name: 'Dekoratif Piramit',
    description: 'Geometrik piramit seklinde dekor',
    price: 199,
    oldPrice: null,
    rating: 4.8,
    reviews: 156,
    shape: 'octahedron',
    color: '#00E5FF',
    tag: 'Yeni',
    material: 'PLA+',
  },
]

const tagColors = {
  'Populer': 'bg-primary/20 text-primary-light',
  'Yeni': 'bg-accent/20 text-accent',
  'Indirim': 'bg-accent-warm/20 text-accent-warm',
}

export default function Products() {
  return (
    <section id="products" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Koleksiyon</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-4">
            One Cikan <span className="text-gradient">Urunler</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Her biri ozenle tasarlanmis ve en yuksek kalitede basilmis benzersiz urunlerimizi kesfedin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
            >
              <div className="relative h-64 bg-surface-light overflow-hidden">
                <ProductScene shape={product.shape} color={product.color} />
                {product.tag && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${tagColors[product.tag]}`}>
                    {product.tag}
                  </span>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/30 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/30 transition-colors">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-accent-warm fill-accent-warm" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-text-secondary text-xs">({product.reviews})</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-surface-light text-text-secondary">
                    {product.material}
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-heading mb-1">{product.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gradient">{product.price} TL</span>
                    {product.oldPrice && (
                      <span className="text-text-secondary text-sm line-through">{product.oldPrice} TL</span>
                    )}
                  </div>
                  <button className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
                    <ShoppingCart size={14} />
                    Ekle
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-outline px-10 py-4">
            Tum Urunleri Gor
          </button>
        </motion.div>
      </div>
    </section>
  )
}
