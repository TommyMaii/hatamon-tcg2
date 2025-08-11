
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext()

function formatCurrency(nok) {
  return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(nok/100)
}

const initialState = { items: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const idx = state.items.findIndex(i => i.id === action.item.id)
      let items = [...state.items]
      if (idx >= 0) {
        items[idx] = { ...items[idx], qty: Math.min(items[idx].qty + (action.item.qty || 1), 99) }
      } else {
        items.push({ ...action.item, qty: action.item.qty || 1 })
      }
      return { ...state, items }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'SET_QTY': {
      const items = state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, Math.min(action.qty, 99)) } : i)
      return { ...state, items }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem('hatamon_cart')
    if (saved) dispatch({ type: 'INIT', payload: JSON.parse(saved) })
  }, [])

  useEffect(() => {
    localStorage.setItem('hatamon_cart', JSON.stringify(state))
  }, [state])

  const value = useMemo(() => ({
    items: state.items,
    add: (item) => dispatch({ type: 'ADD', item }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
    total: state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    formatCurrency
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
