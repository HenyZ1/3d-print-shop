import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function OrbitRing({ radius = 3, color = '#6C3CE9', speed = 0.3, tilt = [0, 0, 0] }) {
  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.z += speed * 0.008 })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.005, 16, 120]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function Platform() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.1
  })
  return (
    <group position={[0, -1.8, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.08, 64]} />
        <meshStandardMaterial color="#0d0d18" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[2, 0.015, 16, 64]} />
        <meshStandardMaterial color="#6C3CE9" emissive="#6C3CE9" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[1.2, 1.95, 64]} />
        <meshStandardMaterial color="#6C3CE9" emissive="#6C3CE9" emissiveIntensity={0.15} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function ShowcaseVase({ material, clipY }) {
  const ref = useRef()
  const geo = useRef()

  useEffect(() => {
    if (!geo.current) {
      const pts = [
        new THREE.Vector2(0.4, 0), new THREE.Vector2(0.55, 0.2), new THREE.Vector2(0.65, 0.5),
        new THREE.Vector2(0.55, 0.9), new THREE.Vector2(0.35, 1.2), new THREE.Vector2(0.28, 1.4),
        new THREE.Vector2(0.35, 1.6), new THREE.Vector2(0.42, 1.75), new THREE.Vector2(0.38, 1.8),
      ]
      geo.current = new THREE.LatheGeometry(pts, 48)
    }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
  })

  const matProps = getMaterialProps(material)

  return (
    <group ref={ref} position={[0, -1.7, 0]}>
      <mesh>
        <latheGeometry args={[[
          new THREE.Vector2(0.4, 0), new THREE.Vector2(0.55, 0.2), new THREE.Vector2(0.65, 0.5),
          new THREE.Vector2(0.55, 0.9), new THREE.Vector2(0.35, 1.2), new THREE.Vector2(0.28, 1.4),
          new THREE.Vector2(0.35, 1.6), new THREE.Vector2(0.42, 1.75), new THREE.Vector2(0.38, 1.8),
        ], 48]} />
        <meshStandardMaterial {...matProps} side={THREE.DoubleSide} clippingPlanes={clipY < 1.8 ? [new THREE.Plane(new THREE.Vector3(0, -1, 0), clipY)] : []} />
      </mesh>
      {clipY < 1.8 && (
        <mesh position={[0, clipY, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.5} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function ShowcaseHelmet({ material }) {
  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.003 })
  const matProps = getMaterialProps(material)
  return (
    <group ref={ref} position={[0, -0.8, 0]}>
      <mesh position={[0, 0.3, 0]} scale={[1, 1.15, 1.1]}>
        <sphereGeometry args={[0.75, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial {...matProps} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.05, 0.1]}>
        <boxGeometry args={[0.9, 0.4, 0.85]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0, -0.05, 0.55]}>
        <boxGeometry args={[0.65, 0.25, 0.08]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.15, 0.52]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.7, 0.18, 0.05]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function ShowcaseGear({ material }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z += 0.005
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })
  const matProps = getMaterialProps(material)
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.85, 0.2, 24, 12]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.42, 0.14, 24, 32]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.63, Math.sin(a) * 0.63, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.18, 0.28, 0.35]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )
      })}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2
        return (
          <mesh key={`spoke-${i}`} position={[Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.08, 0.5, 0.2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )
      })}
    </group>
  )
}

function ShowcaseFigure({ material }) {
  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.004 })
  const matProps = getMaterialProps(material)
  return (
    <group ref={ref} position={[0, -1.5, 0]}>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <RoundedBox args={[0.55, 0.75, 0.35]} position={[0, 0.95, 0]} radius={0.08} smoothness={4}>
        <meshStandardMaterial {...matProps} />
      </RoundedBox>
      <mesh position={[-0.42, 1, 0]}>
        <capsuleGeometry args={[0.07, 0.5, 8, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.42, 1, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.07, 0.5, 8, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[-0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 24]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

function getMaterialProps(material) {
  switch (material) {
    case 'resin':
      return { color: '#00E5FF', metalness: 0.1, roughness: 0.15, transparent: true, opacity: 0.85, emissive: '#00E5FF', emissiveIntensity: 0.1 }
    case 'metal':
      return { color: '#c0c0c0', metalness: 0.95, roughness: 0.08 }
    case 'wood':
      return { color: '#c4873b', metalness: 0.05, roughness: 0.75 }
    case 'black':
      return { color: '#1a1a2e', metalness: 0.85, roughness: 0.12, emissive: '#6C3CE9', emissiveIntensity: 0.05 }
    default:
      return { color: '#6C3CE9', metalness: 0.3, roughness: 0.5, emissive: '#6C3CE9', emissiveIntensity: 0.08 }
  }
}

function Scene({ activeModel, material, clipY }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#6C3CE9" distance={12} />
      <pointLight position={[3, -2, 4]} intensity={0.5} color="#00E5FF" distance={12} />
      <spotLight position={[0, 5, 0]} intensity={0.4} angle={0.5} penumbra={0.5} color="#8B5CF6" />

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
        {activeModel === 'vase' && <ShowcaseVase material={material} clipY={clipY} />}
        {activeModel === 'helmet' && <ShowcaseHelmet material={material} />}
        {activeModel === 'gear' && <ShowcaseGear material={material} />}
        {activeModel === 'figure' && <ShowcaseFigure material={material} />}
      </Float>

      <Platform />

      <OrbitRing radius={2.8} color="#6C3CE9" speed={0.3} tilt={[0.6, 0.2, 0]} />
      <OrbitRing radius={3.2} color="#00E5FF" speed={-0.2} tilt={[-0.3, 0.7, 0.1]} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.65}
        rotateSpeed={0.5}
      />
      <Environment preset="night" />
    </>
  )
}

export default function HeroScene({ activeModel = 'vase', material = 'pla', clipY = 10 }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, localClippingEnabled: true }}
      style={{ background: 'transparent' }}
    >
      <Scene activeModel={activeModel} material={material} clipY={clipY} />
    </Canvas>
  )
}
