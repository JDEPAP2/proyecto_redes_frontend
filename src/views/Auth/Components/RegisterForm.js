import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";
import AuthTabs from "./AuthTabs";

export default function RegisterForm({ activeRole = "cliente", onRoleChange }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleRegister } = useContext(AuthContext);

    // Initial role preselected from navigation state or prop
    const initialRole = location.state?.role || (activeRole === "marca" ? "administrador" : "cliente");

    const [formData, setFormData] = useState({
        rol: initialRole,
        nombre: "",
        email: "",
        telefono: "",
        clave_usuario: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const targetRol = activeRole === "marca" ? "administrador" : "cliente";
        setFormData((prev) => ({ ...prev, rol: targetRol }));
    }, [activeRole]);

    const isCliente = formData.rol === "cliente";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTabChange = (roleKey) => {
        const targetRol = roleKey === "marca" ? "administrador" : "cliente";
        setFormData((prev) => ({ ...prev, rol: targetRol }));
        if (onRoleChange) {
            onRoleChange(roleKey);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { rol, nombre, email, telefono, clave_usuario, confirmPassword } = formData;

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
            setLoading(true);
            await handleRegister(formData);
            if (formData.rol === "administrador") {
                navigate("/services");
            } else {
                navigate("/events");
            }
        } catch (err) {
            setError(err.message || "Error: No se pudo completar el registro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 sm:p-10 w-full max-w-md transition-all duration-300">
                {/* Tabs de selección de rol */}
                <AuthTabs
                    activeRole={isCliente ? "cliente" : "marca"}
                    onTabChange={handleTabChange}
                />

                {/* Cabecera dinámica */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Crea tu Cuenta
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Regístrate como <span className="font-semibold text-slate-700">{isCliente ? "Cliente" : "Marca"}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            {isCliente ? "Nombre Completo" : "Nombre de la Marca / Empresa"}
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder={isCliente ? "Ej. Juan Pérez" : "Ej. Eventos & Co"}
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="tuemail@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Teléfono / Contacto
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="+57 300 000 0000"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="clave_usuario"
                            placeholder="••••••••"
                            value={formData.clave_usuario}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 tracking-wider uppercase">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg transition-all duration-300 transform active:scale-98 mt-2 ${
                            isCliente
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25"
                                : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-500/25"
                        } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Creando cuenta..." : isCliente ? "Registrarme como Cliente" : "Registrarme como Marca"}
                    </button>
                </form>

                <div className="mt-5 text-center border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-500">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className={`font-bold hover:underline transition ${
                                isCliente ? "text-blue-700" : "text-emerald-700"
                            }`}
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
