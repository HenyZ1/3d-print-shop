// One-off: convert the 3MF models to binary STL so they load through the
// Web Worker (no main-thread freeze). Run: node scripts/convert3mf.mjs
import { DOMParser } from 'linkedom'
globalThis.DOMParser = DOMParser

import { readFileSync, writeFileSync, statSync } from 'node:fs'
import * as THREE from 'three'
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

// Minimal binary STL writer from a non-indexed position attribute.
function writeBinarySTL(geometry) {
  const geo = geometry.index ? geometry.toNonIndexed() : geometry
  const pos = geo.getAttribute('position')
  const triCount = Math.floor(pos.count / 3)
  const buffer = new ArrayBuffer(84 + triCount * 50)
  const dv = new DataView(buffer)
  dv.setUint32(80, triCount, true)

  const ax = new THREE.Vector3(), bx = new THREE.Vector3(), cx = new THREE.Vector3()
  const cb = new THREE.Vector3(), ab = new THREE.Vector3()
  let offset = 84
  for (let i = 0; i < triCount; i++) {
    ax.fromBufferAttribute(pos, i * 3 + 0)
    bx.fromBufferAttribute(pos, i * 3 + 1)
    cx.fromBufferAttribute(pos, i * 3 + 2)
    cb.subVectors(cx, bx); ab.subVectors(ax, bx); cb.cross(ab).normalize()
    dv.setFloat32(offset, cb.x, true); dv.setFloat32(offset + 4, cb.y, true); dv.setFloat32(offset + 8, cb.z, true)
    offset += 12
    for (const v of [ax, bx, cx]) {
      dv.setFloat32(offset, v.x, true); dv.setFloat32(offset + 4, v.y, true); dv.setFloat32(offset + 8, v.z, true)
      offset += 12
    }
    dv.setUint16(offset, 0, true); offset += 2
  }
  return Buffer.from(buffer)
}

// 3MF -> binary STL so models load through the Web Worker (no UI freeze).
// Requires dev deps: npm i -D linkedom three
// Run: node --max-old-space-size=8192 scripts/convert3mf.mjs
// NOTE: very high-poly 3MF (millions of triangles) can be extremely slow to
// parse with linkedom — prefer exporting STL from your slicer (Lychee/Bambu).
const files = [
  ['public/models/stl/princess.3mf', 'public/models/stl/princess.stl'],
  ['public/models/stl/yoda.3mf', 'public/models/stl/yoda.stl'],
  ['public/models/stl/gollum-pen-holder.3mf', 'public/models/stl/gollum-pen-holder.stl'],
]

const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB'

for (const [src, dst] of files) {
  const buf = readFileSync(src)
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)

  const group = new ThreeMFLoader().parse(ab)
  group.updateMatrixWorld(true)

  const geos = []
  group.traverse((c) => {
    if (c.isMesh && c.geometry) {
      const g = c.geometry.clone()
      g.applyMatrix4(c.matrixWorld)
      const ng = new THREE.BufferGeometry()
      ng.setAttribute('position', g.getAttribute('position').clone())
      geos.push(ng)
    }
  })

  if (!geos.length) {
    console.error('NO GEOMETRY:', src)
    continue
  }

  const merged = geos.length === 1 ? geos[0] : BufferGeometryUtils.mergeGeometries(geos, false)
  const outBuf = writeBinarySTL(merged)
  writeFileSync(dst, outBuf)

  const tris = merged.getAttribute('position').count / 3
  console.log(`${src} (${mb(statSync(src).size)}) -> ${dst} (${mb(outBuf.length)}) | ${Math.round(tris).toLocaleString()} üçgen`)
}
