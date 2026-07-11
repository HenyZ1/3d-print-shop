import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, X, Send, MessageCircle, Phone, Check, ArrowRight, Camera } from 'lucide-react'

const categories = [
  { id: 'frp', label: 'DnD / FRP Figür' },
  { id: 'kisisel', label: 'Kişiye Özel' },
  { id: 'mimari', label: 'Mimari Maket' },
  { id: 'sanayi', label: 'Sanayi Prototip' },
  { id: 'diger', label: 'Diğer' },
]

const sizes = [
  { id: 'kucuk', label: '< 5 cm' },
  { id: 'orta', label: '5 - 10 cm' },
  { id: 'buyuk', label: '10 - 20 cm' },
  { id: 'kocaman', label: '> 20 cm' },
]

export default function OrderForm() {
  const [images, setImages] = useState([])
  const [category, setCategory] = useState('frp')
  const [size, setSize] = useState('orta')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef(null)

  const handleFiles = (files) => {
    const newImages = Array.from(files).slice(0, 5 - images.length).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(0),
    }))
    setImages((prev) => [...prev, ...newImages].slice(0, 5))
  }

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const sendToWhatsApp = () => {
    const catLabel = categories.find((c) => c.id === category)?.label
    const sizeLabel = sizes.find((s) => s.id === size)?.label
    const text = encodeURIComponent(
      `Merhaba! 3D reçine baskı teklifi istiyorum.\n\n` +
        `İsim: ${name || '-'}\n` +
        `İletişim: ${contact || '-'}\n` +
        `Kategori: ${catLabel}\n` +
        `Boyut: ${sizeLabel}\n` +
        `Notlar: ${notes || '-'}\n\n` +
        `(Fotoğrafları mesajdan sonra yollayacağım)`
    )
    window.open(`https://wa.me/905311034535?text=${text}`, '_blank')
  }

  return (
    <section id="order" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/12 rounded-full blur-[150px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-accent">Sipariş</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-5 mb-4 tracking-tight">
            Fotoğraf Yükle, <span className="text-gradient">Teklif Al</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            STL dosyana gerek yok. Modelin fotoğrafını gönder, 30 dakika içinde fiyat ve üretim süresi ulaşsın.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Check size={32} className="text-green-400" />
            </div>
            <h3 className="text-3xl font-bold font-heading mb-3">Talebin Alındı!</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Fotoğraflarını WhatsApp üzerinden göndermek istersen aşağıdaki butona dokunabilirsin. 30 dakika içinde dönüş yapacağız.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={sendToWhatsApp} className="btn-primary px-6 py-3 flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp'tan Devam Et
              </button>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setImages([])
                  setName('')
                  setContact('')
                  setNotes('')
                }}
                className="btn-outline px-6 py-3"
              >
                Yeni Talep Oluştur
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Photo upload */}
            <div>
              <label className="block text-sm font-bold font-heading mb-3 flex items-center gap-2">
                <Camera size={16} className="text-accent" />
                Foto Yükle <span className="text-text-secondary font-normal text-xs">(en fazla 5 adet)</span>
              </label>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="relative cursor-pointer glass border-2 border-dashed border-border-light hover:border-primary/50 rounded-2xl p-8 text-center transition-all min-h-[200px] flex flex-col items-center justify-center group"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} className="text-primary-light" />
                </div>
                <div className="font-heading font-semibold mb-1">Foto seçmek için tıkla veya buraya bırak</div>
                <div className="text-text-secondary text-xs">JPG, PNG, HEIC · Birden fazla yükleyebilirsin</div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-surface-light border border-border-light">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} className="text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-white truncate">
                        {img.size} KB
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-start gap-2 text-xs text-text-secondary">
                <ImageIcon size={14} className="flex-shrink-0 mt-0.5 text-accent" />
                <p>
                  STL/OBJ dosyan varsa direkt WhatsApp'tan gönderebilirsin. Fotoğraftan model oluşturma da yapıyoruz.
                </p>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold font-heading mb-3">Hangi kategori?</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        category === c.id
                          ? 'bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/40 text-text-primary'
                          : 'bg-surface/40 border border-border/60 text-text-secondary hover:border-border-light'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold font-heading mb-3">Yaklaşık boyut?</label>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id)}
                      className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        size === s.id
                          ? 'bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/40 text-text-primary'
                          : 'bg-surface/40 border border-border/60 text-text-secondary hover:border-border-light'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">İsim</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adın"
                    className="w-full px-4 py-3 rounded-xl bg-surface/60 border border-border-light text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">Telefon / Email</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="WhatsApp veya email"
                    className="w-full px-4 py-3 rounded-xl bg-surface/60 border border-border-light text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-secondary uppercase tracking-wider mb-2">Notlar (opsiyonel)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Renk, malzeme, özel istekler..."
                  className="w-full px-4 py-3 rounded-xl bg-surface/60 border border-border-light text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted resize-none"
                />
              </div>

              <button type="submit" className="btn-primary py-4 flex items-center justify-center gap-2 group">
                <Send size={16} />
                Talep Oluştur
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://wa.me/905311034535"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a
                  href="tel:+905311034535"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border-light hover:border-primary/40 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Phone size={14} /> Telefon
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
