import { useMemo, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Loader2, RotateCcw, Play } from 'lucide-react'
import ProductVisual from '../ui/ProductVisual'
import { useModelGeometry } from './useModelGeometry'

// A procedural "matcap" (material capture) — a soft top-lit sphere gradient.
// MeshMatcapMaterial needs NO lights and compiles a tiny shader, so the
// card starts almost instantly even on integrated GPUs (vs ~1s for PBR).
let _matcap = null
function getMatcap() {
  if (_matcap) return _matcap
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  // base
  ctx.fillStyle = '#3a3a4a'
  ctx.fillRect(0, 0, s, s)
  // key light highlight (top-left)
  const g = ctx.createRadialGradient(s * 0.35, s * 0.3, 2, s * 0.5, s * 0.5, s * 0.62)
  g.addColorStop(0, '#ffffff')
  g.addColorStop(0.35, '#c8c8d4')
  g.addColorStop(0.7, '#5a5a6e')
  g.addColorStop(1, '#1c1c28')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  _matcap = tex
  return tex
}

function Model({ geometry, color }) {
  const ref = useRef()
  const mat = useMemo(
    () => new THREE.MeshMatcapMaterial({ matcap: getMatcap(), color: new THREE.Color(color) }),
    [color]
  )
  useEffect(() => () => mat.dispose(), [mat])

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute('position'))
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return 2.5 / maxDim
  }, [geometry])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6
  })

  return <mesh ref={ref} geometry={geometry} material={mat} scale={scale} dispose={null} />
}

function Scene({ geometry, color }) {
  return <Model geometry={geometry} color={color} />
}

export default function CardModelViewer({ url, color = '#6C3CE9', shape = 'sphere', active = false, onStart }) {
  const { geometry, loading, progress, error } = useModelGeometry(url, active)

  return (
    <div className="absolute inset-0" style={{ touchAction: 'pan-y' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}22 0%, transparent 65%)` }}
      />
      <div className="absolute inset-0 bg-grid-small opacity-25 pointer-events-none" />

      {!active && (
        <div className="absolute inset-0">
          <ProductVisual shape={shape} color={color} />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onStart?.()
            }}
            className="absolute inset-0 flex items-center justify-center z-10 group/play"
            aria-label="3D modeli başlat"
          >
            <div className="flex flex-col items-center gap-2 transition-transform group-hover/play:scale-110">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl transition-all"
                style={{
                  background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                  border: `1px solid ${color}60`,
                  boxShadow: `0 8px 28px ${color}50, inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              >
                <Play size={20} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-lg">
                3D'yi Başlat
              </span>
            </div>
          </button>
        </div>
      )}

      {active && (
        <>
          {geometry && (
            <Canvas
              camera={{ position: [0, 0.5, 4.2], fov: 45 }}
              dpr={1}
              gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
              style={{ background: 'transparent' }}
              performance={{ min: 0.5 }}
            >
              <Scene geometry={geometry} color={color} />
            </Canvas>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-3">
              <Loader2 size={22} className="animate-spin text-primary-light" />
              <div className="text-xs text-text-secondary">Model yükleniyor…</div>
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#6C3CE9,#00E5FF)' }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4 text-center">
              <div className="text-xs text-text-secondary">Model yüklenemedi. WhatsApp'tan görebilirsin.</div>
            </div>
          )}

          {geometry && !loading && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[9px] text-white/70 pointer-events-none">
              <RotateCcw size={9} /> detaylı incele → Büyüt
            </div>
          )}
        </>
      )}

      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full blur-2xl pointer-events-none"
        style={{ background: color, opacity: 0.4 }}
      />
    </div>
  )
}
