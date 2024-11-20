import React, { useState, useEffect } from "react";
import { getCategorias, createCategoria } from "api/Categoria";

export default function CategoriaComboBox({ categoriaId, setCategoriaId }) {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    const handleAgregarCategoria = async () => {
        if (nuevaCategoria.trim()) {
            try {
                const nueva = await createCategoria({ nombre: nuevaCategoria });
                setCategorias([...categorias, nueva]);
                setCategoriaId(nueva.id); // Selecciona automáticamente la nueva categoría
                setNuevaCategoria("");
            } catch (error) {
                console.error("Error al agregar categoría:", error);
            }
        }
    };

    return (
        <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Categoría</label>
            {loading ? (
                <p>Cargando categorías...</p>
            ) : (
                <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            )}
            <div className="flex items-center mt-2 space-x-2">
                <input
                    type="text"
                    placeholder="Nueva categoría"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
                <button
                    type="button"
                    onClick={handleAgregarCategoria}
                    className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}
