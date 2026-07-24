import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar.js";
import bg from "assets/img/Bg.png";
import { FaUtensils, FaMusic, FaCamera, FaPalette, FaUserPlus, FaBuilding, FaCalculator, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Landing() {
  const navigate = useNavigate();

  const serviciosDestacados = [
    {
      id: 1,
      icon: <FaUtensils className="text-2xl" />,
      title: "Catering Gourmet",
      desc: "Comida de 3 tiempos, buffets tradicionales y chefs privados para bodas y banquetes corporativos.",
      bgClass: "bg-blue-500/10",
      textClass: "text-blue-400",
      glowClass: "shadow-blue-500/10 hover:shadow-blue-500/20"
    },
    {
      id: 2,
      icon: <FaMusic className="text-2xl" />,
      title: "Audio & Iluminación",
      desc: "Luces robóticas, DJ profesional y sistemas de sonido de alta potencia para animar cualquier espacio.",
      bgClass: "bg-indigo-500/10",
      textClass: "text-indigo-400",
      glowClass: "shadow-indigo-500/10 hover:shadow-indigo-500/20"
    },
    {
      id: 3,
      icon: <FaCamera className="text-2xl" />,
      title: "Fotografía & Video",
      desc: "Cobertura artística en 4K, sesiones fotográficas y tomas con drone para inmortalizar tus recuerdos.",
      bgClass: "bg-emerald-500/10",
      textClass: "text-emerald-400",
      glowClass: "shadow-emerald-500/10 hover:shadow-emerald-500/20"
    },
    {
      id: 4,
      icon: <FaPalette className="text-2xl" />,
      title: "Decoración & Estilo",
      desc: "Arreglos florales de temporada y ambientación temática personalizada para interiores y exteriores.",
      bgClass: "bg-teal-500/10",
      textClass: "text-teal-400",
      glowClass: "shadow-teal-500/10 hover:shadow-teal-500/20"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % serviciosDestacados.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, serviciosDestacados.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + serviciosDestacados.length) % serviciosDestacados.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % serviciosDestacados.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-[0.3] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-950/95" />
        </div>

        {/* Decorative Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto">
            Planifica sin complicaciones con <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Tú Evento
            </span>
          </h1>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl">
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">
              Organizar cualquier tipo de celebración es más sencillo que nunca. 
              Explora servicios personalizados para bodas, fiestas, eventos corporativos y más. 
              Cotiza, compara y selecciona proveedores en un solo lugar para que cada detalle sea perfecto. 
              Empieza hoy y convierte tu evento en una experiencia inolvidable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-slate-950 font-bold text-lg bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 hover:opacity-90 shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-98 transition-all duration-300"
            >
              Comenzar Ahora
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-lg bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md hover:scale-[1.02] active:scale-98 transition-all duration-300"
            >
              Ver Planes y Precios
            </button>
          </div>
        </div>
      </div>

      {/* Services Section (Auto-playing Carousel) */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Servicios Destacados
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
              Explora las diversas categorías que los proveedores ofrecen en nuestra plataforma.
            </p>
          </div>

          {/* Carousel Wrapper */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Viewport */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-2xl p-8 sm:p-12">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {serviciosDestacados.map((servicio) => (
                  <div 
                    key={servicio.id} 
                    className="w-full flex-shrink-0 flex flex-col items-center text-center space-y-6 px-4"
                  >
                    <div className={`w-20 h-20 rounded-3xl ${servicio.bgClass} ${servicio.textClass} flex items-center justify-center shadow-lg transition-transform duration-300 scale-100 hover:scale-105`}>
                      {servicio.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {servicio.title}
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                      {servicio.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition active:scale-95 z-20"
              aria-label="Anterior servicio"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition active:scale-95 z-20"
              aria-label="Siguiente servicio"
            >
              <FaChevronRight className="text-sm" />
            </button>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-3 pt-6">
              {serviciosDestacados.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-8 bg-blue-500" : "w-2.5 bg-slate-700 hover:bg-slate-650"
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              ¿Cómo Funciona?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
              Un flujo simple, intuitivo y automatizado para crear el evento de tus sueños.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Paso 1 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                <FaUserPlus className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">1. Regístrate & Crea</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
                Crea tu cuenta de Cliente y registra tu evento definiendo la fecha y la ubicación de la celebración.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                <FaBuilding className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">2. Explora Marcas</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
                Visualiza el catálogo de servicios de forma organizada, agrupados por las marcas reales que los proveen.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                <FaCalculator className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">3. Cotiza al Instante</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
                Elige los servicios que necesites y genera cotizaciones automáticas calculadas de forma inmediata.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-t border-slate-900/55">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Testimonios Reales
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
              Descubre por qué clientes y marcas confían en nosotros para sus eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6">
              <p className="text-slate-300 italic font-light text-base leading-relaxed">
                "Pude planificar la boda de mi hermana en solo una tarde. Poder cotizar los servicios de buffet y decoración agrupados por marcas y obtener los totales de inmediato nos ahorró semanas de llamadas y presupuestos."
              </p>
              <div>
                <h4 className="font-bold text-white">Carolina H.</h4>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Organización de Bodas</p>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6">
              <p className="text-slate-300 italic font-light text-base leading-relaxed">
                "Como marca de audio y luces, Tu Evento nos ha permitido conectar con decenas de nuevos clientes en la región sin esfuerzo. La gestión de cotizaciones y reservas centralizadas simplificó nuestra facturación."
              </p>
              <div>
                <h4 className="font-bold text-white">Alejandro G.</h4>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Director de Sonido Cali Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 text-center text-slate-500 text-sm">
        <p>© 2026 Tú Evento. Todos los derechos reservados. Contacto: jvnwebsolutions@gmail.com</p>
      </footer>
    </div>
  );
}
