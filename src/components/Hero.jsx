
import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Hatamon TCG</h1>
          <p className="mt-3 text-lg text-gray-700">Norsk nettbutikk for Pokémon og andre TCG-produkter. Fang favorittene, bygg deck, ha det gøy.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/kategori/pokemon" className="btn btn-primary btn-pulse">Kjøp Pokémon</Link>
            <Link to="/kategori/supplies" className="btn btn-ghost">Tilbehør</Link>
          </div>
          <div className="mt-6 flex gap-2 text-sm text-gray-600">
            <span className="badge-new">Bestselgere</span>
            <span className="badge-hot">Rask levering</span>
            <span className="badge">Norsk lager</span>
          </div>
        </div>
        <div className="hero-wrap floater">
          <div className="hero-inner p-2">
            <img src="/hatamontcg.jpg" alt="Pokémon TCG produkter" className="w-full rounded-2xl border border-gray-100 shine" />
          </div>
        </div>
      </div>
    </section>
  )
}
