import React from "react";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import AboutHero from "./Components/AboutHero";
import AboutCard from "./Components/AboutCard";

export default function About() {
  const cards = [
    {
      title: "Nuestra Misión",
      description:
        "Diseñar, coordinar y facilitar la realización de eventos espectaculares con estándares de excelencia, haciendo que la planificación sea sencilla, rápida y libre de estrés.",
      accentColor: "emerald",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Nuestra Visión",
      description:
        "Convertirnos en la plataforma líder e indispensable en la industria de eventos, conectando usuarios con proveedores calificados y tecnología innovadora a nivel nacional.",
      accentColor: "blue",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "Nuestros Valores",
      description:
        "Compromiso inquebrantable con la calidad, transparencia en cada cotización, creatividad sin límites y atención humana enfocada en tus momentos especiales.",
      accentColor: "emerald",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <div className="relative flex-1 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-40 contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 backdrop-blur-sm" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-12">
          {/* Hero Component */}
          <AboutHero />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <AboutCard key={index} {...card} />
            ))}
          </div>

          {/* Banner de Llamado a la Acción */}
          <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900/60 to-blue-900/40 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-md shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ¿Listo para dar vida a tu próximo evento?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              Ponte en contacto con nuestro equipo de expertos y permítenos ayudarte a planificar una experiencia verdaderamente inolvidable.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
