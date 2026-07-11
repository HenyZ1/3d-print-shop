// Single shared STL-parsing worker, reused across all loads.
// Creating a module worker that imports three costs ~1s to boot, so we
// create it ONCE (and warm it up early) instead of per model load.

let worker = null
let queue = Promise.resolve()

function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('./stlWorker.js', import.meta.url), { type: 'module' })
  }
  return worker
}

// Boot the worker ahead of time (e.g. when the gallery mounts) so the
// first real parse is instant.
export function warmupSTLWorker() {
  if (typeof window !== 'undefined') getWorker()
}

// Parse an STL ArrayBuffer off the main thread. Requests are serialized
// (the worker handles one at a time). Resolves to { position, normal }.
export function parseSTL(buffer) {
  const run = () =>
    new Promise((resolve, reject) => {
      const w = getWorker()
      const onMsg = (e) => {
        w.removeEventListener('message', onMsg)
        w.removeEventListener('error', onErr)
        if (e.data && e.data.error) reject(new Error(e.data.error))
        else resolve(e.data)
      }
      const onErr = (err) => {
        w.removeEventListener('message', onMsg)
        w.removeEventListener('error', onErr)
        reject(new Error(err.message || 'worker error'))
      }
      w.addEventListener('message', onMsg)
      w.addEventListener('error', onErr)
      w.postMessage(buffer, [buffer])
    })

  const result = queue.then(run, run)
  queue = result.catch(() => {})
  return result
}
