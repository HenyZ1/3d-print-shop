import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle } from 'lucide-react'

const faqs = [
  {
    q: 'STL dosyam yok, sadece fotoğraf göndersem yeter mi?',
    a: 'Evet! Fotoğraf, referans görsel, hatta el çizimi bile yeterli. Kendimiz modelleyip onayına sunarız. Tabii STL/OBJ/3MF dosyan varsa direkt kullanabiliriz — dilimleme ve destek bizden.',
  },
  {
    q: 'DnD/FRP figür baskısı yapıyor musunuz? Telif riski var mı?',
    a: '32mm, 75mm karakter figürü, boss yaratık, terrain ve aksesuar basıyoruz. Telifsiz STL veya özel tasarım figürlerle çalışıyoruz. Warhammer, Marvel gibi telifli markaları müşteri kendi sorumluluğunda kabul ederiz.',
  },
  {
    q: 'Manisa OSB / sanayi prototip için hangi reçine?',
    a: 'Tough (ABS-like) reçine kullanıyoruz — kırılgan değil, darbe dayanıklı. Mockup, sunum modeli, kalıp öncesi kontrol, elektronik kapak prototipi için uygun. Standart reçine kırılabilir, sanayi için önermiyoruz.',
  },
  {
    q: 'Mimarlık öğrencisi için acil baskı olur mu?',
    a: 'Evet, Manisa CBÜ ve İzmir mimarlık öğrencilerine 24-48 saat express teslim yapabiliyoruz. 1/100, 1/200, 1/500 ölçek insan, ağaç, mobilya, cephe detayı — final dönemleri en hızlı kanaldan ulaşın.',
  },
  {
    q: 'Baskı boyutu sınırı ne kadar?',
    a: 'Maksimum tek parça: 218 x 123 x 250 mm (Saturn 4 Ultra 16K MSLA). Daha büyük parçalar için parçalı baskı + montaj çözümümüz var. Birleşme yerleri mikron hassasiyetinde.',
  },
  {
    q: 'Boyalı mı yoksa boyasız mı teslim?',
    a: 'Standart teslim: yıkanmış + UV kurutulmuş + destek temizlenmiş. Astar atılmış teslim de mümkün (+ücret). Boyalı teslim siparişini özel olarak konuşuyoruz — kompleks boyama için önerimiz olmayabilir.',
  },
  {
    q: 'Fiyat teklifi nasıl alabilirim?',
    a: 'En hızlı yol: WhatsApp\'tan fotoğraf gönder, 30 dakika içinde tahmini fiyat ve süre alırsın. Sitede "Foto Yükle" bölümünden de talep oluşturabilirsin. Net fiyat tasarım onaylanmadan kesinleşmez.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="cv-auto py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-accent">Sıkça Sorulan</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-5 mb-4">
            Aklınızda Soru <span className="text-gradient">mu Var?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            En çok merak edilenleri yanıtladık. Bulamadığın bir soru olursa bize ulaş.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`rounded-2xl transition-all duration-300 ${
                open === i ? 'glass-strong glow-primary' : 'glass'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-heading font-semibold text-base md:text-lg">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    open === i
                      ? 'bg-gradient-to-br from-primary to-primary-light text-white'
                      : 'bg-surface-light text-text-secondary'
                  }`}
                >
                  <Plus size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-border-light">
            <MessageCircle size={18} className="text-accent" />
            <span className="text-text-secondary text-sm">
              Sorunuz mu var?{' '}

              <a href="#contact" className="text-accent hover:text-accent/80 transition-colors font-medium">
                Bize ulaşın
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
