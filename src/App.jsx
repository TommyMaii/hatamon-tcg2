
import React, { useMemo, useState } from 'react'
import { Routes, Route, useParams, useLocation, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import CartPage from './components/CartPage.jsx'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import { CartProvider, useCart } from './store/cart.jsx'
import { PRODUCTS, CATEGORIES } from './data/products.js'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function Home() {
  const featured = PRODUCTS.slice(0, 4)
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Populært nå</h2>
        <ProductGrid products={featured} />
      </section>
    </main>
  )
}

function Kategori() {
  const { id } = useParams()
  const [selected, setSelected] = useState(id || '')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('pop')

  const filtered = useMemo(() => {
    let arr = PRODUCTS.filter(p => !selected || p.category === selected)
    if (q) {
      const needle = q.toLowerCase()
      arr = arr.filter(p => p.name.toLowerCase().includes(needle) || (p.tags||[]).some(t => t.includes(needle)))
    }
    if (sort === 'asc') arr = arr.slice().sort((a,b)=>a.price-b.price)
    if (sort === 'desc') arr = arr.slice().sort((a,b)=>b.price-a.price)
    return arr
  }, [selected, q, sort])

  const catName = CATEGORIES.find(c=>c.id===selected)?.name || 'Alle produkter'

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-3">{catName}</h2>
      <div className="mt-4">
        <ProductGrid products={filtered} />
      </div>
    </main>
  )
}

function Søk() {
  const query = useQuery().get('q') || ''
  const results = useMemo(() => {
    const needle = query.toLowerCase()
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(needle) || (p.tags||[]).some(t => t.includes(needle)))
  }, [query])
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-bold">Søk: <span className="text-brand-700">{query}</span></h2>
      <div className="mt-4">
        <ProductGrid products={results} />
      </div>
    </main>
  )
}

function Produkt() {
  const { pid } = useParams()
  const { add, formatCurrency } = useCart()
  const product = PRODUCTS.find(p => p.id === pid)
  if (!product) return <main className="mx-auto max-w-7xl px-4 py-10">Produktet finnes ikke.</main>
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 grid gap-6 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="w-full rounded-2xl border" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-1 text-gray-500">Kategori: {product.category}</div>
        <div className="mt-4 text-2xl font-extrabold">{formatCurrency(product.price)}</div>
        <div className="mt-4 text-gray-700">{product.description}</div>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={()=>add({id: product.id, name: product.name, price: product.price, image: product.image})}>Legg i kurv</button>
          <Link to="/kasse" className="btn btn-ghost">Gå til kurv</Link>
        </div>
      </div>
    </main>
  )
}

function Takk() {
  return <main className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-bold">Takk for bestillingen!</h1>
    <p className="mt-2 text-gray-600">Du får kvittering på e-post fra Stripe.</p>
  </main>
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnnouncementBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori/:id" element={<Kategori />} />
          <Route path="/produkt/:pid" element={<Produkt />} />
          <Route path="/kasse" element={<CartPage />} />
          <Route path="/sok" element={<Søk />} />
          <Route path="/takk" element={<Takk />} />
          <Route path="*" element={<main className='mx-auto max-w-7xl px-4 py-10'>Fant ikke siden.</main>} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}
