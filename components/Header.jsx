'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import LogoImage from "../public/images/Logo-white.png"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' }
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-yellow-500/10 border-b border-yellow-400/10'
        : 'bg-black border-b border-yellow-500/20'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        {/* Brand */}
        <Link
          href={'/'}
          className="relative group text-white tracking-wide hover:text-yellow-400 transition-colors"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 cursor"
          >
            {/* Animated gold glow logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-12 h-12 rounded-full bg-linear-to-br from-yellow-300 to-yellow-500 text-black flex items-center justify-center font-extrabold text-lg shadow-[0_0_12px_rgba(250,204,21,0.5)]"
            >
              {/* <span className="animate-pulse-slow">NJ</span> */}
              {/* <img src='./images/Logo-white.png' className="object-cover w-full h-full rounded-4xl"  /> */}
              <Image src={LogoImage} alt='Logo Image' width={100} height={100} className="rounded-4xl" />
            </motion.div>

            <div>
              <h1 className="text-lg font-bold text-yellow-400 leading-tight tracking-wide cursor">
                Naveen Jewellery Works
              </h1>
              <p className="text-xs text-gray-300 -mt-0.5 cursor">Timeless Craft • Modern Touch</p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navItems.map((n, i) => (
            <motion.div
              key={n.href}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.05,
                type: 'spring',
                stiffness: 250
              }}
            >
              <Link
                href={n.href}
                className="relative group text-white tracking-wide hover:text-yellow-400 transition-colors"
              >
                {n.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer border px-3 py-1.5 rounded-md bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-300 transition">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-black border border-yellow-400/20 rounded-md shadow-lg overflow-hidden">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block px-4 py-2 text-sm text-white hover:bg-yellow-400 hover:text-black transition"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header >
  )
}
