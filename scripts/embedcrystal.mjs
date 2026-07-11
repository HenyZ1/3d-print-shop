// Embeds public/crystal.png (AI crystal) into banner.svg and the 3-grid
// master, replacing the vector emblem. Uses mix-blend-mode: screen so the
// black background of the render disappears and the glow blends in.
import { readFileSync, writeFileSync } from 'node:fs'

const b64 = readFileSync('public/crystal.png').toString('base64')
const uri = `data:image/png;base64,${b64}`

// --- banner.svg (1600x500) ---
let banner = readFileSync('public/banner.svg', 'utf8')
banner = banner.replace(
  /<g transform="translate\(430,250\)">[\s\S]*?<\/g>/,
  `<image x="196" y="16" width="468" height="468" href="${uri}" style="mix-blend-mode:screen"/>`
)
writeFileSync('public/banner.svg', banner)
console.log('banner.svg güncellendi')

// --- 3-grid master (3240x1080) ---
let master = readFileSync('public/instagram-3grid/master.svg', 'utf8')
master = master.replace(
  /<g transform="translate\(540,540\)">[\s\S]*?<\/g>/,
  `<image x="80" y="80" width="920" height="920" href="${uri}" style="mix-blend-mode:screen"/>`
)
writeFileSync('public/instagram-3grid/master.svg', master)
console.log('master.svg güncellendi')

// --- re-split the 3 posts ---
const inner = master.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
for (const [name, off] of [['post-1-sol', 0], ['post-2-orta', 1080], ['post-3-sag', 2160]]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="${off} 0 1080 1080">${inner}</svg>`
  writeFileSync(`public/instagram-3grid/${name}.svg`, svg)
  console.log('yeniden yazıldı:', name + '.svg')
}
