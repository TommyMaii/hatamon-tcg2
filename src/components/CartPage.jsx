
import React from 'react'
import { useCart } from '../store/cart.jsx'

export default function CartPage() {
  const { items, setQty, remove, total, clear, formatCurrency } = useCart()

  async function checkout() {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else alert(data?.error || 'Kunne ikke starte betaling')
    } catch {
      alert('Nettverksfeil ved betaling')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-2xl font-bold">Handlekurv</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-gray-600">Handlekurven er tom.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 card p-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b last:border-0">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg border" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{formatCurrency(item.price)}</div>
                </div>
                <input type="number" min="1" max="99" value={item.qty} onChange={e=>setQty(item.id, parseInt(e.target.value||'1',10))} className="input w-20" />
                <button className="btn btn-ghost" onClick={()=>remove(item.id)}>Fjern</button>
              </div>
            ))}
          </div>
          <div className="card p-3 h-fit">
            <div className="flex justify-between py-2">
              <div>Delsum</div>
              <div className="font-semibold">{formatCurrency(total)}</div>
            </div>
            <div className="text-xs text-gray-500">Frakt beregnes i kassen.</div>
            <div className="mt-4 grid gap-2">
              <button className="btn btn-primary w-full" onClick={checkout}>Gå til betaling</button>
              <button className="btn btn-ghost w-full" onClick={clear}>Tøm kurv</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
