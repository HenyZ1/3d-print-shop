import { motion } from 'framer-motion'
import { ArrowRight, BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import BlogCard from '../blog/BlogCard'

export default function BlogPreview() {
  return (
    <section className="py-24 px-6 bg-surface-light/60 relative overflow-hidden" aria-labelledby="blog-preview-title">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-3xl">
            <span className="badge badge-accent">
              <BookOpenText size={14} /> 3D Baskı Rehberi
            </span>
            <h2 id="blog-preview-title" className="text-4xl md:text-5xl font-bold font-heading mt-5 mb-4">
              Manisa’dan <span className="text-gradient">üretim notları</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
              Figürden OSB prototipine kadar doğru malzeme, dosya ve üretim kararlarını sade biçimde anlatıyoruz.
            </p>
          </div>

          <Link to="/blog" className="btn-outline px-6 py-3.5 inline-flex items-center gap-2 self-start lg:self-auto group">
            Tüm yazılar
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
