import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronRight, Clock3, FileQuestion, Lightbulb, MessageCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import ScrollProgress from '../components/ui/ScrollProgress'
import WhatsAppFab from '../components/ui/WhatsAppFab'
import { blogPostJsonLd, blogPosts, getBlogPost } from '../data/blogPosts'
import useJsonLd from '../hooks/useJsonLd'
import usePageSeo from '../hooks/usePageSeo'

const formatDate = (date) =>
  new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  const jsonLd = useMemo(() => (post ? blogPostJsonLd(post) : null), [post])
  const related = useMemo(() => blogPosts.filter((item) => item.slug !== slug).slice(0, 3), [slug])

  usePageSeo({
    title: post?.seoTitle || 'Yazı Bulunamadı | MicronForge Blog',
    description: post?.description || 'Aradığınız 3D baskı rehberi bulunamadı.',
    path: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: post ? 'article' : 'website',
    publishedTime: post?.published,
    modifiedTime: post?.updated,
  })
  useJsonLd('blog-post-jsonld', jsonLd)

  if (!post) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="theme-dark bg-surface min-h-[75vh] px-6 flex items-center justify-center text-center">
          <div>
            <FileQuestion size={48} className="mx-auto text-primary-light mb-5" />
            <h1 className="text-4xl font-heading font-bold mb-4">Yazı bulunamadı</h1>
            <p className="text-text-secondary mb-8">Bağlantı değişmiş olabilir. Tüm rehberlere göz atabilirsiniz.</p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Bloga dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const whatsappText = encodeURIComponent(
    `Merhaba, “${post.title}” yazınızı okudum. Benzer bir 3D baskı ihtiyacım için bilgi almak istiyorum.`
  )

  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgress />
      <Navbar />

      <main>
        <article>
          <header className="theme-dark bg-surface pt-28 pb-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[620px] bg-primary/20 rounded-full blur-[170px]" />

            <div className="max-w-5xl mx-auto relative z-10">
              <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-2 text-sm text-text-secondary mb-8">
                <Link to="/" className="hover:text-text-primary transition-colors">Anasayfa</Link>
                <ChevronRight size={14} aria-hidden="true" />
                <Link to="/blog" className="hover:text-text-primary transition-colors">Blog</Link>
                <ChevronRight size={14} aria-hidden="true" />
                <span className="text-text-primary line-clamp-1">{post.category}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                <span className="badge badge-accent normal-case tracking-normal">{post.category}</span>
                <span className="text-text-secondary inline-flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  <time dateTime={post.published}>{formatDate(post.published)}</time>
                </span>
                <span className="text-text-secondary inline-flex items-center gap-1.5">
                  <Clock3 size={15} /> {post.readTime} okuma
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.08] mb-6 max-w-4xl">{post.title}</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">{post.excerpt}</p>
            </div>
          </header>

          <div className="px-6 -mt-1 theme-dark bg-surface pb-12">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-border-light shadow-2xl shadow-black/20 aspect-[3/2] md:aspect-[16/8]">
              <img
                src={post.image}
                alt={post.imageAlt}
                width="1440"
                height="960"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-[240px_minmax(0,720px)] gap-12 lg:gap-16 justify-center">
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="text-xs font-heading font-bold uppercase tracking-[0.16em] text-text-muted mb-4">Bu yazıda</div>
              <nav aria-label="İçindekiler" className="border-l border-border pl-4 space-y-3">
                {post.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#bolum-${index + 1}`}
                    className="block text-sm text-text-secondary hover:text-primary transition-colors leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
                <a href="#sikca-sorulanlar" className="block text-sm text-text-secondary hover:text-primary transition-colors">
                  Sıkça sorulanlar
                </a>
              </nav>

              <a
                href={`https://wa.me/905311034535?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 w-full btn-outline px-4 py-3 inline-flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={16} /> Projeni sor
              </a>
            </aside>

            <div className="min-w-0">
              <div className="space-y-5 text-[17px] leading-8 text-text-secondary mb-14">
                {post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="space-y-14">
                {post.sections.map((section, index) => (
                  <section key={section.heading} id={`bolum-${index + 1}`} className="scroll-mt-28">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-5 text-text-primary">
                      {section.heading}
                    </h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="text-[17px] leading-8 text-text-secondary mb-5">{paragraph}</p>
                    ))}

                    {section.bullets && (
                      <ul className="my-7 space-y-3">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                            <span className="w-6 h-6 mt-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                              <Check size={14} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="mt-7 rounded-2xl bg-primary/7 border border-primary/15 p-5 md:p-6 flex items-start gap-4">
                        <span className="w-10 h-10 rounded-xl bg-primary/12 text-primary flex items-center justify-center flex-shrink-0">
                          <Lightbulb size={19} />
                        </span>
                        <p className="text-text-primary leading-relaxed font-medium">{section.note}</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <section id="sikca-sorulanlar" className="scroll-mt-28 mt-16 pt-14 border-t border-border">
                <div className="badge badge-primary mb-4">Sıkça Sorulanlar</div>
                <h2 className="font-heading text-3xl font-bold mb-7">Kısa yanıtlar</h2>
                <div className="space-y-4">
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl border border-border bg-surface-card p-6">
                      <h3 className="font-heading text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-text-secondary leading-7">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="theme-dark bg-surface rounded-3xl p-7 md:p-9 mt-14 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-60 h-60 bg-primary/25 rounded-full blur-[80px]" />
                <div className="relative z-10">
                  <div className="text-sm text-primary-light font-heading font-semibold mb-2">Parçanızı değerlendirelim</div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Dosya veya fotoğrafı gönderin</h2>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Ölçü, adet ve kullanım amacını yazın; SLA reçine baskının projeniz için doğru seçim olup olmadığını netleştirelim.
                  </p>
                  <a
                    href={`https://wa.me/905311034535?text=${whatsappText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    WhatsApp’tan bilgi al <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-surface-light/70 py-20 px-6" aria-labelledby="related-posts-title">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-5 mb-9">
              <div>
                <span className="badge badge-accent">Devam edin</span>
                <h2 id="related-posts-title" className="font-heading text-3xl md:text-4xl font-bold mt-4">İlgili rehberler</h2>
              </div>
              <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 font-heading font-semibold text-primary">
                Tüm yazılar <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {related.map((item) => <BlogCard key={item.slug} post={item} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
