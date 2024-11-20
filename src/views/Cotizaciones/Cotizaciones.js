import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CotizacionItem from "./Components/CotizacionItem";
import { getCotizacion, updateCotizacion } from "api/Cotizacion";

export default function Cotizaciones() {
    const [activeTab, setActiveTab] = useState("Todas");
    const [currentPage, setCurrentPage] = useState(0);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCotizacion, setSelectedCotizacion] = useState(null);
    const [nuevoEstado, setNuevoEstado] = useState("");

    const itemsPerPage = 10;

    useEffect(() => {
        fetchCotizaciones();
    }, [activeTab]);

    const fetchCotizaciones = async () => {
        setLoading(true);
        try {
            const data = await getCotizacion();
            const filteredData =
                activeTab === "Todas"
                    ? data
                    : data.filter((cotizacion) =>
                          cotizacion.estado?.toLowerCase() === activeTab.toLowerCase()
                      );
            setCotizaciones([...filteredData]);
        } catch (error) {
            console.error("Error al obtener las cotizaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(cotizaciones.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (cotizacionId, estadoActual) => {
        setSelectedCotizacion(cotizacionId);
        setNuevoEstado(estadoActual || "pendiente");
        setDialogOpen(true);
    };

    const handleEstadoChange = async () => {
        try {
            await updateCotizacion(selectedCotizacion, { estado: nuevoEstado });
            setCotizaciones((prev) =>
                prev.map((cotizacion) =>
                    cotizacion.id === selectedCotizacion ? { ...cotizacion, estado: nuevoEstado } : cotizacion
                )
            );
            setDialogOpen(false);
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
            alert("Hubo un error al cambiar el estado.");
        }
    };

    const paginatedCotizaciones = cotizaciones.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8">
                <h1 className="text-5xl font-bold text-blue-800 mb-6">Cotizaciones</h1>
                <div className="bg-slate-300 p-6 rounded-lg w-full max-w-5xl overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-white rounded-full p-2 shadow-md flex space-x-2">
                            {["Todas", "Pendiente", "Aceptada", "Rechazada"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 rounded-full font-semibold ${
                                        activeTab === tab ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 pb-4">
                        {loading ? (
                            <p>Cargando cotizaciones...</p>
                        ) : paginatedCotizaciones.length > 0 ? (
                            paginatedCotizaciones.map((cotizacion) => (
                                <CotizacionItem
                                    key={cotizacion.id}
                                    eventId={cotizacion.evento_id}
                                    cantidad={cotizacion.cantidad_personas}
                                    cotizacionId={cotizacion.id}
                                    estado={cotizacion.estado}
                                    onEdit={handleEdit}
                                />
                            ))
                        ) : (
                            <p>No se encontraron cotizaciones.</p>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowLeft />
                        </button>
                        <span>
                            Página {currentPage + 1} de {Math.ceil(cotizaciones.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(cotizaciones.length / itemsPerPage) - 1}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
                {dialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Cambiar Estado</h2>
                            <select
                                value={nuevoEstado}
                                onChange={(e) => setNuevoEstado(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="aceptada">Aceptada</option>
                                <option value="rechazada">Rechazada</option>
                            </select>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                    onClick={handleEstadoChange}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
