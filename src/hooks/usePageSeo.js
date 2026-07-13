import { useEffect } from 'react'

const SITE = 'https://micronforge.shop'

const setAttr = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// SPA route'una göre <title>, meta description, canonical ve OG/Twitter etiketlerini günceller.
// Googlebot JS render ettiği için her sayfa kendi başlığı/açıklamasıyla indexlenir.
export default function usePageSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const url = `${SITE}${path}`
    if (title) {
      document.title = title
      setAttr('meta[property="og:title"]', 'content', title)
      setAttr('meta[name="twitter:title"]', 'content', title)
    }
    if (description) {
      setAttr('meta[name="description"]', 'content', description)
      setAttr('meta[property="og:description"]', 'content', description)
      setAttr('meta[name="twitter:description"]', 'content', description)
    }
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:url"]', 'content', url)
  }, [title, description, path])
}
