// SVG -> PNG rasterizer (og-image + optional Instagram assets).
// Usage: node scripts/svg2png.mjs
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'

const jobs = [
  ['public/og-image.svg', 'public/og-image.png', 1200],
  ['public/instagram-pp.svg', 'public/instagram-pp.png', 1080],
  ['public/banner.svg', 'public/banner.png', 1600],
  ['public/instagram-3grid/post-1-sol.svg', 'public/instagram-3grid/post-1-sol.png', 1080],
  ['public/instagram-3grid/post-2-orta.svg', 'public/instagram-3grid/post-2-orta.png', 1080],
  ['public/instagram-3grid/post-3-sag.svg', 'public/instagram-3grid/post-3-sag.png', 1080],
]

for (const [src, out, width] of jobs) {
  try {
    const svg = readFileSync(src)
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: width },
      font: { loadSystemFonts: true },
      background: 'rgba(0,0,0,0)',
    })
    const png = resvg.render().asPng()
    writeFileSync(out, png)
    console.log('✓', out, '(' + Math.round(png.length / 1024) + ' KB)')
  } catch (e) {
    console.error('✗', src, '->', e.message)
  }
}
