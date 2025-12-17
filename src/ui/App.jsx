// src/ui/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Farmacias from './pages/Farmacias';
import { CartProvider } from './CartProvider'; // ← ¡SIN "pages/"!
import './styles/index.css'; 


function App() {
  return (
    <CartProvider>

      
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <a className="navbar-brand fw-bold text-primary" href="/">
              <i className="bi bi-palette me-2"></i>
              Galería Online
            </a>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="bi bi-house me-1"></i> Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/products">
                    <i className="bi bi-images me-1"></i> Obras
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <i className="bi bi-cart me-1"></i> Carrito
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/farmacias">
                    <i className="bi bi-capsule me-1"></i> Farmacias
                  </a>
                </li>
              
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/farmacias" element={<Farmacias />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light py-4 border-top">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5>Galería Online</h5>
                <p className="text-muted">
                  Plataforma de venta de obras de arte y productos culturales.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <h5>Contacto</h5>
                <p className="text-muted">
                  <i className="bi bi-envelope me-1"></i> contacto@galeriaonline.cl<br/>
                  <i className="bi bi-telephone me-1"></i> +56 9 1234 5678
                </p>
              </div>
            </div>
            <hr/>
            <div className="text-center text-muted">
              <small>
                &copy; {new Date().getFullYear()} Galería Online. Todos los derechos reservados.
                | Proyecto FullStack - Duoc UC
              </small>
            </div>
          </div>
        </footer>
      </div>

      {/* Botón flotante de farmacias */}
<div className="position-fixed" style={{ bottom: '30px', right: '30px', zIndex: 1000 }}>
  <a 
    href="/farmacias"
    className="btn btn-success shadow-lg d-flex align-items-center"
    style={{
      borderRadius: '50px',
      padding: '12px 25px',
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      border: 'none',
      boxShadow: '0 6px 20px rgba(40, 167, 69, 0.4)',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.6)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
    }}
  >
    <i className="bi bi-capsule-pill me-2" style={{ fontSize: '1.3rem' }}></i>
    Farmacias
    <span className="badge bg-light text-success ms-2">Nuevo</span>
  </a>
</div>
    </CartProvider>
  );
}

export default App;