import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function useFloat(ref, position, speed) {
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.y += 0.004 * speed
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.35
    ref.current.position.x = position[0] + Math.cos(t * 0.3) * 0.15
  })
}

export function FloatingGear({ position, color = '#6C3CE9', speed = 0.6, scale = 1 }) {
  const ref = useRef()
  useFloat(ref, position, speed)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z += 0.006 * speed
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <torusGeometry args={[0.7, 0.18, 16, 6]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.35, 0.12, 16, 24]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.52, Math.sin(angle) * 0.52, 0]}>
            <boxGeometry args={[0.25, 0.15, 0.3]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

export function FloatingVase({ position, color = '#00E5FF', speed = 0.5, scale = 1 }) {
  const ref = useRef()
  useFloat(ref, position, speed)

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0.35, 0),
      new THREE.Vector2(0.5, 0.2),
      new THREE.Vector2(0.55, 0.5),
      new THREE.Vector2(0.45, 0.8),
      new THREE.Vector2(0.3, 1.0),
      new THREE.Vector2(0.25, 1.15),
      new THREE.Vector2(0.35, 1.3),
      new THREE.Vector2(0.38, 1.4),
      new THREE.Vector2(0.35, 1.45),
    ]
    return new THREE.LatheGeometry(points, 32)
  }, [])

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.15} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function FloatingDiamond({ position, color = '#FF6B35', speed = 0.7, scale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.y += 0.008 * speed
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.15
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.6, 0.5, 8]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} emissive={color} emissiveIntensity={0.3} flatShading />
      </mesh>
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.6, 0.8, 8]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} emissive={color} emissiveIntensity={0.3} flatShading />
      </mesh>
    </group>
  )
}

export function FloatingRocket({ position, color = '#8B5CF6', speed = 0.5, scale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.1 + 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4
    ref.current.position.x = position[0] + Math.cos(t * 0.25) * 0.2
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.25, 1.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.22, 0.45, 16]} />
        <meshStandardMaterial color="#FF6B35" metalness={0.8} roughness={0.1} emissive="#FF6B35" emissiveIntensity={0.4} />
      </mesh>
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((rot, i) => (
        <mesh key={i} position={[Math.sin(rot) * 0.25, -0.55, Math.cos(rot) * 0.25]} rotation={[0.2 * Math.cos(rot), rot, 0.2 * Math.sin(rot)]}>
          <boxGeometry args={[0.08, 0.35, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.15} />
        </mesh>
      ))}
      <mesh position={[0, -0.7, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

export function FloatingChessPiece({ position, color = '#00E5FF', speed = 0.4, scale = 1 }) {
  const ref = useRef()
  useFloat(ref, position, speed)

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.15, 24]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.65, 16]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.05} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

export function FloatingLowPolyTree({ position, color = '#00E5FF', speed = 0.35, scale = 1 }) {
  const ref = useRef()
  useFloat(ref, position, speed)

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#5021C9" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <coneGeometry args={[0.55, 0.7, 6]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.2} flatShading />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.42, 0.6, 6]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.25} flatShading />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[0.28, 0.45, 6]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.3} flatShading />
      </mesh>
    </group>
  )
}

export function PrinterModel({ position = [0, 0, 0] }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
  })

  return (
    <group ref={group} position={position} scale={1.3}>
      <RoundedBox args={[2.4, 0.3, 2.4]} position={[0, -1, 0]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#1A1A2E" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {[[-1, 0, -1], [1, 0, -1], [-1, 0, 1], [1, 0, 1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.06, 0.06, 2.2, 16]} />
          <meshStandardMaterial color="#6C3CE9" metalness={0.8} roughness={0.2} emissive="#6C3CE9" emissiveIntensity={0.3} />
        </mesh>
      ))}
      <RoundedBox args={[2.4, 0.15, 2.4]} position={[0, 1.1, 0]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#1A1A2E" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.25, 0.5]} position={[0, 0.5, 0]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#00E5FF" metalness={0.7} roughness={0.2} emissive="#00E5FF" emissiveIntensity={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={2} />
      </mesh>
      <RoundedBox args={[1.8, 0.1, 1.8]} position={[0, -0.7, 0]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#2A2A40" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 6]} />
        <meshStandardMaterial color="#6C3CE9" metalness={0.6} roughness={0.3} emissive="#6C3CE9" emissiveIntensity={0.4} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
