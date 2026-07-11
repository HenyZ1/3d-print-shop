import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, RotateCcw, Droplets, Loader2 } from 'lucide-react'

const STLViewer = lazy(() => import('../three/STLViewer'))

const materialOptions = [
  { id: 'standart', label: 'Standart', color: '#8B5CF6' },
  { id: 'tough', label: 'Tough', color: '#d4d4d8' },
  { id: 'seffaf', label: 'Şeffaf', color: '#00E5FF' },
  { id: 'gri', label: 'Gri', color: '#888893' },
  { id: 'siyah', label: 'Siyah', color: '#1a1a2e' },
  { id: 'renkli', label: 'Renkli', color: '#FF6B35' },
]

export default function STLModal({ open, onClose, item }) {
  const [material, setMaterial] = useState('standart')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!item) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="theme-dark fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] glass-strong rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-surface/80 backdrop-blur border border-border-light hover:border-accent-warm/40 hover:bg-accent-warm/10 flex items-center justify-center transition-all"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
              {/* 3D Viewer */}
              <div className="lg:col-span-3 relative bg-gradient-to-br from-surface to-surface-light h-[400px] lg:h-[600px]">
                <div className="absolute inset-0 bg-grid-small opacity-20" />

                {item.stlFile ? (
                  <Suspense fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={32} className="animate-spin text-primary" />
                      <span className="ml-3 text-text-secondary text-sm">STL yükleniyor...</span>
                    </div>
                  }>
                    <STLViewer url={item.stlFile} material={material} />
                  </Suspense>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                        <RotateCcw size={24} className="text-primary-light" />
                      </div>
                      <p className="text-sm">STL önizleme bu ürün için henüz yüklenmedi</p>
                    </div>
                  </div>
                )}

                {item.stlFile && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-strong border border-border/60 text-xs text-text-secondary flex items-center gap-2">
                    <RotateCcw size={12} className="text-accent" />
                    Sürükleyerek döndür · Scroll ile yakınlaştır
                  </div>
                )}

                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.categoryLabel}
                </div>
              </div>

              {/* Info panel */}
              <div className="lg:col-span-2 p-6 md:p-8 overflow-y-auto">
                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-2 font-bold">
                  3D Önizleme
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{item.desc}</p>

                {/* Material selector */}
                {item.stlFile && (
                  <div className="mb-6">
                    <label className="text-xs text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Droplets size={12} />
                      Reçine Önizleme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {materialOptions.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMaterial(m.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            material === m.id
                              ? 'glass-strong border border-primary/40 text-text-primary'
                              : 'bg-surface/60 border border-border/60 text-text-secondary hover:border-border-light'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ background: m.color }}
                          />
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="px-4 py-3 rounded-xl bg-surface/60 border border-border/60">
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Tip</div>
                    <div className="font-heading font-semibold text-sm">{item.material}</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-surface/60 border border-border/60">
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Katman</div>
                    <div className="font-heading font-semibold text-sm">{item.detail}</div>
                  </div>
                </div>

                <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-6">
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Fiyat</div>
                  <div className="text-3xl font-bold font-heading text-gradient flex items-center gap-3">
                    <span className="text-5xl leading-none">?</span>
                    <span className="text-sm text-text-secondary font-normal">Foto gonder, ozel teklif al</span>
                  </div>
                  <div className="text-text-secondary text-xs mt-2">
                    Boyut, detay ve reçineye göre hesaplanır
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href="#order"
                    onClick={onClose}
                    className="btn-primary py-3 flex items-center justify-center gap-2 text-sm"
                  >
                    Benzeri İste
                  </a>
                  <a
                    href="https://wa.me/905311034535"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 rounded-xl flex items-center justify-center gap-2 text-sm border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 transition-colors font-semibold"
                  >
                    <MessageCircle size={14} /> WhatsApp'tan Sor
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
