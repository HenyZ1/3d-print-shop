import { useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Center, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { useModelGeometry } from './useModelGeometry'

function getMaterialProps(material) {
  switch (material) {
    case 'tough':
      return { color: '#d4d4d8', metalness: 0.4, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 }
    case 'seffaf':
      return { color: '#00E5FF', metalness: 0.05, roughness: 0.05, transparent: true, opacity: 0.7, clearcoat: 1, clearcoatRoughness: 0.05 }
    case 'gri':
      return { color: '#888893', metalness: 0.2, roughness: 0.5 }
    case 'siyah':
      return { color: '#1a1a2e', metalness: 0.6, roughness: 0.25, emissive: '#6C3CE9', emissiveIntensity: 0.05, clearcoat: 0.8 }
    case 'renkli':
      return { color: '#FF6B35', metalness: 0.15, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.2 }
    default:
      return { color: '#8B5CF6', metalness: 0.2, roughness: 0.35, emissive: '#6C3CE9', emissiveIntensity: 0.08, clearcoat: 0.8 }
  }
}

function Model({ geometry, material, autoRotate }) {
  const ref = useRef()
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial(getMaterialProps(material)), [material])
  useEffect(() => () => mat.dispose(), [mat])

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromBufferAttribute(geometry.getAttribute('position'))
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return 2.5 / maxDim
  }, [geometry])

  useFrame((_, delta) => {
    if (autoRotate && ref.current) ref.current.rotation.y += delta * 0.3
  })

  return (
    <Center>
      <mesh ref={ref} geometry={geometry} material={mat} scale={scale} castShadow dispose={null} />
    </Center>
  )
}

function Scene({ geometry, material, autoRotate }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 4, -2]} intensity={0.5} color="#6C3CE9" />
      <pointLight position={[-4, 2, 4]} intensity={0.7} color="#6C3CE9" distance={15} />
      <pointLight position={[4, -1, 4]} intensity={0.5} color="#00E5FF" distance={15} />

      <Model geometry={geometry} material={material} autoRotate={autoRotate} />

      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={6} blur={2.4} far={4} />
      <Environment preset="city" />

      <OrbitControls enableZoom enablePan={false} minDistance={3} maxDistance={10} rotateSpeed={0.6} autoRotate={false} />
    </>
  )
}

export default function STLViewer({ url, material = 'standart', autoRotate = true, height = '100%' }) {
  const { geometry, loading, progress, error } = useModelGeometry(url, true)

  return (
    <div style={{ width: '100%', height }} className="relative">
      {geometry && (
        <Canvas
          camera={{ position: [0, 1, 5], fov: 45 }}
          dpr={[1, 1.5]}
          shadows
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          performance={{ min: 0.5 }}
        >
          <Scene geometry={geometry} material={material} autoRotate={autoRotate} />
        </Canvas>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <Loader2 size={28} className="animate-spin text-primary-light" />
          <div className="text-sm text-text-secondary">Model yükleniyor…</div>
          <div className="w-40 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#6C3CE9,#00E5FF)' }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 text-center">
          <div className="text-sm text-text-secondary">Model yüklenemedi.</div>
        </div>
      )}
    </div>
  )
}
