
import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-gray-800">Hatamon TCG</h3>
          <p>Norsk nettbutikk for TCG.</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Kundeservice</h3>
          <ul className="space-y-1">
            <li>E-post: hatamontcg@gmail.com</li>
            <li>Org.nr: 935 945 909</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Følg oss</h3>
        <a href="https://www.instagram.com/hatamon_tcg" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>         
        <p> TikTok</p>
                <a href="https://discord.gg/abZGAkpX" target="_blank" rel="noopener noreferrer">
          Discord
        </a>   
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Hatamon TCG. Alle rettigheter forbeholdt.</div>
    </footer>
  )
}
