import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, RotateCcw, Layers, Box, Droplets, Wrench } from 'lucide-react'
import HeroScene from '../three/HeroScene'

const models = [
  { id: 'vase', label: 'Vazo', icon: '🏺' },
  { id: 'helmet', label: 'Kask', icon: '⛑️' },
  { id: 'gear', label: 'Disli', icon: '⚙️' },
  { id: 'figure', label: 'Figur', icon: '🧑' },
]

const materials = [
  { id: 'pla', label: 'PLA', color: '#6C3CE9' },
  { id: 'resin', label: 'Resin', color: '#00E5FF' },
  { id: 'metal', label: 'Metal', color: '#c0c0c0' },
  { id: 'wood', label: 'Ahsap', color: '#c4873b' },
  { id: 'black', label: 'Siyah', color: '#1a1a2e' },
]

export default function Hero() {
  const [activeModel, setActiveModel] = useState('vase')
  const [material, setMaterial] = useState('pla')
  const [printing, setPrinting] = useState(false)
  const [clipY, setClipY] = useState(10)
  const animRef = useRef(null)

  const startPrint = () => {
    if (printing) return
    setPrinting(true)
    setClipY(0)
    let y = 0
    const tick = () => {
      y += 0.02
      setClipY(y)
      if (y < 2) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        setClipY(10)
        setPrinting(false)
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-primary/15 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left — text */}
          <div className="relative z-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 text-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-text-secondary">Yeni nesil 3D baski teknolojisi</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] mb-6"
            >
              Hayallerinizi{' '}<span className="text-gradient">3D</span><br />
              Olarak<br />Basiyoruz
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="text-text-secondary text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
            >
              Profesyonel 3D baski hizmetleri ile fikirlerinizi gercege donusturun.
              Yuksek kalite, hizli teslimat ve sinirsize yakin malzeme secenekleri.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <button className="btn-primary text-base flex items-center gap-2 px-8 py-4">
                Urunleri Kesfet <ArrowRight size={18} />
              </button>
              <button className="btn-outline text-base flex items-center gap-2 px-8 py-4">
                <Play size={18} className="text-accent" /> Nasil Calisir?
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-8 mt-14 flex-wrap"
            >
              {[
                { value: '10K+', label: 'Mutlu Musteri' },
                { value: '50+', label: 'Malzeme Cesidi' },
                { value: '0.05mm', label: 'Hassasiyet' },
                { value: '24 Saat', label: 'Hizli Teslimat' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold font-heading text-gradient">{stat.value}</div>
                  <div className="text-text-secondary text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — interactive 3D showcase */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:flex flex-col items-center"
          >
            {/* 3D Viewer */}
            <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass" style={{ border: '1px solid rgba(108,60,233,0.2)' }}>
              <HeroScene activeModel={activeModel} material={material} clipY={clipY} />

              {/* Drag hint */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-[11px] text-text-secondary">
                <RotateCcw size={12} /> Surukleyerek dondur
              </div>

              {/* Active model label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm"
                >
                  <div className="text-[11px] text-text-secondary uppercase tracking-widest">Model</div>
                  <div className="text-sm font-semibold font-heading">
                    {models.find(m => m.id === activeModel)?.icon}{' '}
                    {models.find(m => m.id === activeModel)?.label}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Print animation button */}
              <button
                onClick={startPrint}
                disabled={printing || activeModel !== 'vase'}
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-heading transition-all ${
                  printing
                    ? 'bg-accent/20 text-accent border border-accent/30 cursor-wait'
                    : activeModel === 'vase'
                      ? 'bg-primary/20 text-primary-light border border-primary/30 hover:bg-primary/30 cursor-pointer'
                      : 'bg-white/5 text-text-secondary border border-border cursor-not-allowed opacity-50'
                }`}
              >
                <Layers size={15} />
                {printing ? 'Basiliyor...' : 'Baski Simulasyonu'}
              </button>
            </div>

            {/* Controls below the viewer */}
            <div className="w-full mt-4 flex flex-col gap-3">
              {/* Model selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-secondary uppercase tracking-widest w-16 shrink-0">
                  <Box size={12} className="inline mr-1 mb-0.5" />Urun
                </span>
                <div className="flex gap-2 flex-1">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setActiveModel(m.id); setClipY(10); setPrinting(false); if (animRef.current) cancelAnimationFrame(animRef.current); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeModel === m.id
                          ? 'glass-strong glow-primary text-text-primary'
                          : 'bg-surface-light border border-border text-text-secondary hover:border-primary/40'
                      }`}
                    >
                      <span>{m.icon}</span> {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-secondary uppercase tracking-widest w-16 shrink-0">
                  <Droplets size={12} className="inline mr-1 mb-0.5" />Malzeme
                </span>
                <div className="flex gap-1.5 flex-1">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        material === m.id
                          ? 'glass-strong glow-primary text-text-primary'
                          : 'bg-surface-light border border-border text-text-secondary hover:border-primary/40'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: m.color }} />
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-30" />
    </section>
  )
}
