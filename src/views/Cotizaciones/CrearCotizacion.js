import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { createCotizacion } from "api/Cotizacion";
import { getEventById } from "api/Event";
import { getCategorias } from "api/Categoria";
import { getServicesByCategory } from "api/Service";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft} from "react-icons/fa";

export default function CrearCotizacion() {
    const navigate = useNavigate();
    const { eventoId } = useParams();
    const [evento, setEvento] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [serviciosPorCategoria, setServiciosPorCategoria] = useState({});
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    const fetchServicios = async (categoriaId) => {
        try {
            const servicios = await getServicesByCategory(categoriaId);



            const areDatesEqual = (date1, date2) => {
                const d1 = new Date(date1);
                const d2 = new Date(date2);
            
                return (
                    d1.getUTCFullYear() === d2.getUTCFullYear() &&
                    d1.getUTCMonth() === d2.getUTCMonth() &&
                    d1.getUTCDate() === d2.getUTCDate()
                );
            };

            const serviciosDisponibles = servicios.filter(
                (servicio) =>
                    !servicio.reservas.some((reserva) => {
                        return areDatesEqual(reserva.fecha_reserva, evento.fecha_evento);
                    })
            );

            setServiciosPorCategoria((prev) => ({
                ...prev,
                [categoriaId]: serviciosDisponibles,
            }));
        } catch (error) {
            console.error("Error al obtener servicios:", error);
        }
    };

    const handleCategoriaClick = (categoriaId) => {
        setCategoriaSeleccionada(categoriaId);
        if (!serviciosPorCategoria[categoriaId]) {
            fetchServicios(categoriaId);
        }
    };

    const toggleServicioSeleccionado = (servicioId) => {
        setServiciosSeleccionados((prev) => {
            const servicioExistente = prev.find((s) => s === servicioId);
            if (servicioExistente) {
                return prev.filter((s) => s !== servicioId);
            }
            return [...prev, servicioId];
        });
    };

    const handleCrearCotizacion = async () => {
        const payload = {
            usuario_id: evento.usuario_id,
            evento_id: evento.id,
            cantidad_personas: cantidadPersonas,
            estado: "Pendiente",
            servicios: serviciosSeleccionados,
        };

        try {
            await createCotizacion(payload);
            navigate(`/quotes-event/${evento.id}`)
            alert("Cotización creada con éxito.");
        } catch (error) {
            console.error("Error al crear cotización:", error);
            alert("Hubo un error al crear la cotización.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const evt = await getEventById(eventoId);
                setEvento(evt);
                await fetchCategorias();
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchData();
    }, [eventoId]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8">
                <h1 className="flex items-center gap-5 text-5xl font-bold text-blue-800 mb-6">
                    <span className="cursor-pointer text-gray-500 text-3xl" onClick={()=>navigate(`/quotes-event/${eventoId}`)}> <FaArrowLeft></FaArrowLeft></span>  Crear Cotización
                </h1>
                {loading || !evento ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
                        {/* Botones de Categorías */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {categorias.map((categoria) => (
                                <button
                                    key={categoria.id}
                                    onClick={() => handleCategoriaClick(categoria.id)}
                                    className={`${
                                        categoriaSeleccionada === categoria.id
                                            ? "bg-blue-400"
                                            : "bg-blue-200"
                                    } hover:bg-blue-400 text-blue-800 font-bold p-4 rounded-lg`}
                                >
                                    {categoria.nombre}
                                </button>
                            ))}
                        </div>

                        {/* Servicios por Categoría */}
                        {categoriaSeleccionada && serviciosPorCategoria[categoriaSeleccionada] && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                                    Servicios de {categorias.find((c) => c.id === categoriaSeleccionada)?.nombre}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {serviciosPorCategoria[categoriaSeleccionada].map((servicio) => (
                                        <label
                                            key={servicio.id}
                                            className="flex items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={serviciosSeleccionados.includes(servicio.id)}
                                                onChange={() => toggleServicioSeleccionado(servicio.id)}
                                                className="mr-2"
                                            />
                                            <span>
                                                {servicio.nombre} - ${Number(servicio.precio_unitario).toFixed(2)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Formulario Final */}
                        <div className="flex flex-col space-y-4 mt-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Cantidad de Personas
                                </label>
                                <input
                                    type="number"
                                    value={cantidadPersonas}
                                    onChange={(e) => setCantidadPersonas(parseInt(e.target.value))}
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                    min={1}
                                />
                            </div>
                            <button
                                onClick={handleCrearCotizacion}
                                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                            >
                                Crear Cotización
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
