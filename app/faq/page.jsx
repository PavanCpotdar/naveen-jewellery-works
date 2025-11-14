'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
    const baseFaqs = [
        { q: 'Do you ship internationally?', a: 'Yes — shipping options depend on the destination.' },
        { q: 'What is your return policy?', a: 'Returns accepted within 14 days for unused items.' },
        { q: 'Do you offer custom orders?', a: 'Yes — contact us to discuss custom pieces.' },
        { q: 'How do I care for my jewellery?', a: 'Store pieces separately, avoid chemicals, and clean with a soft cloth.' },
        { q: 'Do you provide certificates for gemstones?', a: 'Selected gemstones include certificates; check product details.' }
    ]

    const [query, setQuery] = useState('')
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return baseFaqs
        return baseFaqs.filter(
            (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        )
    }, [query])

    function toggle(i) {
        setOpenIndex((prev) => (prev === i ? null : i))
    }

    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
                    <p className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400/10 text-yellow-400">Help center</p>
                    <h1 className="mt-4 text-3xl font-extrabold">Frequently Asked <span className="text-yellow-400">Questions</span></h1>
                    <p className="mt-2 text-gray-300">Answers to common questions about orders, returns, custom requests and care.</p>
                </motion.header>

                {/* Search */}
                <div className="mb-6">
                    <label htmlFor="faq-search" className="sr-only">Search FAQ</label>
                    <div className="relative">
                        <input
                            id="faq-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Search questions (e.g. shipping, returns, custom)..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">⌘K</div>
                    </div>
                </div>

                {/* FAQ list */}
                <div className="space-y-3">
                    {faqs.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-8">
                            No results for “{query}”
                        </motion.div>
                    )}

                    {faqs.map((f, i) => {
                        const isOpen = openIndex === i
                        return (
                            <motion.div key={f.q} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white text-black rounded-xl overflow-hidden shadow-md">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => toggle(i)}
                                        aria-expanded={isOpen}
                                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                                    >
                                        <div>
                                            <div className="text-md font-semibold">{f.q}</div>
                                            <div className="text-sm text-gray-600 mt-1">{isOpen ? 'Click to collapse' : 'Click to expand'}</div>
                                        </div>

                                        <div className="ml-4 shrink-0">
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400 text-black font-bold`}
                                            >
                                                {isOpen ? '−' : '+'}
                                            </motion.span>
                                        </div>
                                    </button>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.28 }}
                                            className="px-5 pb-4"
                                        >
                                            <div className="pt-1 text-gray-800">
                                                {f.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Still need help */}
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 bg-white/5 border border-white/5 rounded-xl p-6 text-center">
                    <div className="text-white/90 font-semibold">Still need help?</div>
                    <p className="text-gray-300 mt-2">Contact our support team or visit the FAQ for more details.</p>
                    <div className="mt-4">
                        <a href="/contact" className="inline-block px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">Contact Support</a>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
