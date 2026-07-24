import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";
import AuthTabs from "./AuthTabs";

export default function LoginForm({ activeRole = "cliente", onRoleChange }) {
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isCliente = activeRole === "cliente";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

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
            setLoading(true);
            await handleLogin({
                email: email,
                clave_usuario: password,
                rol: activeRole === "marca" ? "administrador" : "cliente"
            });
            if (activeRole === "marca") {
                navigate("/services");
            } else {
                navigate("/events");
            }
        } catch (err) {
            setError(err.message || "Credenciales incorrectas o problema de conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 sm:p-10 w-full max-w-md transition-all duration-300">
                {/* Tabs de selección de rol */}
                <AuthTabs activeRole={activeRole} onTabChange={onRoleChange} />

                {/* Cabecera dinámica */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        {isCliente ? "¡Hola de nuevo!" : "Panel de Marca"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {isCliente ? "Ingresa a tu cuenta de cliente" : "Ingresa con tu cuenta corporativa"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tuemail@ejemplo.com"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                                required
                            />
                            <button
                                type="button"
                                tabIndex="-1"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.046 10.046 0 013.682-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243m4.243 4.243L3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg transition-all duration-300 transform active:scale-98 ${
                            isCliente
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25"
                                : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-500/25"
                        } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Iniciando sesión..." : isCliente ? "Iniciar Sesión como Cliente" : "Iniciar Sesión como Marca"}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-slate-100 pt-4">
                    <p className="text-xs text-slate-500">
                        ¿No tienes una cuenta aún?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register", { state: { role: isCliente ? "cliente" : "administrador" } })}
                            className={`font-bold hover:underline transition ${
                                isCliente ? "text-blue-700" : "text-emerald-700"
                            }`}
                        >
                            Regístrate como {isCliente ? "Cliente" : "Marca"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}