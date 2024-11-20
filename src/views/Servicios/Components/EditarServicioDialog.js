import React, { useState, useEffect } from "react";
import CategoriaComboBox from "./CategoriaComboBox";
import { updateService } from "api/Service";

export default function EditarServicioDialog({ servicio, onClose, onSave, onDelete }) {
    const [nombre, setNombre] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (servicio) {
            setNombre(servicio.nombre);
            setCategoriaId(servicio.categoria_id);
            setPrecioUnitario(servicio.precio_unitario);
            setDescripcion(servicio.descripcion);
        }
    }, [servicio]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !categoriaId || !precioUnitario || !descripcion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const updatedServicio = await updateService(servicio.id, {
                nombre,
                categoria_id: categoriaId,
                precio_unitario: parseFloat(precioUnitario),
                descripcion,
            });
            onSave(updatedServicio);
            onClose();
        } catch (error) {
            console.error("Error al actualizar servicio:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
            try {
                onDelete(servicio.id);
                onClose();
            } catch (error) {
                console.error("Error al eliminar servicio:", error);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-blue-800">Editar Servicio</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre del servicio"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                    <CategoriaComboBox categoriaId={categoriaId} setCategoriaId={setCategoriaId} />
                    <input
                        type="number"
                        placeholder="Precio unitario"
                        value={precioUnitario}
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                        >
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
