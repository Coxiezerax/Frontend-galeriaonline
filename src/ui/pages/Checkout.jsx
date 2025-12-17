// src/ui/pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../CartProvider';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones básicas
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
    
    if (!formData.codigoPostal.trim()) {
      newErrors.codigoPostal = 'El código postal es requerido';
    } else if (!/^\d{7}$/.test(formData.codigoPostal.replace(/\s/g, ''))) {
      newErrors.codigoPostal = 'Código postal inválido (7 dígitos)';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-]{9,}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }
    
    if (!formData.numeroTarjeta.trim()) {
      newErrors.numeroTarjeta = 'El número de tarjeta es requerido';
    } else if (!/^\d{16}$/.test(formData.numeroTarjeta.replace(/\s/g, ''))) {
      newErrors.numeroTarjeta = 'Tarjeta inválida (16 dígitos)';
    }
    
    if (!formData.vencimiento.trim()) {
      newErrors.vencimiento = 'La fecha de vencimiento es requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.vencimiento)) {
      newErrors.vencimiento = 'Formato MM/AA';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV inválido (3-4 dígitos)';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la llamada real a la API de pago
      console.log('Procesando pago:', formData);
      console.log('Carrito:', cart);
      
      // Mostrar mensaje de éxito
      alert('¡Pago procesado exitosamente! Gracias por tu compra.');
      
      // Limpiar carrito y redirigir
      clearCart();
      navigate('/');
      
    } catch (error) {
      console.error('Error en el pago:', error);
      alert('Hubo un error procesando tu pago. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiration = (value) => {
    return value.replace(/\//g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>Tu carrito está vacío</h4>
          <p>No hay productos para proceder al pago.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Ver Obras
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Información de Pago</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h5 className="mb-3">Información Personal</h5>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="juan@email.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle Principal 123"
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      placeholder="Santiago"
                    />
                    {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Código Postal *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.codigoPostal ? 'is-invalid' : ''}`}
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleChange}
                      placeholder="1234567"
                    />
                    {errors.codigoPostal && <div className="invalid-feedback">{errors.codigoPostal}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>

                <hr className="my-4" />
                
                <h5 className="mb-3">Información de Tarjeta</h5>
                
                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.numeroTarjeta ? 'is-invalid' : ''}`}
                    name="numeroTarjeta"
                    value={formData.numeroTarjeta}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      handleChange({ target: { name: 'numeroTarjeta', value: formatted } });
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.numeroTarjeta && <div className="invalid-feedback">{errors.numeroTarjeta}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Vencimiento *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.vencimiento ? 'is-invalid' : ''}`}
                      name="vencimiento"
                      value={formData.vencimiento}
                      onChange={(e) => {
                        const formatted = formatExpiration(e.target.value);
                        handleChange({ target: { name: 'vencimiento', value: formatted } });
                      }}
                      placeholder="MM/AA"
                      maxLength="5"
                    />
                    {errors.vencimiento && <div className="invalid-feedback">{errors.vencimiento}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV *</label>
                    <input
                      type="password"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="terms" required />
                  <label className="form-check-label" htmlFor="terms">
                    Acepto los términos y condiciones
                  </label>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      `Pagar $${total.toLocaleString('es-CL')}`
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/cart')}
                  >
                    Volver al Carrito
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-light">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              <h6 className="mb-3">Productos ({cart.reduce((sum, item) => sum + item.qty, 0)})</h6>
              
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span className="small">
                    {item.nombre} x{item.qty}
                  </span>
                  <span className="small">
                    ${(Number(item.precio) * item.qty).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Impuestos</span>
                <span>$0</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong className="text-danger fs-5">
                  ${total.toLocaleString('es-CL')}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;