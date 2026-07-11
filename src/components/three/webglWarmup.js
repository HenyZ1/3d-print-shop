import * as THREE from 'three'

let done = false

// Pre-initialise WebGL/ANGLE and compile the matcap shader the cards use,
// while the browser is idle — so the first "3D'yi Başlat" click is fast.
export function warmupWebGL() {
  if (done || typeof window === 'undefined') return
  done = true
  try {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setSize(16, 16)

    const scene = new THREE.Scene()
    const tex = new THREE.DataTexture(new Uint8Array([200, 200, 210, 255]), 1, 1, THREE.RGBAFormat)
    tex.needsUpdate = true
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshMatcapMaterial({ matcap: tex, color: new THREE.Color('#6c3ce9') })
    )
    scene.add(mesh)

    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    cam.position.z = 3
    renderer.render(scene, cam)

    mesh.geometry.dispose()
    mesh.material.dispose()
    tex.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  } catch {
    // best-effort
  }
}
