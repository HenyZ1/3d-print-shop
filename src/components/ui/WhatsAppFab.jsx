import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppFab() {
  const [show, setShow] = useState(false)
  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-show tooltip once after appearing
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setTooltip(true), 800)
      const t2 = setTimeout(() => setTooltip(false), 5500)
      return () => { clearTimeout(t); clearTimeout(t2) }
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-3"
        >
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="relative bg-white rounded-2xl shadow-2xl shadow-black/15 px-4 py-3 max-w-[220px] border border-border"
              >
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-surface-light border border-border flex items-center justify-center hover:bg-border transition-colors"
                  aria-label="Kapat"
                >
                  <X size={11} className="text-text-secondary" />
                </button>
                <div className="text-sm font-semibold text-text-primary mb-0.5">Foto gönder, teklif al 📸</div>
                <div className="text-xs text-text-secondary">Genelde 30 dk içinde dönüş yapıyoruz</div>
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-border rotate-[-45deg]" />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="https://wa.me/905311034535?text=Merhaba!%203D%20recine%20baski%20teklifi%20almak%20istiyorum."
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setTooltip(true)}
            aria-label="WhatsApp'tan yaz"
            className="relative w-15 h-15 flex items-center justify-center group"
            style={{ width: 60, height: 60 }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            <span className="absolute inset-0 rounded-full bg-green-500/30 blur-md" />
            <span className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <MessageCircle size={26} className="text-white" fill="white" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
