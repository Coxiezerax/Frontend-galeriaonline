// src/ui/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { fetchProductos } from "../../lib/api";
import { useCart } from "../CartProvider"; // Importar el hook

function Products() {
  const { addToCart } = useCart(); // Obtener función del contexto
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(""); // Para mensajes de confirmación

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await fetchProductos();
        setProductos(datos);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos. Asegúrate de que el backend esté corriendo.");
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  const handleAddToCart = (producto) => {
    addToCart(producto);
    
    // Mostrar mensaje temporal
    setMensaje(`"${producto.nombre}" agregado al carrito!`);
    setTimeout(() => setMensaje(""), 3000); // Desaparecer después de 3 segundos
    
    // También opcional: scroll suave para ver el mensaje
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cargando) return <p className="text-center p-5">Cargando obras...</p>;
  if (error) return <div className="alert alert-danger p-5 text-center">{error}</div>;

  return (
    <main className="py-4">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">Galería de Obras</h1>
      
      {/* Mensaje de confirmación */}
      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {mensaje}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMensaje("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map((p) => {
          const precioNumber =
            typeof p.precio === "number" ? p.precio : Number(p.precio) || 0;

          return (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-lg border-0 product-card">
                <div className="product-image-container">
                  <img
                    src={p.imagenUrl || "/placeholder-image.jpg"}
                    className="card-img-top product-image"
                    alt={p.nombre}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate fw-bold">{p.nombre}</h5>
                  <p className="card-subtitle mb-2 text-muted fst-italic">{p.autor}</p>
                  <p className="card-text flex-grow-1 text-secondary small">
                    {p.descripcion || "Sin descripción"}
                  </p>
                 
                  {p.fecha && (
                    <p className="text-muted small mb-1">
                      <i className="bi bi-calendar"></i> {p.fecha}
                    </p>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h4 className="text-danger fw-bolder mb-0">
                      ${precioNumber.toLocaleString("es-CL")}
                    </h4>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(p)}
                    >
                      <i className="bi bi-cart-plus me-1"></i> Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Products;