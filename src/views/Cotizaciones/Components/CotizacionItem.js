import { getEventById } from "api/Event";
import { getUserById } from "api/User";
import React, { useEffect, useState } from "react";

export default function CotizacionItem({ eventId, cotizacionId, cantidad, estado, onEdit }) {
    const [usuario, setUsuario] = useState("");
    const [event, setEvent] = useState("");

    const estadoColor =
        estado === "pendiente" ? "bg-yellow-400" :
        estado === "aceptada" ? "bg-green-600" :
        estado === "rechazada" ? "bg-red-600" : "bg-gray-400";

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const event = await getEventById(eventId);
                const response = await getUserById(event.usuario_id);
                setEvent(event)
                setUsuario(response.nombre);
            } catch (error) {
                console.error("Error al obtener el nombre del usuario:", error);
                setUsuario("Usuario desconocido");
            }
        };

        fetchUsuario();
    }, [eventId]);

    return (
        <div
            className="bg-white p-4 rounded-md shadow mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => onEdit(cotizacionId, estado)}
        >
            <div className="flex flex-col w-full space-y-2">
                <p className="text-slate-400 font-bold text-lg">
                    {usuario} | <span className="text-black text-md font-semibold">
                        {event.ubicacion}</span>
                </p>
                <p className="text-slate-800 font-semibold text-base">
                    Personas: {cantidad}
                </p>
            </div>
            <div className={`px-5 py-3 rounded-full font-bold text-white ${estadoColor}`}>
                {estado}
            </div>
        </div>
    );
}
