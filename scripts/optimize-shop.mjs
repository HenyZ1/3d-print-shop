// Web-optimize the shop product photos: cap long edge at 1000px, JPEG q80.
// Run: node scripts/optimize-shop.mjs
import { Jimp } from 'jimp'
import { readdir, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const dir = new URL('../public/shop/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const MAX = 1000
const Q = 80

const files = (await readdir(dir)).filter((f) => /^urun-\d+\.jpg$/i.test(f))
let before = 0
let after = 0

for (const f of files.sort()) {
  const p = join(dir, f)
  before += (await stat(p)).size
  const img = await Jimp.read(p)
  const longEdge = Math.max(img.width, img.height)
  if (longEdge > MAX) {
    const scale = MAX / longEdge
    img.resize({ w: Math.round(img.width * scale), h: Math.round(img.height * scale) })
  }
  const buf = await img.getBuffer('image/jpeg', { quality: Q })
  await writeFile(p, buf)
  after += buf.length
  console.log(`${f}: ${img.width}x${img.height}  ${(buf.length / 1024).toFixed(0)}KB`)
}

console.log(`\nToplam: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB`)
