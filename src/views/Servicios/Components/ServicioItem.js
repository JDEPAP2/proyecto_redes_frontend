import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

export default function ServicioItem({ id, nombre, descripcion, valor, onEdit, onDelete }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
            <div>
                <h2 className="text-lg font-bold text-blue-800">{nombre}</h2>
                <p className="text-sm text-gray-600">{descripcion}</p>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-xl text-gray-700 font-semibold">{valor}</p>
                <div className="flex flex-col gap-5">
                    <button
                        onClick={onEdit}
                        className="text-blue-800 hover:text-blue-700"
                    >
                        <FaPen></FaPen>
                    </button>
                    <hr></hr>
                    <button
                        onClick={() => onDelete(id)}
                        className="text-red-600 hover:text-red-700"
                    >
                        <FaTrash></FaTrash>
                    </button>
                </div>
            </div>
        </div>
    );
}
