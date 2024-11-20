import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EventoItem({ id, tipo, ubicacion, fecha, onEdit }) {
    const navigate = useNavigate()
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold text-blue-800">{ubicacion}</h2>
                <p className="text-sm font-semibold text-gray-700">{tipo}</p>
                <p className="text-base text-gray-600">
                    {new Date(fecha).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>
            <span>
                <button
                    onClick={()=>navigate(`/quotes-event/${id}`)}
                    className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                >
                    <FaEye></FaEye>
                </button>
                <button
                    onClick={onEdit}
                    className="px-4 py-2 text-blue-800"
                >
                    <FaPen></FaPen>
                </button>            
            </span>
        </div>
    );
}
