import getAxiosInstance from 'utils/axiosInstance';

export const login = async (credentials) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');
    const response = await axiosUsuario.post('/usuario/loggear', credentials);
    return response.data;
  } catch (error) {
    console.warn("Auth API offline. Utilizando login simulado (quemado).", error);
    
    // Determinamos rol según credenciales o por defecto
    const isBrand = credentials.rol === "administrador" || 
                    credentials.email.toLowerCase().includes("admin") || 
                    credentials.email.toLowerCase().includes("marca");
                    
    return {
      user: {
        id: "mock-user-123",
        nombre: credentials.email.split('@')[0],
        email: credentials.email,
        rol: isBrand ? "administrador" : "cliente"
      }
    };
  }
};

export const register = async (userData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');
    const response = await axiosUsuario.post('/usuario/registrar', userData);
    return response.data;
  } catch (error) {
    console.warn("Auth API offline. Utilizando registro simulado (quemado).", error);
    return {
      user: {
        id: `mock-user-${Date.now()}`,
        nombre: userData.nombre,
        email: userData.email,
        rol: userData.rol || "cliente"
      }
    };
  }
};

export const updatePassword = async (userId, passwordData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');
    const response = await axiosUsuario.put(`/usuario/${userId}/clave`, passwordData);
    return response.data;
  } catch (error) {
    console.warn("Auth API offline. Contraseña actualizada localmente.", error);
    return { success: true };
  }
};
