import { Printer, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  'Hizmetler': ['DnD / FRP Figür', 'Kişiye Özel', 'Mimari Maket', 'Sanayi Prototip', 'Toplu Sipariş'],
  'Reçine': ['Standart', 'Tough (ABS-like)', 'Renkli', 'Şeffaf', 'Gri / Siyah'],
  'Destek': ['SSS', 'Fiyat Teklifi', 'Kargo Bilgileri', 'Mağaza', 'Gizlilik'],
}

const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

const socials = [
  { icon: InstagramIcon, href: 'https://instagram.com/micronforge3d', label: 'Instagram' },
  { icon: WhatsAppIcon, href: 'https://wa.me/905311034535', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer id="contact" className="theme-dark bg-surface border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <a href="/#hero" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/40 transition-shadow">
                <Printer size={22} className="text-white" />
              </div>
              <span className="text-2xl font-bold font-heading tracking-tight">
                Micron<span className="text-gradient">Forge</span>
              </span>
            </a>
            <p className="text-text-secondary leading-relaxed mb-7 max-w-sm">
              Manisa & İzmir bölgesi SLA reçine baskı atölyesi. FRP figür, kişiye özel,
              mimari maket ve sanayi prototip — mikron seviye detay.
            </p>

            <div className="flex flex-col gap-3 text-sm text-text-secondary mb-7">
              <a
                href="https://wa.me/905311034535"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-text-primary transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Mail size={14} className="text-green-400" />
                </span>
                WhatsApp · 7/24 yazabilirsin
              </a>
              <a href="tel:+905311034535" className="flex items-center gap-3 hover:text-text-primary transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={14} className="text-primary-light" />
                </span>
                +90 531 103 45 35
              </a>
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <MapPin size={14} className="text-primary-light" />
                </span>
                Manisa & İzmir
              </span>
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-surface/60 border border-border-light hover:border-primary/40 hover:bg-primary/10 hover:text-primary-light flex items-center justify-center transition-all duration-300 text-text-secondary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold font-heading mb-5 text-sm uppercase tracking-widest text-text-primary">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors inline-flex items-center gap-1.5 group">
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-border/60 pt-10 pb-8 mb-8">
          <div className="glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-heading font-bold text-xl md:text-2xl mb-2">
                Yeni baskılardan <span className="text-gradient">ilk sen</span> haberdar ol
              </h4>
              <p className="text-text-secondary text-sm">
                Özel kampanyalar, yeni modeller ve ipuçları için abone ol.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto md:min-w-[400px]">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3.5 rounded-xl bg-surface/60 border border-border-light text-sm focus:outline-none focus:border-primary focus:bg-surface/80 transition-all placeholder:text-text-muted"
              />
              <button className="btn-primary py-3.5 px-6 flex items-center gap-2 text-sm group">
                Abone Ol
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-secondary text-sm">
          <p>&copy; 2026 MicronForge. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-text-primary transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-text-primary transition-colors">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
