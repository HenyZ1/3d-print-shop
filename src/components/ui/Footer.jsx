import { Printer, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  'Urunler': ['Dekoratif', 'Prototip', 'Endustriyel', 'Ozel Tasarim', 'Minyatur'],
  'Sirket': ['Hakkimizda', 'Kariyer', 'Blog', 'Basin', 'Partnerler'],
  'Destek': ['SSS', 'Iletisim', 'Kargo Bilgileri', 'Iade Politikasi', 'Gizlilik'],
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-surface-light border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Printer size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight">
                Print<span className="text-gradient">Forge</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm">
              Turkiye'nin lider 3D baski hizmet saglayicisi. Hayallerinizi katman
              katman gercege donusturuyoruz.
            </p>

            <div className="flex flex-col gap-3 text-sm text-text-secondary">
              <a href="#" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Mail size={16} className="text-primary-light" /> info@printforge.com
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Phone size={16} className="text-primary-light" /> +90 (212) 555 0123
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-light" /> Istanbul, Turkiye
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold font-heading mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h4 className="font-heading font-semibold text-lg">Bultenimize Abone Olun</h4>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 md:w-80 px-4 py-3 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="btn-primary py-3 px-6 flex items-center gap-2 text-sm">
                Abone Ol
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-secondary text-sm">
          <p>&copy; 2025 PrintForge. Tum haklari saklidir.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary transition-colors">Kullanim Sartlari</a>
            <a href="#" className="hover:text-text-primary transition-colors">Gizlilik Politikasi</a>
            <a href="#" className="hover:text-text-primary transition-colors">Cerez Politikasi</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
