import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { parseSTL } from './stlWorkerClient'

function isStl(url) {
  return /\.stl(\?|$)/i.test(url)
}

// Streams the file (reporting progress), then:
//  - STL  -> parsed in a Web Worker (no main-thread freeze)
//  - 3MF  -> unzipped/parsed on main thread (needs DOMParser), then merged
// Returns a single BufferGeometry ready to render. Disposes on cleanup.
export function useModelGeometry(url, active) {
  const [state, setState] = useState({ geometry: null, loading: false, progress: 0, error: null })
  const geoRef = useRef(null)

  useEffect(() => {
    if (!active || !url) return

    let cancelled = false
    setState({ geometry: null, loading: true, progress: 0, error: null })

    const streamBuffer = async () => {
      const res = await fetch(url)
      const total = Number(res.headers.get('content-length') || 0)
      if (!res.body || !total) return await res.arrayBuffer()

      const reader = res.body.getReader()
      const chunks = []
      let received = 0
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        received += value.length
        if (!cancelled) {
          const p = Math.round((received / total) * 100)
          setState((s) => (s.progress === p ? s : { ...s, progress: p }))
        }
      }
      const out = new Uint8Array(received)
      let offset = 0
      for (const c of chunks) {
        out.set(c, offset)
        offset += c.length
      }
      return out.buffer
    }

    const buildFromArrays = (position, normal) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(position, 3))
      geo.setAttribute('normal', new THREE.BufferAttribute(normal, 3))
      geo.center()
      return geo
    }

    const parse3mf = (buffer) => {
      const group = new ThreeMFLoader().parse(buffer)
      group.updateMatrixWorld(true)
      const parts = []
      group.traverse((c) => {
        if (c.isMesh && c.geometry) {
          let g = c.geometry.clone()
          g.applyMatrix4(c.matrixWorld)
          const ng = new THREE.BufferGeometry()
          ng.setAttribute('position', g.getAttribute('position').clone())
          if (g.getAttribute('normal')) {
            ng.setAttribute('normal', g.getAttribute('normal').clone())
          } else {
            ng.computeVertexNormals()
          }
          parts.push(ng)
          g.dispose()
        }
      })
      if (!parts.length) return null
      const merged = parts.length === 1 ? parts[0] : BufferGeometryUtils.mergeGeometries(parts, false)
      if (merged && !merged.getAttribute('normal')) merged.computeVertexNormals()
      if (merged) merged.center()
      return merged
    }

    streamBuffer()
      .then((buffer) => {
        if (cancelled) return

        if (isStl(url)) {
          parseSTL(buffer)
            .then(({ position, normal }) => {
              if (cancelled) return
              const geo = buildFromArrays(position, normal)
              geoRef.current = geo
              setState({ geometry: geo, loading: false, progress: 100, error: null })
            })
            .catch((err) => {
              if (!cancelled) setState((s) => ({ ...s, loading: false, error: String(err.message || err) }))
            })
        } else {
          // 3MF — yield to the browser first so the click feels responsive
          setTimeout(() => {
            if (cancelled) return
            try {
              const merged = parse3mf(buffer)
              if (!merged) {
                setState((s) => ({ ...s, loading: false, error: 'Geometri bulunamadı' }))
                return
              }
              geoRef.current = merged
              setState({ geometry: merged, loading: false, progress: 100, error: null })
            } catch (err) {
              setState((s) => ({ ...s, loading: false, error: String(err.message || err) }))
            }
          }, 30)
        }
      })
      .catch((err) => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: String(err.message || err) }))
      })

    return () => {
      cancelled = true
      if (geoRef.current) {
        geoRef.current.dispose()
        geoRef.current = null
      }
    }
  }, [url, active])

  return state
}
