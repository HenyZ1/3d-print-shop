import { motion } from 'framer-motion'

const cards = [
  {
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
    label: 'Prototip Uretim',
    pos: 'top-[8%] left-[2%]',
    delay: 0,
    size: 'w-36 h-36',
    rotate: '-6deg',
  },
  {
    img: 'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?w=300&h=300&fit=crop',
    label: 'Mimari Maket',
    pos: 'top-[5%] right-[5%]',
    delay: 0.4,
    size: 'w-32 h-32',
    rotate: '4deg',
  },
  {
    img: 'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=300&h=300&fit=crop',
    label: 'Mekanik Parca',
    pos: 'bottom-[30%] left-[-2%]',
    delay: 0.8,
    size: 'w-28 h-28',
    rotate: '-3deg',
  },
  {
    img: 'https://images.unsplash.com/photo-1615286922420-c6b348ffbd62?w=300&h=300&fit=crop',
    label: 'Figur & Heykel',
    pos: 'bottom-[8%] right-[2%]',
    delay: 1.2,
    size: 'w-34 h-34',
    rotate: '5deg',
  },
  {
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop',
    label: 'Medikal Model',
    pos: 'bottom-[12%] left-[25%]',
    delay: 0.6,
    size: 'w-28 h-28',
    rotate: '-2deg',
  },
  {
    img: 'https://images.unsplash.com/photo-1636955816868-fcb881e57954?w=300&h=300&fit=crop',
    label: 'Dekoratif Urun',
    pos: 'top-[35%] right-[-3%]',
    delay: 1.0,
    size: 'w-30 h-30',
    rotate: '3deg',
  },
]

function FloatingCard({ img, label, pos, delay, size, rotate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 + delay, ease: 'easeOut' }}
      className={`absolute ${pos} z-20`}
      style={{ rotate }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="group cursor-pointer"
      >
        <div className="glass-strong rounded-2xl p-1.5 shadow-xl shadow-black/30 hover:glow-primary transition-all duration-500 hover:scale-105">
          <div className={`${size} min-w-28 min-h-28 rounded-xl overflow-hidden relative`}>
            <img
              src={img}
              alt={label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-white font-heading tracking-wide">
              {label}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FloatingCards() {
  return (
    <>
      {cards.map((card, i) => (
        <FloatingCard key={i} {...card} />
      ))}
    </>
  )
}
