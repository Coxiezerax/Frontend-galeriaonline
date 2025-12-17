
import { describe, it, expect } from 'vitest'
import { addToCart, total } from '../src/lib/cart.js'

describe('cart utils', () => {
  it('agrega un producto nuevo al carrito', () => {
    const out = addToCart([], { id: 1, name: 'A', price: 100 })
    expect(out.length).toBe(1)
    expect(out[0].qty).toBe(1)
  })

  it('incrementa cantidad cuando el producto ya existe', () => {
    const out = addToCart([{id:1, name:'A', price:100, qty:1}], { id: 1, name: 'A', price: 100 })
    expect(out[0].qty).toBe(2)
  })

  it('calcula el total correcto', () => {
    const cart = [{id:1, name:'A', price:100, qty:2}, {id:2, name:'B', price:50, qty:1}]
    expect(total(cart)).toBe(250)
  })
})
