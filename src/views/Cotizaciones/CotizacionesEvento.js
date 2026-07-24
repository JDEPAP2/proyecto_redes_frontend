import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import CotizacionItem from "./Components/CotizacionItem";
import { getCotizacionesByEvento } from "api/Cotizacion";
import { useNavigate, useParams } from "react-router-dom";
import CotizacionEventoItem from "./Components/CotizacionEventoItem";
import { deleteCotizacion } from "api/Cotizacion";

export default function CotizacionesEvento() {
    const navigate = useNavigate();
    const { eventoId } = useParams();
    const [cotizaciones, setCotizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchCotizaciones = async () => {
            try {
                const data = await getCotizacionesByEvento(eventoId);
                setCotizaciones(data);
            } catch (error) {
                console.error("Error al obtener cotizaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCotizaciones();
    }, [eventoId]);

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

    const createBttn = () => {
        navigate(`/quote/${eventoId}`)
    }


    const handleDeleteCotizacion = async (cotizacionId) => {
        try {
            await deleteCotizacion(cotizacionId);
            alert("Cotización eliminada con éxito.");

            setCotizaciones((prev) =>
                prev.filter((cotizacion) => cotizacion.id !== cotizacionId)
            );
        } catch (error) {
            console.error("Error al eliminar la cotización:", error);
            alert("Hubo un error al eliminar la cotización.");
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
                
                <h1 className="flex items-center gap-5 text-5xl font-bold text-blue-800 mb-6">
                    <span className="cursor-pointer text-gray-500 text-3xl" onClick={()=>navigate(`/events`)}> <FaArrowLeft></FaArrowLeft></span>  Cotizaciones del Evento
                </h1>

                {loading ? (
                    <p>Cargando cotizaciones...</p>
                ) : (
                    <>
                        <div className="bg-slate-300 p-6 rounded-lg w-full max-w-5xl overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-blue-800">
                                    Lista de Cotizaciones
                                </h2>
                                <button
                                    onClick={createBttn}
                                    className="px-4 py-2 bg-blue-800 font-bold text-white rounded-md hover:bg-blue-700"
                                >
                                    <FaPlus className="inline mr-2" />
                                    Crear Cotización
                                </button>
                            </div>

                            <div className="flex flex-col space-y-4 pb-4">
                                {paginatedCotizaciones.map((cotizacion) => (
                                    <CotizacionEventoItem
                                        key={cotizacion.id}
                                        cotizacion={cotizacion}
                                        onDelete={handleDeleteCotizacion}
                                    />
                                ))}
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
                                    Página {currentPage + 1} de{" "}
                                    {Math.ceil(cotizaciones.length / itemsPerPage)}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(cotizaciones.length / itemsPerPage) - 1
                                    }
                                    className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <br></br>
            <br></br>
        </>
    );
}
