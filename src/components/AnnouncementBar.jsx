
import React from "react"
import { Link } from "react-router-dom"

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3">
        <span className="rounded-md bg-white/20 px-2 py-0.5">Nyhet</span>
        <span>Surging Sparks & Destined Rivals er på lager 🚚</span>
        <Link to="/kategori/pokemon" className="ml-auto underline hover:opacity-90">Kjøp Pokémon →</Link>
      </div>
    </div>
  )
}
