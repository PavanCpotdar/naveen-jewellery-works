'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Contact() {
    const [status, setStatus] = useState(null) // null | 'ok' | 'error' | 'sending'
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('sending')

        // stubbed send — replace with API call in Phase 2
        try {
            await new Promise((r) => setTimeout(r, 900))
            setStatus('ok')
            setForm({ name: '', email: '', message: '' })
        } catch (err) {
            setStatus('error')
        } finally {
            setTimeout(() => setStatus(null), 4500)
        }
    }

    return (
        <main className="min-h-screen bg-black text-white py-16">
            <div className="container mx-auto px-6">
                {/* header */}
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-8">
                    <p className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400/10 text-yellow-400">Get in touch</p>
                    <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">Contact <span className="text-yellow-400">Naveen Jewellery Works</span></h1>
                    <p className="mt-3 text-gray-300">Have a question, custom order or collaboration? Send us a message — we respond within 24–48 hours.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
                    {/* form */}
                    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <FloatingLabelInput
                                id="name"
                                label="Your name"
                                value={form.name}
                                onChange={(v) => setForm({ ...form, name: v })}
                                required
                            />
                            <FloatingLabelInput
                                id="email"
                                label="Email address"
                                type="email"
                                value={form.email}
                                onChange={(v) => setForm({ ...form, email: v })}
                                required
                            />
                            <FloatingLabelTextarea
                                id="message"
                                label="Message"
                                value={form.message}
                                onChange={(v) => setForm({ ...form, message: v })}
                                required
                            />

                            <div className="flex items-center gap-3">
                                <motion.button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    whileTap={{ scale: 0.98 }}
                                    whileHover={{ y: -2 }}
                                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow-lg hover:shadow-xl transition"
                                >
                                    {status === 'sending' ? (
                                        <Spinner />
                                    ) : (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                                            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                </motion.button>

                                <AnimatePresence>
                                    {status === 'ok' && (
                                        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-green-300">
                                            ✅ Message sent
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-300">
                                            ⚠️ Something went wrong
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>

                    {/* contact info */}
                    <motion.aside initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                            <p className="mt-2 text-gray-300">Prefer email? Write to us and we’ll reply shortly.</p>

                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <IconMail />
                                    <div>
                                        <div className="text-gray-200 font-medium">hello@jewellerypalace.com</div>
                                        <div className="text-gray-400">General inquiries & orders</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <IconPhone />
                                    <div>
                                        <div className="text-gray-200 font-medium">+1 (555) 123-4567</div>
                                        <div className="text-gray-400">Mon–Fri, 9am–6pm</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <IconMap />
                                    <div>
                                        <div className="text-gray-200 font-medium">Studio • 12 Rose Lane</div>
                                        <div className="text-gray-400">City, Country</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t pt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Social href="#" label="Instagram" />
                                    <Social href="#" label="Facebook" />
                                    <Social href="#" label="Pinterest" />
                                </div>

                                <Link href="/faq" className="text-sm text-yellow-400 font-semibold hover:underline">FAQ</Link>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/5">
                            {/* decorative map placeholder */}
                            <div className="bg-linear-to-br from-yellow-400/6 to-black p-6 text-center">
                                <div className="text-sm text-gray-400">Visit our studio</div>
                                <h4 className="mt-2 text-lg font-semibold text-white">Studio Location</h4>
                                <p className="mt-1 text-gray-300">Drop by by appointment — we love meeting customers.</p>
                                <div className="mt-4">
                                    <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-yellow-400 hover:text-black transition">Book Visit</button>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </main>
    )
}

/* ---------------- UI pieces ---------------- */

function FloatingLabelInput({ id, label, value, onChange, type = 'text', required = false }) {
    return (
        <label htmlFor={id} className="relative block">
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="peer w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-white placeholder-transparent"
                placeholder={label}
                aria-label={label}
            />
            <span className="absolute left-4 top-3 text-sm text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-xs transition-all">
                {label}
            </span>
        </label>
    )
}

function FloatingLabelTextarea({ id, label, value, onChange, required = false }) {
    return (
        <label htmlFor={id} className="relative block">
            <textarea
                id={id}
                name={id}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="peer w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 h-36 resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-white placeholder-transparent"
                placeholder={label}
                aria-label={label}
            />
            <span className="absolute left-4 top-3 text-sm text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:text-xs transition-all">
                {label}
            </span>
        </label>
    )
}

function Spinner() {
    return (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.15" strokeWidth="4" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
    )
}

function Social({ href, label }) {
    return (
        <a href={href} aria-label={label} className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center hover:bg-yellow-400 transition">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.6" />
                <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        </a>
    )
}

/* icons */

function IconMail() {
    return (
        <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 8.5L12 13 3 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
    )
}
function IconPhone() {
    return (
        <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M22 16.9a19 19 0 0 1-8.6-2.8 19 19 0 0 1-6-6A19 19 0 0 1 4.1 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
    )
}
function IconMap() {
    return (
        <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M21 10V5a1 1 0 0 0-1-1l-5 2-5-2-6 2v6l6-2 5 2 5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
    )
}
