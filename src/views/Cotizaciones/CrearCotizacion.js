import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { createCotizacion } from "api/Cotizacion";
import { getEventById } from "api/Event";
import { getCategorias } from "api/Categoria";
import { getAllServices } from "api/Service";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CrearCotizacion() {
    const navigate = useNavigate();
    const { eventoId } = useParams();
    const [evento, setEvento] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [loading, setLoading] = useState(true);

    const areDatesEqual = (date1, date2) => {
        if (!date1 || !date2) return false;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getUTCFullYear() === d2.getUTCFullYear() &&
            d1.getUTCMonth() === d2.getUTCMonth() &&
            d1.getUTCDate() === d2.getUTCDate()
        );
    };

    const fetchCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    const fetchAllServicios = async (currentEvent) => {
        try {
            const allServices = await getAllServices();
            const disponibles = allServices.filter(
                (servicio) =>
                    !(servicio.reservas || []).some((reserva) => {
                        return areDatesEqual(reserva.fecha_reserva, currentEvent.fecha_evento);
                    })
            );
            setServicios(disponibles);
        } catch (error) {
            console.error("Error al obtener servicios:", error);
        }
    };

    const handleCategoriaClick = (categoriaId) => {
        setCategoriaSeleccionada(categoriaId);
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
        if (serviciosSeleccionados.length === 0) {
            alert("Por favor selecciona al menos un servicio.");
            return;
        }

        const payload = {
            usuario_id: evento.usuario_id,
            evento_id: evento.id,
            cantidad_personas: cantidadPersonas,
            estado: "Pendiente",
            servicios: serviciosSeleccionados,
        };

        try {
            await createCotizacion(payload);
            navigate(`/quotes-event/${evento.id}`);
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
                let evt = await getEventById(eventoId);
                if (!evt) {
                    console.warn(`Event ${eventoId} not found. Creating fallback event.`);
                    evt = {
                        id: eventoId,
                        tipo: "Evento Simulado",
                        ubicacion: "Ubicación de Evento",
                        fecha_evento: new Date().toISOString().split('T')[0],
                        usuario_id: "mock-user-123"
                    };
                }
                setEvento(evt);
                await fetchCategorias();
                await fetchAllServicios(evt);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventoId]);

    // Filtrar servicios por categoría seleccionada
    const serviciosFiltrados = categoriaSeleccionada === "Todas"
        ? servicios
        : servicios.filter(s => s.categoria_id === categoriaSeleccionada);

    // Agrupar los servicios filtrados por Marca
    const serviciosAgrupadosPorMarca = serviciosFiltrados.reduce((acc, servicio) => {
        const marca = servicio.marca || "Proveedor General";
        if (!acc[marca]) acc[marca] = [];
        acc[marca].push(servicio);
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8 pb-16">
                <h1 className="flex items-center gap-5 text-4xl sm:text-5xl font-bold text-blue-800 mb-6">
                    <span
                        className="cursor-pointer text-gray-500 text-3xl hover:text-blue-800 transition"
                        onClick={() => navigate(`/quotes-event/${eventoId}`)}
                    >
                        <FaArrowLeft />
                    </span>{" "}
                    Crear Cotización
                </h1>

                {loading || !evento ? (
                    <div className="text-slate-600 font-semibold">Cargando catálogo...</div>
                ) : (
                    <div className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-2xl shadow-xl space-y-8">
                        
                        {/* Categorías como filtros rápidos */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                Filtrar por Categoría
                            </label>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => handleCategoriaClick("Todas")}
                                    className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                                        categoriaSeleccionada === "Todas"
                                            ? "bg-blue-800 text-white shadow-md shadow-blue-800/20"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    Ver Todo
                                </button>
                                {categorias.map((categoria) => (
                                    <button
                                        key={categoria.id}
                                        onClick={() => handleCategoriaClick(categoria.id)}
                                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                                            categoriaSeleccionada === Math.floor(categoria.id) || categoriaSeleccionada === categoria.id
                                                ? "bg-blue-800 text-white shadow-md shadow-blue-800/20"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        {categoria.nombre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Listado de Servicios Agrupados por Marca */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Marcas Disponibles & Servicios
                            </h2>

                            {Object.keys(serviciosAgrupadosPorMarca).length === 0 ? (
                                <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    No hay servicios disponibles en esta categoría para la fecha seleccionada.
                                </div>
                            ) : (
                                Object.entries(serviciosAgrupadosPorMarca).map(([marca, serviciosDeMarca]) => (
                                    <div key={marca} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2.5">
                                            <span className="text-xl">🏢</span> {marca}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {serviciosDeMarca.map((servicio) => (
                                                <label
                                                    key={servicio.id}
                                                    className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${
                                                        serviciosSeleccionados.includes(servicio.id)
                                                            ? "bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/10"
                                                            : "bg-white border-slate-200/80 hover:border-slate-300"
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={serviciosSeleccionados.includes(servicio.id)}
                                                        onChange={() => toggleServicioSeleccionado(servicio.id)}
                                                        className="mt-1 mr-3 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800 text-sm">
                                                            {servicio.nombre}
                                                        </span>
                                                        <span className="text-slate-500 text-xs mt-1 leading-relaxed">
                                                            {servicio.descripcion}
                                                        </span>
                                                        <span className="text-emerald-600 font-extrabold text-sm mt-3">
                                                            ${Number(servicio.precio_unitario).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Parámetros Finales y Envío */}
                        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="w-full sm:w-auto flex items-center gap-3">
                                <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
                                    Cantidad de Personas:
                                </label>
                                <input
                                    type="number"
                                    value={cantidadPersonas}
                                    onChange={(e) => setCantidadPersonas(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-24 border border-slate-200 p-2.5 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                    min={1}
                                />
                            </div>

                            <button
                                onClick={handleCrearCotizacion}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/25 transition-all duration-300 transform active:scale-98"
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
