import { useEffect } from 'react'

const SITE = 'https://micronforge.shop'

const setMeta = (attribute, key, value) => {
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

const removeMeta = (attribute, key) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

const setCanonical = (value) => {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', value)
}

// SPA route'una göre <title>, meta description, canonical ve OG/Twitter etiketlerini günceller.
// Googlebot JS render ettiği için her sayfa kendi başlığı/açıklamasıyla indexlenir.
export default function usePageSeo({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
}) {
  useEffect(() => {
    const url = `${SITE}${path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE}${image}`
    if (title) {
      document.title = title
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    setCanonical(url)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:image', imageUrl)

    if (publishedTime) setMeta('property', 'article:published_time', publishedTime)
    else removeMeta('property', 'article:published_time')
    if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime)
    else removeMeta('property', 'article:modified_time')
  }, [title, description, path, image, type, publishedTime, modifiedTime])
}
