import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";

function RegisterForm() {
    const navigate = useNavigate();
    const { handleRegister } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        rol: "",
        nombre: "",
        email: "",
        telefono: "",
        clave_usuario: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { rol, nombre, email, telefono, clave_usuario, confirmPassword } = formData;

        // Validations
        if (!rol || !nombre || !email || !telefono || !clave_usuario || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, introduce un email válido.");
            return;
        }

        if (clave_usuario !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await handleRegister(formData);
            navigate("/home"); // Redirect to the home page or desired route
        } catch (err) {
            setError(err.message??"Error: No se pudo completar el registro.");
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="container mx-auto px-10 py-16 flex flex-col p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-blue-800 font-bold text-3xl text-center mb-6">REGISTRARSE</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <select
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="" disabled>Seleccione un rol</option>
                            <option value="administrador">Administrador</option>
                            <option value="cliente">Cliente</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="clave_usuario"
                            placeholder="Contraseña"
                            value={formData.clave_usuario}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <button className="bg-blue-800 text-white font-semibold w-full py-3 rounded-xl hover:bg-blue-700 transition duration-300">
                        Registrarse
                    </button>

                    <p className="text-center text-gray-500 mt-4">
                        ¿Ya tienes cuenta? <a className="cursor-pointer hover:underline" onClick={() => navigate("/login")}>Inicia sesión</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
