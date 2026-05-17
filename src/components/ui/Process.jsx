import { motion } from 'framer-motion'
import { Upload, Cpu, PackageCheck, Truck } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Tasarimi Yukle',
    description: 'STL, OBJ veya 3MF formatinda 3D modelinizi yukleyin ya da bize fikrinizi anlatın.',
    color: '#6C3CE9',
  },
  {
    icon: Cpu,
    title: 'Baski Ayarlari',
    description: 'Malzeme, renk, infill orani ve kalite ayarlarini birlikte belirleyelim.',
    color: '#00E5FF',
  },
  {
    icon: PackageCheck,
    title: 'Uretim',
    description: 'Profesyonel 3D yazicilarimiz ile urunleriniz titizlikle basilir ve kalite kontrolden gecirilir.',
    color: '#FF6B35',
  },
  {
    icon: Truck,
    title: 'Teslimat',
    description: 'Ozenle paketlenen urunleriniz en kisa surede kapiniza guvenle ulastirilir.',
    color: '#8B5CF6',
  },
]

export default function Process() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Surecimiz</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-4">
            Nasil <span className="text-gradient">Calisir?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Siparisten teslimata dort basit adimda hayallerinizi gercege donusturuyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary-light opacity-20" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                <div className="relative inline-flex mb-6">
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon size={36} style={{ color: step.color }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: step.color }}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold font-heading mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
