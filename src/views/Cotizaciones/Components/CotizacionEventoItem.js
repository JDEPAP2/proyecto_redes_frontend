import { getServicesByCotizacion } from "api/Cotizacion";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function CotizacionEventoItem({ cotizacion, onDelete }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [servicios, setServicios] = useState([]);
    const [loadingServicios, setLoadingServicios] = useState(true);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                setLoadingServicios(true);
                const serviciosData = await getServicesByCotizacion(cotizacion.id);
                setServicios(serviciosData);
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
            } finally {
                setLoadingServicios(false);
            }
        };

        fetchServicios();
    }, [cotizacion.id]);

    const handleDelete = () => {
        onDelete(cotizacion.id);
        setDialogOpen(false);
    };

    return (
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <div>
                <h3 className="text-lg font-bold">
                    | Cantidad de personas: {cotizacion.cantidad_personas}
                </h3>
                <p className="text-sm text-gray-600">
                    Valor total: ${Number(cotizacion.precio_total).toFixed(2)}
                </p>
                <ul className="mt-2">
                    <p className="font-semibold">Servicios:</p>
                    {loadingServicios ? (
                        <p className="text-gray-500 text-sm">Cargando servicios...</p>
                    ) : servicios.length > 0 ? (
                        servicios.map((servicio) => (
                            <li key={servicio.id} className="text-gray-600 text-sm">
                                - {servicio.nombre}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No hay servicios asociados.</p>
                    )}
                </ul>
            </div>

            <div className="flex flex-col gap-2 items-end">
                <span
                    className={`px-4 py-1 rounded-full text-white ${
                        cotizacion.estado?.toLowerCase() === "pendiente"
                            ? "bg-yellow-500"
                            : cotizacion.estado?.toLowerCase() === "aceptada"
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                >
                    {cotizacion.estado}
                </span>
                <button
                    className="mt-2 px-4 py-1 text-red-500 rounded-md hover:text-red-700 transition"
                    onClick={() => setDialogOpen(true)}
                >
                    <FaTrash></FaTrash>
                </button>
            </div>

            {dialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Confirmar eliminación
                        </h2>
                        <p className="mb-4 text-gray-600">
                            ¿Estás seguro de que deseas eliminar esta cotización?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
