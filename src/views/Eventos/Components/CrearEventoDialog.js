import React, { useContext, useState } from "react";
import { createEvent, updateEvent, deleteEvent } from "api/Event";
import { AuthContext } from "contexts/AuthProvider";

export default function CrearEventoDialog({ evento, onClose, onSave, onDelete }) {
    const isEditMode = Boolean(evento);
    const {user} = useContext(AuthContext)
    const [tipo, setTipo] = useState(evento?.tipo || "");
    const [otroTipo, setOtroTipo] = useState(""); // Para el campo "Otro"
    const [fechaEvento, setFechaEvento] = useState(evento?.fecha_evento || "");
    const [ubicacion, setUbicacion] = useState(evento?.ubicacion || "");

    const tiposEvento = [
        "Infantil",
        "15 Años",
        "Baby Shower",
        "Fiesta temática",
        "Boda",
        "Cumpleaños",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tipoFinal = tipo === "Otro" ? otroTipo : tipo;

        if (!tipoFinal || !fechaEvento || !ubicacion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            if (isEditMode) {
                const updatedEvento = await updateEvent(evento.id, {
                    tipo: tipoFinal,
                    fecha_evento: new Date(fechaEvento),
                    ubicacion,
                });
                onSave(updatedEvento);
            } else {
                const newEvento = await createEvent({
                    tipo: tipoFinal,
                    usuario_id: user.id,
                    fecha_evento: new Date(fechaEvento),
                    ubicacion,
                });
                onSave(newEvento);
            }
            onClose();
        } catch (error) {
            console.error("Error al guardar el evento:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
            try {
                await deleteEvent(evento.id);
                onDelete(evento.id);
                onClose();
            } catch (error) {
                console.error("Error al eliminar el evento:", error);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-2/3 max-w-2xl"> {/* Ancho actualizado */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-blue-800">
                    {isEditMode ? "Editar Evento" : "Crear Evento"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4"> {/* Ajuste para más espacio */}
                        {tiposEvento.map((opcion) => (
                            <button
                                key={opcion}
                                type="button"
                                onClick={() => setTipo(opcion)}
                                className={`p-4 rounded-md border-2 ${
                                    tipo === opcion
                                        ? "bg-blue-500"
                                        : "bg-blue-800 text-white"
                                } hover:border-blue-900`}
                            >
                                {opcion}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setTipo("Otro")}
                            className={`p-4 rounded-md border-2 ${
                                tipo === "Otro"
                                    ? "border-blue-800 bg-blue-100"
                                    : "border-gray-300"
                            } hover:border-blue-800`}
                        >
                            Otro
                        </button>
                    </div>

                    {tipo === "Otro" && (
                        <input
                            type="text"
                            placeholder="Escribe el tipo de evento"
                            value={otroTipo}
                            onChange={(e) => setOtroTipo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                        />
                    )}

                    <input
                        type="date"
                        placeholder="Fecha del Evento"
                        value={fechaEvento}
                        onChange={(e) => setFechaEvento(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                    <input
                        type="text"
                        placeholder="Ubicación"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                        >
                            {isEditMode ? "Guardar Cambios" : "Crear Evento"}
                        </button>
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
