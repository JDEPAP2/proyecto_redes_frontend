import React, { useState } from "react";
import Navbar from "components/Navbar";
import { FaCalendarAlt, FaSortAlphaUp, FaSortAlphaDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CotizacionItem from "./CotizacionItem";

export default function Cotizaciones() {
    const [activeTab, setActiveTab] = useState("Todas");
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Fecha");
    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const cotizaciones = Array.from({ length: 30 }, (_, index) => ({
        nombre: `Evento de Ejemplo ${index + 1}`,
        usuario: "Test@gmail.com",
        fecha: "22 de Noviembre, 2024",
        estado: index % 3 === 0 ? "pendiente" : index % 3 === 1 ? "aceptada" : "rechazada"
    }));

    const itemsPerPage = 10;
    const totalPages = Math.ceil(cotizaciones.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8">
                {/* Título */}
                <h1 className="text-5xl font-bold text-blue-800 mb-6">Cotizaciones</h1>

                {/* Buscador */}
                <input
                    type="text"
                    placeholder="Buscar cotización..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 mb-4 bg-slate-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />

                {/* Bandeja de Cotizaciones */}
                <div className="bg-slate-300 p-6 rounded-lg w-full max-w-5xl overflow-y-auto">
                    {/* Filtros y Tabs */}
                    <div className="flex justify-between items-center mb-4">
                        {/* Filtros */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setFilter("Fecha")}
                                className={`flex items-center space-x-1 ${filter === "Fecha" ? "text-blue-800 font-semibold" : "text-gray-600"}`}
                            >
                                <FaCalendarAlt />
                                <span>Fecha</span>
                                <span onClick={toggleSortOrder} className="cursor-pointer">
                                    {isAscending ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                                </span>
                            </button>
                            <button
                                onClick={() => setFilter("Alfabético")}
                                className={`flex items-center space-x-1 ${filter === "Alfabético" ? "text-blue-800 font-semibold" : "text-gray-600"}`}
                            >
                                <span>Alfabético</span>
                                <span onClick={toggleSortOrder} className="cursor-pointer">
                                    {isAscending ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                                </span>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-full p-2 shadow-md flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${activeTab === "Todas" ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600"}`}
                                onClick={() => setActiveTab("Todas")}
                            >
                                Todas
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${activeTab === "Pendientes" ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600"}`}
                                onClick={() => setActiveTab("Pendientes")}
                            >
                                Pendientes
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${activeTab === "Aceptada" ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600"}`}
                                onClick={() => setActiveTab("Aceptada")}
                            >
                                Aceptadas
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full font-semibold ${activeTab === "Rechazada" ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600"}`}
                                onClick={() => setActiveTab("Rechazada")}
                            >
                                Rechazadas
                            </button>
                        </div>
                    </div>

                    {/* Items de Cotizaciones en columna */}
                    <div className="flex flex-col space-y-4 pb-4">
                        {cotizaciones.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((cotizacion, index) => (
                            <div key={index} className="w-full">
                                <CotizacionItem
                                    nombre={cotizacion.nombre}
                                    usuario={cotizacion.usuario}
                                    fecha={cotizacion.fecha}
                                    estado={cotizacion.estado}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowLeft/>
                        </button>
                        <span>Página {currentPage + 1} de {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowRight/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
