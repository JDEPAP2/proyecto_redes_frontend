const baseURL = 'http://backend.tuevento.co:5000';

async function fetchInstance(endpoint, options = {}) {
    // const token = localStorage.getItem('authToken'); // Desactiva el token temporalmente

    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        ...options.headers,
    };

    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`; // Elimina esta línea temporalmente
    // }

    const config = {
        method: options.method || 'GET',
        headers,
        body: options.body,
    };

    try {
        console.log(config);
        const response = await fetch(`${baseURL}${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json(); // Para obtener el cuerpo del error
            throw new Error(errorData.message || `Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export default fetchInstance;
