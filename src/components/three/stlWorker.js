// Parses STL geometry off the main thread so the UI never freezes,
// even for very large (50MB+) files. Returns transferable typed arrays.
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

self.onmessage = (e) => {
  try {
    const buffer = e.data
    const geo = new STLLoader().parse(buffer)

    let normalAttr = geo.getAttribute('normal')
    if (!normalAttr) {
      geo.computeVertexNormals()
      normalAttr = geo.getAttribute('normal')
    }
    const position = geo.getAttribute('position').array
    const normal = normalAttr.array

    self.postMessage(
      { position, normal },
      [position.buffer, normal.buffer]
    )
  } catch (err) {
    self.postMessage({ error: String(err && err.message ? err.message : err) })
  }
}
