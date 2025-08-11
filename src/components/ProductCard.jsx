
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'

export default function ProductCard({ product }) {
  const { add, formatCurrency } = useCart()
  const isHot = ['surging-sparks','destined-rivals','black-bolt','white-flame','prismatic-evolutions']
    .some(k => (product.id||'').includes(k))

  return (
    <div className="card p-3 flex flex-col card-hover">
      <Link to={`/produkt/${product.id}`} className="block shine">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl border border-gray-100 bg-white" />
      </Link>
      <div className="mt-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/produkt/${product.id}`} className="font-semibold hover:text-brand-700">{product.name}</Link>
          {isHot && <span className="badge-hot">Hot</span>}
        </div>
        <div className="mt-1 text-gray-500 text-xs uppercase tracking-wide">{product.category}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-extrabold">{formatCurrency(product.price)}</div>
        <button onClick={() => add({id: product.id, name: product.name, price: product.price, image: product.image})} className="btn btn-primary" aria-label={`Legg ${product.name} i handlekurv`}>Legg i kurv</button>
      </div>
      <div className="mt-1 text-[11px] text-gray-500">På lager: {product.stock}</div>
    </div>
  )
}
