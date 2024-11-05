import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "contexts/AuthProvider";

export default function LoginForm() {
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, introduce un email válido.");
            return;
        }

        try {
            console.log(
                {
                    email: email,
                    clave_usuario: password,
                }
            )

            await handleLogin({
                email: email,
                clave_usuario: password,
            });
            navigate("/home"); // Redirect to the home page or desired route
        } catch (err) {
            setError(err.message??"Error: Credenciales incorrectas o problema de red.");
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="container mx-auto px-10 py-16 flex flex-col p-8 bg-white rounded-lg shadow-lg w-full">
                <h1 className="text-blue-800 font-bold text-3xl text-center mb-6">BIENVENIDO</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-200"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                    <button type="submit" className="bg-blue-800 text-white font-semibold w-full py-3 rounded-xl hover:bg-blue-700 transition duration-300">
                        Iniciar Sesión
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4">
                    <a className="cursor-pointer hover:underline" onClick={() => navigate("/register")}>Para registrarte presiona aqui</a>
                </p>
            </div>
        </div>
    );
}