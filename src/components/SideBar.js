import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation()?.pathname;
    const navigate = useNavigate();

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

    return (
        <div>
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white text-slate-900 z-40 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex flex-col h-full p-5">
                    <div className="flex flex-col h-full text-xl font-semibold gap-4 p-4">
                        <h2 className="text-2xl font-bold mb-4">Navegación</h2>
                        <div
                            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
                                location === "/home"
                                    ? "border-emerald-500"
                                    : "hover:border-emerald-500 border-transparent"
                            }`}
                            onClick={() => navigate("/home")}
                        >
                            Inicio
                        </div>
                        <div
                            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
                                location === "/service"
                                    ? "border-rose-500"
                                    : "hover:border-rose-500 border-transparent"
                            }`}
                            onClick={() => navigate("/service")}
                        >
                            Servicios
                        </div>
                        <div
                            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
                                location === "/about"
                                    ? "border-yellow-300"
                                    : "hover:border-yellow-300 border-transparent"
                            }`}
                            onClick={() => navigate("/about")}
                        >
                            Nosotros
                        </div>
                    </div>
                    <div className="flex justify-center w-full" id="example-navbar-warning">
                        <button className="bg-blue-700 hover:bg-blue-800 text-xl text-white font-bold px-5 py-3 rounded-full shadow-lg"
                            >
                            CONTÁCTANOS
                        </button>
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