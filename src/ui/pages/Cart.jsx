// src/ui/pages/Cart.jsx
import React from "react";
import { useCart } from "../CartProvider";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity, total, cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, e) => {
    const newQty = parseInt(e.target.value);
    if (!isNaN(newQty)) {
      updateQuantity(productId, newQty);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-info">
          <h4 className="alert-heading">Tu carrito está vacío</h4>
          <p>Agrega algunas obras desde la galería para comenzar.</p>
          <Link to="/products" className="btn btn-primary">
            Ver Obras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Tu Carrito de Compras</h1>
      <p className="text-center text-muted mb-4">
        Tienes {cartCount} {cartCount === 1 ? "producto" : "productos"} en el carrito
      </p>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              {cart.map((item) => {
                const price = Number(item.precio) || 0;
                const subtotal = price * item.qty;
                
                return (
                  <div key={item.id} className="border-bottom py-3">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={item.imagenUrl || "/placeholder-image.jpg"}
                          alt={item.nombre}
                          className="img-fluid rounded"
                          style={{ height: "80px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4">
                        <h5 className="mb-1">{item.nombre}</h5>
                        <p className="text-muted small mb-1">{item.autor}</p>
                      </div>
                      <div className="col-md-2">
                        <div className="input-group input-group-sm">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            className="form-control"
                            style={{ width: "70px" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <h6 className="mb-0">${price.toLocaleString("es-CL")}</h6>
                        <small className="text-muted">${subtotal.toLocaleString("es-CL")} total</small>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-3">Resumen del Pedido</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({cartCount})</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-danger fs-4">
                  ${total.toLocaleString("es-CL")}
                </strong>
              </div>
              
              <button className="btn btn-primary w-100 mb-2" onClick={() => navigate('/checkout')}>
                Proceder al Pago
              </button>
              
              <Link to="/products" className="btn btn-outline-primary w-100">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;