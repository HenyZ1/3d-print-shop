import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

// Route bazlı kod bölme: ana sayfa mağaza kodunu/görsellerini yüklemez.
const Home = lazy(() => import('./pages/Home'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-surface" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magaza" element={<ShopPage />} />
          <Route path="/magaza/:slug" element={<ProductDetail />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  )
}
