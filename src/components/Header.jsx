
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart.jsx'

export default function Header() {
  const { items } = useCart()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const count = items.reduce((s, i) => s + i.qty, 0)
  function onSubmit(e) { e.preventDefault(); navigate(`/sok?q=${encodeURIComponent(q)}`) }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Hatamon TCG" className="h-8 w-8" />
          <span className="font-bold text-lg">Hatamon TCG</span>
        </Link>
        <nav className="ml-6 hidden md:flex gap-3 text-sm">
          <Link to="/kategori/pokemon" className="hover:text-brand-700">Pokémon</Link>
          <Link to="/kategori/onepiece" className="hover:text-brand-700">One Piece</Link>
          <Link to="/kategori/yugioh" className="hover:text-brand-700">Yu-Gi-Oh!</Link>
          <Link to="/kategori/supplies" className="hover:text-brand-700">Tilbehør</Link>
        </nav>
        <form onSubmit={onSubmit} className="ml-auto flex-1 max-w-md hidden md:flex">
          <input className="input" placeholder="Søk produkter…" value={q} onChange={e=>setQ(e.target.value)} />
        </form>
        <Link to="/kasse" className="btn btn-primary ml-auto md:ml-2">
          Handlekurv ({count})
        </Link>
      </div>
    </header>
  )
}
