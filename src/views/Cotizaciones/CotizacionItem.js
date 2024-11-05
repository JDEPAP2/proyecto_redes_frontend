import React from "react";

export default function CotizacionItem({ nombre, fecha, usuario, estado }) {
    const estadoColor =
        estado === "pendiente" ? "bg-yellow-400" :
        estado === "aceptada" ? "bg-green-600" :
        estado === "rechazada" ? "bg-red-600" : "bg-gray-400";

    return (
        <div className="bg-white p-4 rounded-md shadow mb-2 flex justify-between items-center">
            {/* Información principal */}
            <div className="flex flex-col w-full space-y-2">
                <p className="text-slate-400 font-bold text-lg">
                    {usuario} | <span className="text-black text-md font-semibold">{nombre}</span>
                </p>
                <p className="text-gray-600 text-sm">{fecha}</p>
            </div>
            {/* Estado */}
            <div className={`px-5 py-3 rounded-full font-bold text-white ${estadoColor}`}>
                {estado}
            </div>
        </div>
    );
};
