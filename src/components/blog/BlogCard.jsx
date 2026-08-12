import { ArrowUpRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const formatDate = (date) =>
  new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))

export default function BlogCard({ post, eager = false }) {
  return (
    <article className="group glass-card rounded-3xl overflow-hidden lift h-full flex flex-col">
      <Link to={`/blog/${post.slug}`} className="block aspect-[3/2] overflow-hidden bg-surface-light">
        <img
          src={post.image}
          alt={post.imageAlt}
          width="1440"
          height="960"
          loading={eager ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
          <span className="badge badge-primary normal-case tracking-normal">{post.category}</span>
          <span className="text-text-muted inline-flex items-center gap-1.5">
            <Clock3 size={13} /> {post.readTime}
          </span>
        </div>

        <h2 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-3">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-text-secondary leading-relaxed mb-6 flex-1">{post.excerpt}</p>

        <div className="pt-5 border-t border-border flex items-center justify-between gap-4">
          <time dateTime={post.published} className="text-xs text-text-muted">
            {formatDate(post.published)}
          </time>
          <Link
            to={`/blog/${post.slug}`}
            className="font-heading font-semibold text-sm text-primary inline-flex items-center gap-1.5"
            aria-label={`${post.title} yazısını oku`}
          >
            Rehberi oku
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
