import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center py-5">
      {/* Div con fondo - ahora en bloque completo */}
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '1.5rem',
        borderRadius: '8px',
        display: 'block', // ← Cambiado de inline-block a block
        maxWidth: '600px', // Opcional: ancho máximo
        margin: '0 auto 2rem auto', // Centrado horizontal
        color: 'white'
      }}>
        <h1 style={{ marginBottom: '1rem' }}>
          Bienvenido a la Galería Online
        </h1>
        <p style={{ fontSize: '1.1rem' }}>
          Descubre nuestras increíbles obras de arte
        </p>
      </div>
      
      {/* Botón centrado */}
      <Link to="/products" className="btn btn-primary">
        Ver obras disponibles
      </Link>
    </div>
  );
}

export default Home;