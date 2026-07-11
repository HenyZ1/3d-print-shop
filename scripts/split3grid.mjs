// Splits the master 3240x1080 artwork into three self-contained 1080x1080
// SVGs (left/center/right) for an Instagram 3-post grid banner.
import { readFileSync, writeFileSync } from 'node:fs'

const master = readFileSync('public/instagram-3grid/master.svg', 'utf8')
const inner = master.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

const parts = [
  ['post-1-sol', 0],
  ['post-2-orta', 1080],
  ['post-3-sag', 2160],
]

for (const [name, off] of parts) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="${off} 0 1080 1080">${inner}</svg>`
  writeFileSync(`public/instagram-3grid/${name}.svg`, svg)
  console.log('yazıldı:', name + '.svg')
}
