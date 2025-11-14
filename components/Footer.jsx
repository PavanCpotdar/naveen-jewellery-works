'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    function handleSubscribe(e) {
        e.preventDefault()
        // stub: Phase 2 -> call API
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 4000)
    }

    function scrollToTop() {
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-black text-white mt-16">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8"
            >
                {/* Brand / About */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-300 to-yellow-500 text-black flex items-center justify-center font-extrabold text-lg shadow-[0_6px_18px_rgba(250,204,21,0.18)]">
                            NJ
                        </div>
                        <div>
                            <div className="text-lg font-bold text-yellow-400">Naveen Jewellery Works</div>
                            <div className="text-sm text-gray-300 -mt-0.5">Timeless Craft • Modern Touch</div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">
                        Handcrafted jewellery with careful inventory management. We help boutiques and designers present collections with confidence.
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <SocialIcon ariaLabel="Instagram" svg={instagramSvg} />
                        <SocialIcon ariaLabel="Facebook" svg={facebookSvg} />
                        <SocialIcon ariaLabel="Pinterest" svg={pinterestSvg} />
                    </div>
                </div>

                {/* Quick links */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-white">Quick Links</h4>
                    <div className="flex flex-col text-sm text-gray-300 space-y-2">
                        <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
                        <a href="/products" className="hover:text-yellow-400 transition-colors">Products</a>
                        <a href="/about" className="hover:text-yellow-400 transition-colors">About</a>
                        <a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a>
                        <a href="/faq" className="hover:text-yellow-400 transition-colors">FAQ</a>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-white">Stay Updated</h4>
                    <p className="text-sm text-gray-300">Subscribe for new collections, offers and behind-the-scenes.</p>

                    <form onSubmit={handleSubscribe} className="flex gap-2 items-center">
                        <input
                            type="email"
                            required
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 rounded-lg px-4 py-2 bg-white/5 border border-white/6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
                        >
                            Subscribe
                        </button>
                    </form>

                    {subscribed && <div className="mt-2 text-sm text-yellow-300">Thanks — you’re subscribed!</div>}

                    <div className="text-xs text-gray-500 mt-4">
                        © {currentYear} Naveen Jewellery Works • Crafted with care.
                    </div>
                </div>
            </motion.div>

            {/* bottom divider */}
            <div className="border-t border-white/6 bg-black/95 py-3 text-center text-sm text-gray-400">
                Built for boutiques & creators — privacy and security first.
            </div>

            {/* back to top button */}
            <div className="fixed right-6 bottom-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToTop}
                    className="bg-yellow-400 text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
                    aria-label="Back to top"
                >
                    ↑
                </motion.button>
            </div>
        </footer>
    )
}

/* ---------- small helpers ---------- */

function SocialIcon({ ariaLabel, svg }) {
    return (
        <a
            href="#"
            aria-label={ariaLabel}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}

/* SVGs (small, lightweight) */
const instagramSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2"/></svg>`
const facebookSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v3h3v7h3v-7h2.5l.5-3H14V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const pinterestSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 21c-.2-1 .3-2.4.9-3.4.2-.4.6-1 0-1.4-.5-.4-1.6.2-1.9.4-1.1.8-1.8 2.2-1.8 3.7 0 2 1.5 3.6 3.5 3.6 4.3 0 5.9-4 5.9-7.1 0-2.1-1.4-3.9-3.3-3.9-2.5 0-3.3 1.9-3.3 3.4 0 1 .4 1.8.4 1.8l-1.6 6c-.5 2 0 4.3 0 4.3 2.6-.7 4.6-2.7 4.6-5.3 0-3.6-2.8-6.5-7.2-6.5-4.9 0-8.3 3.6-8.3 8.4 0 2.8 1.2 5.3 3 6.9" stroke="currentColor" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round"/></svg>`
