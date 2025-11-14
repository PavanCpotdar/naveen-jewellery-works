import { motion } from 'framer-motion'


export default function ProductCard({ product }) {
    return (
        <motion.article whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} className="bg-white rounded-lg p-4 shadow-card transition overflow-hidden">
            <div className="h-44 rounded-md mb-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img src={product.image} alt={product.name} className="max-h-full" />
            </div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.karat} • {product.category}</p>


            <div className="mt-4 flex items-center justify-between">
                <div>
                    <div className="text-xl font-bold">Rs{product.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                </div>
                <button className="px-3 py-1 rounded-md bg-brand-blue text-white text-sm">View</button>
            </div>
        </motion.article>
    )
}