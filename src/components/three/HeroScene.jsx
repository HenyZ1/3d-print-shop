import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/GlassVaseFlowers.glb')

function OrbitRing({ radius = 3, color = '#6C3CE9', speed = 0.3, tilt = [0, 0, 0] }) {
  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.z += speed * 0.008 })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.004, 16, 200]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Platform() {
  const ringRef = useRef()
  useFrame((state) => {
    if (ringRef.current) ringRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <group position={[0, -1.65, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#6C3CE9" emissive="#6C3CE9" emissiveIntensity={2.5} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.3, 1.48, 100]} />
        <meshStandardMaterial color="#6C3CE9" emissive="#6C3CE9" emissiveIntensity={0.03} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function applyMaterial(scene, material) {
  const matProps = getMaterialProps(material)
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial(matProps)
    }
  })
}

function GLBModel({ url, material, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const ref = useRef()

  useEffect(() => {
    if (material !== 'original') {
      applyMaterial(cloned, material)
    }
  }, [material, cloned])

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003
  })

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={cloned} />
    </group>
  )
}

const MODEL_CONFIG = {
  vase:    { url: '/models/GlassVaseFlowers.glb', scale: 8, position: [0, -0.6, 0] },
  helmet:  { url: '/models/DamagedHelmet.glb',    scale: 1.3, position: [0, -0.4, 0] },
  dragon:  { url: '/models/DragonAttenuation.glb', scale: 0.6, position: [0, -0.5, 0] },
  brain:   { url: '/models/BrainStem.glb',         scale: 1.2, position: [0, -0.4, 0] },
  avocado: { url: '/models/Avocado.glb',           scale: 25, position: [0, -0.5, 0] },
  duck:    { url: '/models/Duck.glb',              scale: 0.018, position: [0, -0.8, 0] },
}

function ShowcaseModel({ modelId, material }) {
  const config = MODEL_CONFIG[modelId]
  if (!config) return null
  return (
    <Center position={config.position}>
      <GLBModel
        url={config.url}
        material={material}
        scale={config.scale}
      />
    </Center>
  )
}

function getMaterialProps(material) {
  switch (material) {
    case 'resin':
      return { color: '#00E5FF', metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.88, emissive: '#00E5FF', emissiveIntensity: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 }
    case 'metal':
      return { color: '#d4d4d8', metalness: 0.98, roughness: 0.05, clearcoat: 0.5, clearcoatRoughness: 0.1 }
    case 'wood':
      return { color: '#c4873b', metalness: 0.0, roughness: 0.7, clearcoat: 0.3, clearcoatRoughness: 0.4 }
    case 'black':
      return { color: '#1a1a2e', metalness: 0.85, roughness: 0.1, emissive: '#6C3CE9', emissiveIntensity: 0.06, clearcoat: 1, clearcoatRoughness: 0.1 }
    default:
      return { color: '#7C4DFF', metalness: 0.25, roughness: 0.35, emissive: '#6C3CE9', emissiveIntensity: 0.1, clearcoat: 0.8, clearcoatRoughness: 0.15 }
  }
}

function Scene({ activeModel, material }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#6C3CE9" />
      <pointLight position={[-4, 2, 4]} intensity={0.8} color="#6C3CE9" distance={15} />
      <pointLight position={[4, -1, 4]} intensity={0.6} color="#00E5FF" distance={15} />
      <spotLight position={[0, 6, 2]} intensity={0.8} angle={0.4} penumbra={0.8} color="#8B5CF6" />

      <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.08}>
        <ShowcaseModel modelId={activeModel} material={material} />
      </Float>

      <Platform />

      <OrbitRing radius={2.8} color="#6C3CE9" speed={0.25} tilt={[0.5, 0.3, 0]} />
      <OrbitRing radius={3.3} color="#00E5FF" speed={-0.18} tilt={[-0.4, 0.6, 0.1]} />
      <OrbitRing radius={3.8} color="#8B5CF6" speed={0.12} tilt={[0.2, -0.4, 0.3]} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.65}
        rotateSpeed={0.5}
      />
      <Environment preset="city" />
    </>
  )
}

export default function HeroScene({ activeModel = 'vase', material = 'pla' }) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}
    >
      <Scene activeModel={activeModel} material={material} />
    </Canvas>
  )
}
