import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_URL,
  blogCollectionJsonLd,
  blogPostJsonLd,
  blogPosts,
} from '../src/data/blogPosts.js'
import { products } from '../src/data/products.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const baseHtml = await readFile(resolve(distRoot, 'index.html'), 'utf8')

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const escapeXml = escapeHtml

const setTitle = (html, value) => html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(value)}</title>`)

const setMeta = (html, attribute, key, value) => {
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`
  const matcher = new RegExp(`<meta[^>]+${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i')
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const setCanonical = (html, url) => {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`
  const matcher = /<link[^>]+rel=["']canonical["'][^>]*>/i
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const setPageMeta = ({ html, title, description, url, image, type = 'website', published, modified }) => {
  let result = setTitle(html, title)
  result = setCanonical(result, url)
  result = setMeta(result, 'name', 'description', description)
  result = setMeta(result, 'property', 'og:title', title)
  result = setMeta(result, 'property', 'og:description', description)
  result = setMeta(result, 'property', 'og:url', url)
  result = setMeta(result, 'property', 'og:type', type)
  result = setMeta(result, 'property', 'og:image', image)
  result = setMeta(result, 'property', 'og:image:width', '1440')
  result = setMeta(result, 'property', 'og:image:height', '960')
  result = setMeta(result, 'name', 'twitter:title', title)
  result = setMeta(result, 'name', 'twitter:description', description)
  result = setMeta(result, 'name', 'twitter:image', image)
  if (published) result = setMeta(result, 'property', 'article:published_time', published)
  if (modified) result = setMeta(result, 'property', 'article:modified_time', modified)
  return result
}

const wrapStaticRoot = (content) =>
  `<div id="root" data-prerendered="true">${content}</div>`

const blogListMarkup = () => `
  <main class="min-h-screen bg-surface">
    <header class="theme-dark bg-surface pt-32 pb-16 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <p class="text-primary-light font-semibold mb-4">MicronForge Blog</p>
        <h1 class="text-4xl md:text-6xl font-bold font-heading mb-6">Manisa 3D Baskı Rehberi</h1>
        <p class="text-text-secondary text-lg max-w-3xl mx-auto">Figürden kırtasiye rafına, mimari maketten OSB prototipine kadar SLA reçine 3D baskı rehberleri.</p>
      </div>
    </header>
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        ${blogPosts.map((post) => `
          <article class="glass-card rounded-3xl overflow-hidden">
            <a href="/blog/${escapeHtml(post.slug)}">
              <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" width="1440" height="960" class="w-full aspect-[3/2] object-cover" />
            </a>
            <div class="p-6">
              <p class="text-primary text-sm font-semibold mb-3">${escapeHtml(post.category)}</p>
              <h2 class="font-heading text-2xl font-bold mb-3"><a href="/blog/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></h2>
              <p class="text-text-secondary leading-relaxed">${escapeHtml(post.excerpt)}</p>
            </div>
          </article>`).join('')}
      </div>
    </section>
  </main>`

const blogPostMarkup = (post) => `
  <main class="min-h-screen bg-surface">
    <article>
      <header class="theme-dark bg-surface pt-28 pb-14 px-6">
        <div class="max-w-5xl mx-auto">
          <nav class="text-text-secondary text-sm mb-8"><a href="/">Anasayfa</a> / <a href="/blog">Blog</a> / ${escapeHtml(post.category)}</nav>
          <p class="text-primary-light font-semibold mb-4">${escapeHtml(post.category)} · ${escapeHtml(post.readTime)} okuma</p>
          <h1 class="text-4xl md:text-6xl font-bold font-heading mb-6">${escapeHtml(post.title)}</h1>
          <p class="text-text-secondary text-lg max-w-3xl">${escapeHtml(post.excerpt)}</p>
        </div>
      </header>
      <div class="max-w-6xl mx-auto px-6 py-10">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" width="1440" height="960" class="w-full rounded-3xl" />
      </div>
      <div class="max-w-3xl mx-auto px-6 pb-20">
        ${post.intro.map((paragraph) => `<p class="text-text-secondary text-lg leading-8 mb-5">${escapeHtml(paragraph)}</p>`).join('')}
        ${post.sections.map((section) => `
          <section class="mt-12">
            <h2 class="font-heading text-3xl font-bold mb-5">${escapeHtml(section.heading)}</h2>
            ${(section.paragraphs || []).map((paragraph) => `<p class="text-text-secondary text-lg leading-8 mb-5">${escapeHtml(paragraph)}</p>`).join('')}
            ${section.bullets ? `<ul class="text-text-secondary text-lg leading-8 list-disc pl-6">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
            ${section.note ? `<p class="mt-6 p-5 bg-surface-light rounded-2xl font-semibold">${escapeHtml(section.note)}</p>` : ''}
          </section>`).join('')}
        <section class="mt-14">
          <h2 class="font-heading text-3xl font-bold mb-5">Sıkça sorulanlar</h2>
          ${post.faqs.map((faq) => `<div class="mb-5"><h3 class="font-heading text-xl font-bold mb-2">${escapeHtml(faq.question)}</h3><p class="text-text-secondary leading-7">${escapeHtml(faq.answer)}</p></div>`).join('')}
        </section>
      </div>
    </article>
  </main>`

const writePage = async (relativePath, html, content, jsonLd, jsonLdId) => {
  const outputPath = resolve(distRoot, relativePath, 'index.html')
  await mkdir(dirname(outputPath), { recursive: true })
  const withoutNoscript = html.replace(/\s*<noscript>[\s\S]*?<\/noscript>/i, '')
  const withJsonLd = withoutNoscript.replace(
    '</head>',
    `    <script type="application/ld+json" id="${jsonLdId}">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>\n  </head>`,
  )
  await writeFile(outputPath, withJsonLd.replace('<div id="root"></div>', wrapStaticRoot(content)), 'utf8')
}

const blogUrl = `${SITE_URL}/blog`
const listHtml = setPageMeta({
  html: baseHtml,
  title: '3D Baskı Blogu | Manisa Figür, Maket & Prototip Rehberleri',
  description: 'MicronForge 3D baskı rehberi: Manisa’da SLA reçine baskı, OSB prototip, kırtasiye ürünleri, kişiye özel figür ve mimari maket yazıları.',
  url: blogUrl,
  image: `${SITE_URL}${blogPosts[0].image}`,
})
await writePage('blog', listHtml, blogListMarkup(), blogCollectionJsonLd, 'blog-collection-jsonld')

for (const post of blogPosts) {
  const url = `${blogUrl}/${post.slug}`
  const html = setPageMeta({
    html: baseHtml,
    title: post.seoTitle,
    description: post.description,
    url,
    image: `${SITE_URL}${post.image}`,
    type: 'article',
    published: post.published,
    modified: post.updated,
  })
  await writePage(`blog/${post.slug}`, html, blogPostMarkup(post), blogPostJsonLd(post), 'blog-post-jsonld')
}

const urls = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/magaza`, changefreq: 'weekly', priority: '0.9' },
  ...products.map((product) => ({
    loc: `${SITE_URL}/magaza/${product.id}`,
    changefreq: 'monthly',
    priority: product.id === 'ozel-figur' ? '0.8' : '0.7',
  })),
  { loc: blogUrl, changefreq: 'weekly', priority: '0.9', lastmod: blogPosts[0].updated },
  ...blogPosts.map((post) => ({
    loc: `${blogUrl}/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.updated,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
await writeFile(resolve(distRoot, 'sitemap.xml'), sitemap, 'utf8')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MicronForge 3D Baskı Rehberi</title>
    <link>${blogUrl}</link>
    <description>Manisa’da SLA reçine 3D baskı, figür, mimari maket ve endüstriyel prototip yazıları.</description>
    <language>tr-TR</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${blogPosts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${blogUrl}/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${blogUrl}/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(`${post.published}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`
await writeFile(resolve(distRoot, 'feed.xml'), rss, 'utf8')

console.log(`Prerendered ${blogPosts.length + 1} blog pages, sitemap.xml and feed.xml.`)
