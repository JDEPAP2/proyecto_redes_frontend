import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar.js";
import bg from "assets/img/Bg.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <div className="relative flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-45 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90 backdrop-blur-sm" />
        </div>

        {/* Decorative Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 px-4">
          {/* Main Title with modern gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto">
            Planifica sin complicaciones con <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
              Tú Evento
            </span>
          </h1>

          {/* Description Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">
              Con <strong>Tu Evento</strong>, organizar cualquier tipo de celebración es más sencillo que nunca. 
              Explora servicios personalizados para bodas, fiestas, eventos corporativos y más. 
              Cotiza, compara y selecciona proveedores en un solo lugar para que cada detalle sea perfecto. 
              Empieza hoy y convierte tu evento en una experiencia inolvidable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/25 transition-all duration-300 transform active:scale-95"
            >
              Comenzar Ahora
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all duration-300 transform active:scale-95"
            >
              Ver Planes y Precios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
