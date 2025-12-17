// funciones de carrito puras para testear

export function addToCart(cart, product) {
  const found = cart.find(i => i.id === product.id)
  if (found) {
    return cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
  }
  return [...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]
}

export function total(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0)
}