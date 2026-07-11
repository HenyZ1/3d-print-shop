import { motion } from 'framer-motion'
import { Swords, Sparkles, Building2, Wrench, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'frp',
    icon: Swords,
    badge: 'En Çok Talep',
    title: 'DnD / FRP / Tabletop',
    subtitle: '32mm · 75mm · Terrain',
    description:
      'Karakter figürleri, boss yaratıklar, NPC, terrain parçaları ve aksesuarlar. Boyasız veya astar atılmış teslim. Özgün & ticari lisanslı STL.',
    items: ['Savaşçı, büyücü, rogue', 'Boss & yaratık', 'Zar kulesi / kutu', 'Terrain & objective'],
    price: 'Foto gönder, sor',
    color: '#6C3CE9',
    gradient: 'from-primary to-primary-light',
  },
  {
    id: 'kisisel',
    icon: Sparkles,
    badge: 'Hediye',
    title: 'Kişiye Özel Masaüstü',
    subtitle: 'Figür · Stand · Heykel',
    description:
      'Oyuncu nick standı, yayıncı masaüstü logosu, sevgili figürü, evcil hayvan minyatürü, araba/motor temalı stand. Kişiselleştirme = değerli hediye.',
    items: ['İsimli figür', 'Twitch / YouTube stand', 'Çift / sevgili heykel', 'Evcil hayvan minyatür'],
    price: 'Foto gönder, sor',
    color: '#FF6B35',
    gradient: 'from-accent-warm to-red-500',
  },
  {
    id: 'mimari',
    icon: Building2,
    badge: 'Öğrenci Dostu',
    title: 'Mimari Maket Parçaları',
    subtitle: '1/100 · 1/200 · 1/500',
    description:
      'Mimarlık & iç mimarlık öğrencileri ve ofisleri için maket aksesuarları. Manisa CBÜ & İzmir bölgesi — acil teslim final dönemleri.',
    items: ['İnsan / araba figür', 'Sokak lambası / bank', 'Kapı / pencere detay', 'Mobilya minyatür'],
    price: 'Foto gönder, sor',
    color: '#00E5FF',
    gradient: 'from-accent to-cyan-400',
  },
  {
    id: 'sanayi',
    icon: Wrench,
    badge: 'B2B',
    title: 'Sanayi Prototip & Numune',
    subtitle: 'Manisa OSB · Mockup · Ar-Ge',
    description:
      'Otomotiv yan sanayi, beyaz eşya, elektronik kutu, plastik enjeksiyon kalıbı öncesi görsel kontrol modeli. Tough reçine ile dayanıklı numune.',
    items: ['Ürün numunesi', 'Mockup parça', 'Elektronik kapak', 'Ölçekli sunum modeli'],
    price: 'Foto gönder, sor',
    color: '#8B5CF6',
    gradient: 'from-primary-light to-purple-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary">Hizmetler</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Ne <span className="text-gradient">Basabiliyoruz?</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Manisa & İzmir bölgesinde 4 ana alanda SLA reçine baskı hizmeti. Hangi alanda olursanız olun, fotoğraf gönderin, teklif anında.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden lift hover:glow-primary transition-all duration-500"
              >
                {/* Decorative glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-700"
                  style={{ background: service.color }}
                />

                <div className="relative">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 8px 32px ${service.color}40` }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: `${service.color}15`,
                        color: service.color,
                        border: `1px solid ${service.color}30`,
                      }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-2xl font-bold font-heading mb-1">{service.title}</h3>
                    <p className="text-text-secondary text-sm font-mono uppercase tracking-wider">{service.subtitle}</p>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-text-secondary px-3 py-2 rounded-lg bg-surface/40 border border-border/40"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: service.color }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-border/40">
                    <div>
                      <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Fiyat</div>
                      <div className="font-bold font-heading text-gradient text-lg flex items-center gap-2">
                        <span className="text-2xl">?</span>
                        <span className="text-sm font-medium">{service.price}</span>
                      </div>
                    </div>
                    <a
                      href="#order"
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: service.color }}
                    >
                      Teklif al
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass border border-border-light text-sm text-text-secondary">
            <Sparkles size={14} className="text-accent" />
            Aklında farklı bir proje mi var?{' '}
            <a href="#order" className="text-accent hover:text-accent/80 font-medium">
              Bize yaz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
