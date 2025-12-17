// src/lib/api.js

const API_BASE = 'http://localhost:8081/api';

// Función para obtener headers con autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
};

// PRODUCTOS
export const fetchProductos = async () => {
  try {
    const response = await fetch(`${API_BASE}/productos`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error al cargar productos');
    return await response.json();
  } catch (error) {
    console.error('Error en fetchProductos:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await fetch(`${API_BASE}/productos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return await response.json();
  } catch (error) {
    console.error('Error en crearProducto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_BASE}/productos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/productos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return response.ok;
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    throw error;
  }
};

// FARMACIAS
export const fetchFarmaciasHoy = async () => {
  try {
    const response = await fetch(`${API_BASE}/farmacias`);
    if (!response.ok) throw new Error('Error al cargar farmacias');
    return await response.json();
  } catch (error) {
    console.error('Error en fetchFarmaciasHoy:', error);
    return [];
  }
};

// AUTENTICACIÓN
export const login = async (credenciales) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    });
    if (!response.ok) throw new Error('Error en login');
    return await response.json();
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const register = async (usuario) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error('Error en registro');
    return await response.json();
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};

// Verificar token
export const verificarToken = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;
    
    // Aquí podrías hacer una petición para verificar el token
    // Por ahora solo verificamos que exista
    return !!token;
  } catch (error) {
    console.error('Error en verificarToken:', error);
    return false;
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
};