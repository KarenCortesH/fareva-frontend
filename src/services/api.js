// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Cambia esta URL si es necesario
// });

// export const getInventories = async () => {
//   try {
//     const response = await API.get('/inventarios');
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener inventarios desde el backend:', error);
//     throw error; // Lanza el error para manejarlo en el frontend
//   }
// };

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getInventories = () => API.get('/inventarios').then((res) => res.data);
export const getInventoryDetails = (id) => API.get(`/inventarios/${id}`).then((res) => res.data);
export const createInventory = (data) => API.post('/inventarios', data);


// Obtener inventarios
export const fetchInventories = async () => {
  const response = await fetch("http://localhost:5000/api/inventarios");
  return await response.json();
};

// Eliminar inventario
export const deleteInventory = async (id) => {
  const response = await fetch(`http://localhost:5000/api/inventarios/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("No se pudo eliminar el inventario");
  }
};

// Obtener detalles de un inventario
export const fetchInventoryDetails = async (id) => {
  const response = await fetch(`http://localhost:5000/api/inventarios/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener los detalles del inventario");
  }
  return await response.json();
};

