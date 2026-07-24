import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { FaSortAlphaUp, FaSortAlphaDown, FaArrowLeft, FaArrowRight, FaHashtag, FaEtsy } from "react-icons/fa";
import ServicioItem from "./Components/ServicioItem";
import CrearServicioDialog from "./Components/CrearServicioDialog";
import EditarServicioDialog from "./Components/EditarServicioDialog";
import { getAllServices,deleteService } from "api/Service";

export default function Servicios() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Nombre");
    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const data = await getAllServices();
                setServicios(data);
            } catch (error) {
                console.error("Error al obtener servicios:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServicios();
    }, []);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(servicios.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCreateService = () => {
        setDialogOpen(true);
    };

    const handleEditService = (servicio) => {
        setSelectedServicio(servicio);
        setEditDialogOpen(true);
    };

    const handleSaveService = (nuevoServicio) => {
        setServicios([...servicios, nuevoServicio]);
        setDialogOpen(false);
    };

    const handleUpdateService = (updatedServicio) => {
        setServicios(
            servicios.map((servicio) =>
                servicio.id === updatedServicio.id ? updatedServicio : servicio
            )
        );
        setEditDialogOpen(false);
    };

    const handleDeleteService = async (id) => {
        
        try {
            await deleteService(id);
            setServicios(servicios.filter((servicio) => servicio.id !== id));
        } catch (error) {
            console.error("Error al borrar servicios:", error);
        } finally {
            setLoading(false);
        }

    };

    const filteredServicios = servicios
        .filter((servicio) =>
            servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = filter === "Nombre" ? a.nombre : parseFloat(a.precio_unitario);
            const bValue = filter === "Nombre" ? b.nombre : parseFloat(b.precio_unitario);

            if (isAscending) {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });

    const paginatedServicios = filteredServicios.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8">
                <h1 className="text-5xl font-bold text-blue-800 mb-6">Servicios</h1>

                <input
                    type="text"
                    placeholder="Buscar servicio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 mb-4 bg-slate-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />

                <div className="bg-slate-300 p-6 rounded-lg w-full max-w-5xl overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setFilter("Nombre")}
                                className={`flex items-center space-x-1 ${filter === "Nombre" ? "text-blue-800 font-semibold" : "text-gray-600"}`}
                            >
                                <FaEtsy />
                                <span>Nombre</span>
                                <span onClick={toggleSortOrder} className="cursor-pointer">
                                    {isAscending ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                                </span>
                            </button>
                            <button
                                onClick={() => setFilter("Precio")}
                                className={`flex items-center space-x-1 ${filter === "Precio" ? "text-blue-800 font-semibold" : "text-gray-600"}`}
                            >
                                <FaHashtag />
                                <span>Precio</span>
                                <span onClick={toggleSortOrder} className="cursor-pointer">
                                    {isAscending ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                                </span>
                            </button>
                        </div>

                        <button
                            onClick={handleCreateService}
                            className="px-4 py-2 bg-blue-800 font-bold text-white rounded-md hover:bg-blue-700"
                        >
                            Crear Servicio
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 pb-4">
                        {paginatedServicios.map((servicio) => (
                            <div key={servicio.id} className="w-full">
                                <ServicioItem
                                    id={servicio.id}
                                    nombre={servicio.nombre}
                                    descripcion={servicio.descripcion}
                                    valor={`$${parseFloat(servicio.precio_unitario).toFixed(2)}`}
                                    onEdit={() => handleEditService(servicio)}
                                    onDelete={handleDeleteService}
                                />
                            </div>
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
                            {Math.ceil(filteredServicios.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(filteredServicios.length / itemsPerPage) - 1}
                            className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:bg-gray-400"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {dialogOpen && (
                    <CrearServicioDialog
                        onClose={() => setDialogOpen(false)}
                        onSave={handleSaveService}
                    />
                )}

                {editDialogOpen && selectedServicio && (
                    <EditarServicioDialog
                        servicio={selectedServicio}
                        onClose={() => setEditDialogOpen(false)}
                        onSave={handleUpdateService}
                        onDelete={handleDeleteService}
                    />
                )}
                <br></br>
                <br></br>
            </div>
        </>
    );
}
