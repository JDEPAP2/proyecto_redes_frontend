import getAxiosInstance from 'utils/axiosInstance';

export const getUserById = async (userId) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');
    const response = await axiosUsuario.get(`/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.warn("User API offline. Utilizando datos simulados (quemados) del perfil.");
    // Devolvemos el usuario del localStorage o uno por defecto
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : {
      id: userId,
      nombre: "Usuario Demo",
      email: "demo@tuevento.com",
      telefono: "+57 300 000 0000",
      rol: "cliente"
    };
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const axiosUsuario = getAxiosInstance('usuario');
    const response = await axiosUsuario.put(`/usuario/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.warn("User API offline. Perfil de usuario actualizado localmente.");
    const localUser = localStorage.getItem('user');
    const currentUser = localUser ? JSON.parse(localUser) : {};
    const updatedUser = { ...currentUser, ...profileData, id: userId };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  }
};
