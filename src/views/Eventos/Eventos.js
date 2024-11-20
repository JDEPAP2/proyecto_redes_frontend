import React, { useState, useEffect, useContext } from "react";
import Navbar from "components/Navbar";
import { FaCalendarAlt, FaSortAlphaUp, FaSortAlphaDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import EventoItem from "./Components/EventoItem";
import CrearEventoDialog from "./Components/CrearEventoDialog"; // Importar diálogo de creación/edición
import { getAllEvents } from "api/Event"; // Importar función para obtener eventos
import { AuthContext } from "contexts/AuthProvider";

export default function Eventos() {
    const { user } = useContext(AuthContext); // Obtener el usuario del contexto
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Fecha");
    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchEventos = async () => {
            if (user?.id) {
                try {
                    const data = await getAllEvents(user.id);
                    setEventos(data);
                } catch (error) {
                    console.error("Error al obtener eventos:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchEventos();
    }, [user]);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(eventos.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCreateEvent = () => {
        setSelectedEvento(null);
        setDialogOpen(true);
    };

    const handleEditEvent = (evento) => {
        setSelectedEvento(evento);
        setDialogOpen(true);
    };

    const handleSaveEvent = (nuevoEvento) => {
        if (selectedEvento) {
            setEventos(
                eventos.map((evento) =>
                    evento.id === nuevoEvento.id ? nuevoEvento : evento
                )
            );
        } else {
            setEventos([...eventos, nuevoEvento]);
        }
        setDialogOpen(false);
    };

    const handleDeleteEvent = (id) => {
        setEventos(eventos.filter((evento) => evento.id !== id));
    };

    const filteredEventos = eventos
    .filter((evento) =>
        evento?.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        const aValue = filter === "Fecha" ? new Date(a.fecha_evento) : a.ubicacion?.toLowerCase() || "";
        const bValue = filter === "Fecha" ? new Date(b.fecha_evento) : b.ubicacion?.toLowerCase() || "";

        if (isAscending) {
            return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
    });



    const paginatedEventos = filteredEventos.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8">
                <h1 className="text-5xl font-bold text-blue-800 mb-6">Eventos</h1>

                <input
                    type="text"
                    placeholder="Buscar evento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 mb-4 bg-slate-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />

                <div className="bg-slate-300 p-6 rounded-lg w-full max-w-5xl overflow-y-auto">
                    {/* Filtros y Botón de Crear */}
                    <div className="flex justify-between items-center mb-4">
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

                        <button
                            onClick={handleCreateEvent}
                            className="px-4 py-2 bg-blue-800 font-bold text-white rounded-md hover:bg-blue-700"
                        >
                            Crear Evento
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 pb-4">
                        {loading ? (
                            <p>Cargando eventos...</p>
                        ) : paginatedEventos.length > 0 ? (
                            paginatedEventos.map((evento) => (
                                <EventoItem
                                    key={evento.id}
                                    id={evento.id}
                                    tipo={evento.tipo}
                                    ubicacion={evento.ubicacion}
                                    fecha={evento.fecha_evento}
                                    onEdit={() => handleEditEvent(evento)}
                                />
                            ))
                        ) : (
                            <p>No se encontraron eventos.</p>
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
                            Página {currentPage + 1} de {Math.ceil(filteredEventos.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(filteredEventos.length / itemsPerPage) - 1}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {dialogOpen && (
                    <CrearEventoDialog
                        evento={selectedEvento}
                        onClose={() => setDialogOpen(false)}
                        onSave={handleSaveEvent}
                        onDelete={handleDeleteEvent}
                    />
                )}
            </div>
        </>
    );
}
