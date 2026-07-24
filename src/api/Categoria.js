import getAxiosInstance from 'utils/axiosInstance';

const MOCK_CATEGORIES = [
  { id: "cat-1", nombre: "Comida & Catering" },
  { id: "cat-2", nombre: "Audio & Luces" },
  { id: "cat-3", nombre: "Fotografía & Video" },
  { id: "cat-4", nombre: "Decoración & Estilo" }
];

export const getCategorias = async () => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.get('/categoria');
    return response.data;
  } catch (error) {
    console.warn("Category API offline. Utilizando categorías simuladas (quemadas).");
    return MOCK_CATEGORIES;
  }
};

export const getCategoriaById = async (categoriaId) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.get(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.warn("Category API offline. Utilizando categoría simulada.");
    return MOCK_CATEGORIES.find(c => c.id === categoriaId) || MOCK_CATEGORIES[0];
  }
};

export const createCategoria = async (data) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.post('/categoria', data);
    return response.data;
  } catch (error) {
    console.warn("Category API offline. Creada categoría simulada.");
    return { ...data, id: `cat-${Date.now()}` };
  }
};

export const updateCategoria = async (categoriaId, data) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.put(`/categoria/${categoriaId}`, data);
    return response.data;
  } catch (error) {
    console.warn("Category API offline. Actualizada categoría simulada.");
    return { ...data, id: categoriaId };
  }
};

export const deleteCategoria = async (categoriaId) => {
  try {
    const axiosCategoria = getAxiosInstance('servicio');
    const response = await axiosCategoria.delete(`/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.warn("Category API offline. Eliminada categoría simulada.");
    return { success: true };
  }
};
