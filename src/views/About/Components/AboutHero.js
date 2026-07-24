import React from "react";

export default function AboutHero() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">


      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
        Creamos Experiencias <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-400">
          Inolvidables & Mágicas
        </span>
      </h1>

      <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
        En <strong className="text-white font-semibold">Tú Evento</strong>, transformamos ideas en celebraciones extraordinarias. 
        Conectamos a clientes exigentes con las mejores marcas y proveedores del sector para hacer realidad cualquier tipo de evento.
      </p>
    </div>
  );
}
