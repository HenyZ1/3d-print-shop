import { BookOpenText, Building2, Factory, Gift, MapPin, PenTool } from 'lucide-react'
import BlogCard from '../components/blog/BlogCard'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import ScrollProgress from '../components/ui/ScrollProgress'
import WhatsAppFab from '../components/ui/WhatsAppFab'
import { blogCollectionJsonLd, blogPosts } from '../data/blogPosts'
import useJsonLd from '../hooks/useJsonLd'
import usePageSeo from '../hooks/usePageSeo'

const intents = [
  { icon: MapPin, label: 'Manisa’da 3D baskı', text: 'Yerel teklif ve üretim rehberleri' },
  { icon: Factory, label: 'OSB & prototip', text: 'Hassas numune ve teknik kararlar' },
  { icon: Gift, label: 'Figür & hediyelik', text: 'Kişiye özel ve özgün ürün fikirleri' },
  { icon: Building2, label: 'Mimari maket', text: 'Ölçek, cephe ve dosya hazırlığı' },
]

export default function BlogPage() {
  usePageSeo({
    title: '3D Baskı Blogu | Manisa Figür, Maket & Prototip Rehberleri',
    description:
      'MicronForge 3D baskı rehberi: Manisa’da SLA reçine baskı, OSB prototip, kırtasiye ürünleri, kişiye özel figür ve mimari maket yazıları.',
    path: '/blog',
    image: blogPosts[0].image,
  })
  useJsonLd('blog-collection-jsonld', blogCollectionJsonLd)

  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />

      <main>
        <header className="theme-dark bg-surface pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[170px]" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="badge badge-accent">
              <BookOpenText size={14} /> MicronForge Blog
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mt-6 mb-6 leading-[1.05]">
              Manisa’da 3D baskıyı
              {' '}
              <span className="text-gradient block">doğru iş için seçin</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Bireysel figürden kırtasiye rafına, mimari maketten OSB prototipine kadar gerçek üretim sorularına açık ve uygulanabilir yanıtlar.
            </p>
          </div>
        </header>

        <section className="px-6 -mt-8 relative z-20" aria-label="Blog konu başlıkları">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {intents.map(({ icon: Icon, label, text }) => (
              <div key={label} className="glass-strong rounded-2xl p-5 flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon size={19} />
                </span>
                <div>
                  <div className="font-heading font-bold text-sm mb-1">{label}</div>
                  <div className="text-text-secondary text-xs leading-relaxed">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6" aria-labelledby="all-posts-title">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge badge-primary">
                  <PenTool size={13} /> Güncel Rehberler
                </span>
                <h2 id="all-posts-title" className="text-3xl md:text-5xl font-heading font-bold mt-4">
                  İhtiyacınıza göre <span className="text-gradient">okuyun</span>
                </h2>
              </div>
              <p className="text-text-secondary max-w-md leading-relaxed">
                Her yazı tek bir arama niyetine odaklanır; gereksiz teknik kalabalık yerine karar vermenize yarayan bilgiyi sunar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} eager={index < 2} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto theme-dark bg-surface rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-20 -top-24 w-80 h-80 bg-primary/25 rounded-full blur-[100px]" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-7">
              <div className="max-w-2xl">
                <span className="badge badge-accent">Aradığınız cevap yok mu?</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-4 mb-3">Parçanızı birlikte değerlendirelim</h2>
                <p className="text-text-secondary leading-relaxed">
                  Fotoğrafı veya model dosyasını, ölçüyü, adedi ve kullanım amacını gönderin. Uygun üretim yolunu netleştirelim.
                </p>
              </div>
              <a
                href="https://wa.me/905311034535?text=Merhaba%2C%20blogdaki%20rehberlerden%20geldim.%20Bir%203D%20bask%C4%B1%20talebim%20var."
                target="_blank"
                rel="noreferrer"
                className="btn-primary whitespace-nowrap text-center"
              >
                WhatsApp’tan Sor
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
