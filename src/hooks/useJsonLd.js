import { useEffect } from 'react'

// Sayfaya JSON-LD yapılandırılmış verisi ekler; unmount'ta temizler.
// data referansı her render değişmesin diye çağıran tarafta useMemo ile ver.
export default function useJsonLd(id, data) {
  useEffect(() => {
    if (!data) return undefined
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
    return () => {
      const e = document.getElementById(id)
      if (e) e.remove()
    }
  }, [id, data])
}
