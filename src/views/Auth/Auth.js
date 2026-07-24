import React, { useState } from "react";
import Navbar from "components/Navbar.js";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import bg from "assets/img/Bg.png";

export default function Auth({ isRegister }) {
  const [activeRole, setActiveRole] = useState("cliente");

  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

  const isCliente = activeRole === "cliente";

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <div className="relative flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Ambient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-50 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/80 to-blue-950/60 backdrop-blur-sm" />
        </div>

        {/* Floating Ambient Decorative Orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Mensaje de Marca / Experiencia */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left px-4">


            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Organiza tus eventos <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                {isCliente ? "sin complicaciones." : "y haz crecer tu marca."}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              {isCliente
                ? "¿Necesitas una cotización rápida? Contáctanos y te daremos una estimación personalizada basada en tus necesidades. Descubre proveedores de confianza para eventos inolvidables."
                : "Publica tus servicios, gestiona solicitudes de cotización de clientes en tiempo real y expande el alcance de tu empresa en nuestra red especializada."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {isCliente ? "+500" : "+120"}
                </div>
                <div className="text-xs text-slate-300">
                  {isCliente ? "Eventos Organizados" : "Marcas Registradas"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  100%
                </div>
                <div className="text-xs text-slate-300">
                  Respuesta Segura & Rápida
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Formulario de Auth */}
          <div className="lg:col-span-6 flex justify-center">
            {isRegister ? (
              <RegisterForm
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
            ) : (
              <LoginForm
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
