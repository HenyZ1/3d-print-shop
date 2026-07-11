import { motion } from 'framer-motion'

const shapes = {
  torus: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="torus-grad">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="60%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <g transform="translate(100 100)">
        <ellipse cx="0" cy="0" rx="65" ry="22" fill="none" stroke="url(#torus-grad)" strokeWidth="14" />
        <ellipse cx="0" cy="0" rx="50" ry="16" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="2" />
      </g>
    </svg>
  ),
  sphere: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="sph-grad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="40%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="60" fill="url(#sph-grad)" />
      <circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  ),
  icosahedron: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="ico-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g transform="translate(100 100)">
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="url(#ico-grad)" stroke={color} strokeWidth="1.2" />
        <polygon points="0,-60 52,-30 0,0 -52,-30" fill={color} fillOpacity="0.55" />
        <polygon points="0,0 52,-30 52,30" fill={color} fillOpacity="0.3" />
        <polygon points="0,0 52,30 0,60" fill={color} fillOpacity="0.45" />
        <line x1="0" y1="-60" x2="0" y2="60" stroke="white" strokeOpacity="0.15" />
      </g>
    </svg>
  ),
  cylinder: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="cyl-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g transform="translate(100 100)">
        <rect x="-40" y="-50" width="80" height="100" fill="url(#cyl-grad)" />
        <ellipse cx="0" cy="-50" rx="40" ry="12" fill={color} fillOpacity="0.9" />
        <ellipse cx="0" cy="50" rx="40" ry="12" fill={color} fillOpacity="0.6" />
      </g>
    </svg>
  ),
  cube: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="cube-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g transform="translate(100 100)">
        <polygon points="-50,-30 0,-55 50,-30 0,-5" fill={color} fillOpacity="0.95" />
        <polygon points="-50,-30 0,-5 0,55 -50,30" fill="url(#cube-grad)" />
        <polygon points="50,-30 0,-5 0,55 50,30" fill={color} fillOpacity="0.55" />
      </g>
    </svg>
  ),
  octahedron: (color) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="oct-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g transform="translate(100 100)">
        <polygon points="0,-60 50,0 0,60 -50,0" fill="url(#oct-grad)" stroke={color} strokeWidth="1" />
        <polygon points="0,-60 50,0 0,0" fill={color} fillOpacity="0.85" />
        <polygon points="0,0 50,0 0,60" fill={color} fillOpacity="0.4" />
      </g>
    </svg>
  ),
}

export default function ProductVisual({ shape = 'cube', color = '#6C3CE9' }) {
  const Shape = shapes[shape] || shapes.cube
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}25 0%, transparent 60%)`,
        }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-small opacity-30" />

      {/* Glow orb behind shape */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl animate-pulse-glow"
        style={{ background: color, opacity: 0.35 }}
      />

      {/* Floating shape */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: `drop-shadow(0 10px 30px ${color}50)` }}
      >
        <div className="w-44 h-44">
          {Shape(color)}
        </div>
      </motion.div>

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-3 rounded-full blur-md"
        style={{ background: color, opacity: 0.4 }}
      />
    </div>
  )
}
