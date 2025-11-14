'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products as allProducts } from '../data/products' // adjust if your path differs

export default function Home() {
  const featured = allProducts.slice(0, 4)

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Decorative top */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-yellow-400/8 blur-3xl" />
        <div className="absolute right-0 top-10 w-80 h-80 rounded-full bg-white/2 blur-2xl" />
      </div>

      {/* HERO */}
      <section className="container mx-auto px-6 pt-28 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400/10 text-yellow-400">New Arrivals</span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Handcrafted Jewellery<br />
              <span className="text-yellow-400">Made to be cherished</span>
            </h1>

            <p className="text-gray-300 max-w-xl">
              Discover timeless pieces with a modern inventory experience — crafted with care, shown with elegance.
              Perfect for boutiques, designers, and curated collections.
            </p>

            <div className="flex flex-wrap gap-3 items-center mt-4">
              <Link href="/products" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow-lg hover:shadow-xl transition">
                Shop Collections
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </Link>

              <Link href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition">
                Learn More
              </Link>
            </div>

            <div className="mt-6 flex gap-8">
              <MiniStat label="Craft" value="Handmade" />
              <MiniStat label="Trust" value="Secure" />
              <MiniStat label="Stock" value="Real-time" />
            </div>
          </motion.div>

          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative w-full h-[420px] rounded-2xl bg-white/3 border border-white/6 overflow-hidden flex items-center justify-center">
              {/* glows */}
              <div className="absolute -left-32 -top-20 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />
              <div className="absolute right-0 top-0 w-60 h-60 rounded-full bg-white/5 blur-2xl" />

              {/* floating product cards */}
              <FloatingCard src="/images/gold-ring.jpg" title="Classic Gold Ring" price="$199" className="absolute left-8 top-8 w-48" initial={{ rotate: -4 }} />
              <FloatingCard src="/images/emerald-pendant.jpg" title="Emerald Pendant" price="$299" className="absolute right-8 top-12 w-52" initial={{ rotate: 6 }} delay={0.06} />
              <FloatingCard src="/images/silver-bangle.jpg" title="Silver Bangle" price="$79" className="absolute left-20 bottom-10 w-44" initial={{ rotate: -2 }} delay={0.12} />

              <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} className="w-56 h-56 rounded-xl overflow-hidden border border-white/8 shadow-2xl bg-white flex items-center justify-center">
                <img src="/images/diamond-studs.jpg" alt="Diamond studs" className="object-cover w-full h-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <HighlightCard title="Authentic Craftsmanship" desc="Handmade pieces with meticulous attention to detail." icon="★" />
          <HighlightCard title="Secure Inventory" desc="Keep accurate stock data & low-stock alerts." icon="🔒" />
          <HighlightCard title="Custom Designs" desc="Bespoke pieces — consult our artisans for unique creations." icon="✦" />
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Featured Collection</h2>
            <p className="text-gray-400 text-sm">Selected standout pieces from our catalog.</p>
          </div>
          <Link href="/products" className="text-yellow-400 font-medium hover:underline">View all products</Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <motion.div key={p.id} whileHover={{ y: -6 }} className="bg-white text-black rounded-xl p-4 shadow-md">
              <div className="w-full h-40 rounded-md overflow-hidden mb-3 border">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{p.karat} • {p.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{`$${p.price.toFixed(0)}`}</div>
                  <div className="text-xs text-gray-500">Stock: {p.stock}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/products`} className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold">View</Link>
                <button className="px-3 py-1 rounded-full border border-white/10 text-sm">Wishlist</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-semibold">Our Story</h3>
            <p className="text-gray-300 mt-3">Jewellery Palace blends time-honored craftsmanship with modern presentation. Each piece is curated and tracked so you can present collections with confidence.</p>

            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-400">• Hand-selected materials and ethical sourcing</li>
              <li className="text-sm text-gray-400">• Quality checks for every item</li>
              <li className="text-sm text-gray-400">• Designed to last generations</li>
            </ul>

            <div className="mt-6">
              <Link href="/about" className="px-5 py-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition">Read more</Link>
            </div>
          </motion.div>

          <motion.div initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="w-full h-56 rounded-xl overflow-hidden border bg-white/3 flex items-center justify-center">
              <img src="/images/gold-ring.jpg" alt="craft" className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH & TRUST */}
      <section className="container mx-auto px-6 py-10">
        <div className="bg-white/5 rounded-xl p-6 md:flex items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold">Inventory & Trust</h4>
            <p className="text-gray-300 mt-2">Secure, reliable inventory tools built around jewellery — low-stock alerts, product history, and admin controls (Phase 2).</p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold">Secure</div>
            <div className="px-4 py-2 rounded-full border border-white/10">Cloud-ready</div>
            <div className="px-4 py-2 rounded-full border border-white/10">Audit logs</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">What customers say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial text="Beautiful pieces & an effortless admin experience — highly recommend!" author="Riya K." />
          <Testimonial text="Great craftsmanship. The inventory view is super helpful for our shop." author="Sahil M." />
          <Testimonial text="Custom order exceeded expectations — the team was very responsive." author="Neha P." />
        </div>
      </section>

      {/* GALLERY */}
      <section className="container mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GalleryItem src="/images/gold-ring.jpg" />
          <GalleryItem src="/images/emerald-pendant.jpg" />
          <GalleryItem src="/images/silver-bangle.jpg" />
          <GalleryItem src="/images/diamond-studs.jpg" />
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-yellow-400/6 border border-yellow-400/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-white">Join our newsletter</h3>
          <p className="text-gray-200 mt-2">Get early access to new collections and exclusive offers.</p>

          <div className="mt-4 flex justify-center gap-3">
            <input placeholder="Your email" className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 text-white" />
            <button className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold">Subscribe</button>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-white/5 rounded-xl p-8 text-center">
          <h4 className="text-xl font-semibold">Have a bespoke idea?</h4>
          <p className="text-gray-300 mt-2">We’d love to help you craft something unique.</p>
          <div className="mt-4">
            <Link href="/contact" className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ---------- small components ---------- */

function MiniStat({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function FloatingCard({ src, title, price, className = '', initial = {}, delay = 0 }) {
  return (
    <motion.div initial={{ y: -6, opacity: 0, ...initial }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay }} whileHover={{ y: -8, scale: 1.02 }} className={`${className} bg-white text-black rounded-xl p-3 border shadow-md cursor-pointer`}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border">
          <img src={src} alt={title} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-gray-600 mt-1">{price}</div>
        </div>
      </div>
    </motion.div>
  )
}

function HighlightCard({ title, desc, icon }) {
  return (
    <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="p-6 bg-white/5 rounded-xl border border-white/6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-semibold text-lg">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-300 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonial({ text, author }) {
  return (
    <motion.blockquote initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="p-6 bg-white text-black rounded-xl shadow-md">
      <p className="text-sm leading-relaxed">“{text}”</p>
      <footer className="mt-3 text-xs text-gray-600 font-semibold">— {author}</footer>
    </motion.blockquote>
  )
}

function GalleryItem({ src }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="w-full h-36 rounded-md overflow-hidden border bg-white/5">
      <img src={src} alt="" className="w-full h-full object-cover" />
    </motion.div>
  )
}
