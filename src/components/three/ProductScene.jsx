import { Canvas } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, RoundedBox, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function RotatingModel({ shape, color }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.008
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
  })

  if (shape === 'torus') {
    return (
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    )
  }

  if (shape === 'sphere') {
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.15} distort={0.3} speed={2} />
      </mesh>
    )
  }

  if (shape === 'icosahedron') {
    return (
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.05} emissive={color} emissiveIntensity={0.25} flatShading />
      </mesh>
    )
  }

  if (shape === 'octahedron') {
    return (
      <mesh ref={ref}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    )
  }

  if (shape === 'cylinder') {
    return (
      <group ref={ref}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.9, 1.5, 8]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      </group>
    )
  }

  return (
    <RoundedBox ref={ref} args={[1.4, 1.4, 1.4]} radius={0.2} smoothness={4}>
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
    </RoundedBox>
  )
}

export default function ProductScene({ shape = 'cube', color = '#6C3CE9' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-2, 1, 2]} intensity={0.5} color={color} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <RotatingModel shape={shape} color={color} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      <Environment preset="night" />
    </Canvas>
  )
}
