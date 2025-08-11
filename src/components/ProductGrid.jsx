
import React from 'react'
import ProductCard from './ProductCard.jsx'
export default function ProductGrid({ products }) {
  if (!products?.length) return <div className="text-gray-600">Ingen produkter funnet.</div>
  return <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.map(p => <ProductCard key={p.id} product={p} />)}
  </div>
}
