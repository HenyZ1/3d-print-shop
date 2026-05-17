import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmet Yilmaz',
    role: 'Mimar',
    text: 'Maket projelerimde PrintForge ile calismak buyuk bir ayricalik. Detay kalitesi ve hiz konusunda beklentilerimin cok uzerinde sonuclar aldim.',
    rating: 5,
    avatar: 'AY',
    color: '#6C3CE9',
  },
  {
    name: 'Elif Kaya',
    role: 'Endustriyel Tasarimci',
    text: 'Prototip uretim surecimizi tamamen degistirdiler. Artik fikirlerimizi cok daha hizli test edebiliyoruz. Harika malzeme cesitliligi!',
    rating: 5,
    avatar: 'EK',
    color: '#00E5FF',
  },
  {
    name: 'Mehmet Demir',
    role: 'Hobi Meraklisi',
    text: 'Ilk 3D baski deneyimimdi ve sonuc muhtesemdi. Musteri hizmetleri her asamada yardimci oldu. Kesinlikle tavsiye ederim!',
    rating: 5,
    avatar: 'MD',
    color: '#FF6B35',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 relative bg-surface-light">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Yorumlar</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-4">
            Musterilerimiz <span className="text-gradient">Ne Diyor?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Binlerce mutlu musterimizden bazilari.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 relative group hover:glow-primary transition-all duration-500"
            >
              <Quote size={40} className="absolute top-6 right-6 text-primary/10" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-accent-warm fill-accent-warm" />
                ))}
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-text-secondary text-xs">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
