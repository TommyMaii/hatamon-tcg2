
import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-gray-800">Hatamon TCG</h3>
          <p>Norsk nettbutikk for TCG – mest Pokémon.</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Kundeservice</h3>
          <ul className="space-y-1">
            <li>E-post: support@hatamon.no</li>
            <li>Org.nr: 999 999 999</li>
            <li>Frakt fra 69 kr</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Følg oss</h3>
          <p>Instagram / TikTok / Discord</p>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Hatamon TCG. Alle rettigheter forbeholdt.</div>
    </footer>
  )
}
