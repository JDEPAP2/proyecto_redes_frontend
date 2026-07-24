import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation()?.pathname;
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                toggleSidebar();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen, toggleSidebar]);

    const handleNavigate = (path) => {
        navigate(path);
        toggleSidebar();
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate("/login");
        toggleSidebar();
    };

    const isBrand = user && user.rol === "administrador";
    const isClient = user && user.rol === "cliente";

    return (
        <div>
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white text-slate-900 z-40 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out shadow-2xl`}
            >
                <div className="flex flex-col h-full p-5 justify-between">
                    <div className="flex flex-col text-xl font-semibold gap-4 p-2">
                        <h2 className="text-xl font-black mb-4 uppercase tracking-wider text-slate-400">Navegación</h2>
                        
                        <div
                            className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                location === "/"
                                    ? "border-emerald-500 font-bold"
                                    : "hover:border-emerald-500 border-transparent text-slate-600"
                            }`}
                            onClick={() => handleNavigate("/")}
                        >
                            Inicio
                        </div>

                        {/* Enlaces Públicos (Invitados) */}
                        {!user && (
                            <>
                                <div
                                    className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                        location === "/about"
                                            ? "border-emerald-500 font-bold"
                                            : "hover:border-emerald-500 border-transparent text-slate-600"
                                    }`}
                                    onClick={() => handleNavigate("/about")}
                                >
                                    Nosotros
                                </div>
                                <div
                                    className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                        location === "/pricing"
                                            ? "border-emerald-500 font-bold"
                                            : "hover:border-emerald-500 border-transparent text-slate-600"
                                    }`}
                                    onClick={() => handleNavigate("/pricing")}
                                >
                                    Precios
                                </div>
                            </>
                        )}

                        {/* Enlaces de Marca */}
                        {isBrand && (
                            <>
                                <div
                                    className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                        location === "/services"
                                            ? "border-emerald-500 font-bold"
                                            : "hover:border-emerald-500 border-transparent text-slate-600"
                                    }`}
                                    onClick={() => handleNavigate("/services")}
                                >
                                    Servicios
                                </div>
                                <div
                                    className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                        location === "/quotes"
                                            ? "border-emerald-500 font-bold"
                                            : "hover:border-emerald-500 border-transparent text-slate-600"
                                    }`}
                                    onClick={() => handleNavigate("/quotes")}
                                >
                                    Cotizaciones
                                </div>
                            </>
                        )}

                        {/* Enlaces de Cliente */}
                        {isClient && (
                            <div
                                className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                    location === "/events"
                                        ? "border-emerald-500 font-bold"
                                        : "hover:border-emerald-500 border-transparent text-slate-600"
                                }`}
                                onClick={() => handleNavigate("/events")}
                            >
                                Eventos
                            </div>
                        )}

                        {/* Enlace Perfil */}
                        {user && (
                            <div
                                className={`border-b-2 cursor-pointer transition ease-in-out delay-75 w-max text-base py-1 ${
                                    location.startsWith("/user/")
                                        ? "border-emerald-500 font-bold"
                                        : "hover:border-emerald-500 border-transparent text-slate-600"
                                }`}
                                onClick={() => handleNavigate(`/user/${user.id}`)}
                            >
                                Perfil
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 w-full" id="example-navbar-warning">
                        {user ? (
                            <button
                                onClick={handleLogoutClick}
                                className="bg-red-600 hover:bg-red-700 text-sm text-white font-bold px-5 py-3.5 rounded-xl shadow-lg transition"
                            >
                                CERRAR SESIÓN
                            </button>
                        ) : (
                            <button
                                onClick={() => handleNavigate("/login")}
                                className="bg-blue-700 hover:bg-blue-800 text-sm text-white font-bold px-5 py-3.5 rounded-xl shadow-lg transition"
                            >
                                INICIAR SESIÓN
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}