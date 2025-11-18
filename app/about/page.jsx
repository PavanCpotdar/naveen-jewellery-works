'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-6 py-16">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/10 text-yellow-400 max-w-max">
                        Who we are
                    </p>

                    <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-white">
                        About <span className="text-yellow-400">Naveen Jewellery Works</span>
                    </h1>

                    <p className="mt-4 text-gray-300 max-w-2xl">
                        A boutique jewellery house dedicated to timeless design, careful craftsmanship, and a delightful shopping experience.
                        We combine traditional techniques with modern inventory tools so each piece is both beautiful and trackable.
                    </p>
                </motion.header>

                {/* Mission & Values (cards) */}
                <section className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card accent>
                        <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
                        <p className="mt-3 text-sm text-gray-700">
                            Craft jewellery that becomes treasured memories — focusing on quality, detail, and responsible sourcing.
                        </p>
                    </Card>

                    <Card accent>
                        <h3 className="text-lg font-semibold text-gray-900">Our Values</h3>
                        <ul className="mt-3 text-sm text-gray-700 space-y-2">
                            <li>• Craftsmanship & attention to detail</li>
                            <li>• Ethical materials & transparency</li>
                            <li>• Exceptional customer experience</li>
                        </ul>
                    </Card>

                    <Card accent>
                        <h3 className="text-lg font-semibold text-gray-900">Where we are heading</h3>
                        <p className="mt-3 text-sm text-gray-700">
                            Phase 2: database-backed products, contact persistence, admin UI and secure uploads — coming soon.
                        </p>
                    </Card>
                </section>

                {/* Timeline */}
                <section className="mb-12">
                    <motion.h2 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white mb-6">
                        Our Journey
                    </motion.h2>

                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-400/80 hidden md:block" />
                        <div className="space-y-8">
                            {[
                                { year: '2018', title: 'Founded', text: 'Humble beginnings crafting bespoke pieces.' },
                                { year: '2020', title: 'First Collection', text: 'Launched our first signature collection.' },
                                { year: '2023', title: 'Inventory System', text: 'Built an intuitive inventory & showcase system.' }
                            ].map((item, idx) => (
                                <motion.div key={item.year} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }} className="md:flex md:items-start md:gap-6">
                                    <div className="md:w-32 flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-semibold">{item.year}</div>
                                    </div>

                                    <div className="bg-white text-black rounded-xl border p-4 shadow-md flex-1">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="mt-2 text-sm text-gray-700">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="mb-12">
                    <motion.h2 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white mb-6">
                        Meet the Team
                    </motion.h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Naveen C Potdar', role: 'Founder & Designer', img: '/images/account.png' },
                            { name: 'Rukmini C Potdar', role: 'Head of Craft', img: '/images/account.png' },
                            { name: 'Poornima C Potdar', role: 'Operations', img: '/images/account.png' }
                        ].map((t, i) => (
                            <motion.div key={t.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="bg-white text-black border rounded-2xl p-6 text-center shadow-lg">
                                <div className="mx-auto w-28 h-28 rounded-full overflow-hidden border mb-4 flex items-center justify-center bg-gray-100">
                                    {/* replace with actual images, or keep initials */}
                                    {t.img ? (
                                        <Image src={t.img} alt={t.name} width={112} height={112} className="object-cover" />
                                    ) : (
                                        <div className="text-lg font-semibold text-gray-700">{t.name.split(' ').map(n => n[0]).join('')}</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{t.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-8">
                    <div className="bg-yellow-400/6 border border-yellow-400/20 rounded-2xl p-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <h3 className="text-2xl font-semibold text-white">Want to collaborate or place a bespoke order?</h3>
                            <p className="text-gray-300 mt-2">Reach out and we’ll guide you through the process.</p>
                            <div className="mt-4">
                                <Link href="/contact" className="inline-block px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </main>
    )
}

/* ---------- helper Card component ---------- */
function Card({ children, accent = false }) {
    return (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className={`rounded-2xl p-6 ${accent ? 'bg-white text-black border-yellow-300/30' : 'bg-white text-black'} shadow-md`}>
            {children}
        </motion.div>
    )
}
