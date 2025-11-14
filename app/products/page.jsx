'use client'
import { useState, useMemo } from 'react'
import { products as allProducts } from '../../data/products'
import ProductCard from '../../components/ProductCard'
import { motion } from 'framer-motion'


export default function Products() {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')


    const categories = useMemo(() => ['All', ...Array.from(new Set(allProducts.map(p => p.category)))], [])


    const filtered = useMemo(() => {
        return allProducts.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
            const matchesCategory = category === 'All' ? true : p.category === category
            return matchesQuery && matchesCategory
        })
    }, [query, category])


    return (
        <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Products</h2>
                    <div className="text-sm text-gray-600">Total items: {filtered.length}</div>
                </div>


                <div className="flex items-center gap-3">
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="border p-2 rounded" />
                    <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>


            <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: {} }} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map(p => (
                    <motion.div key={p.id} layout whileHover={{ zIndex: 1 }}>
                        <ProductCard product={p} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}