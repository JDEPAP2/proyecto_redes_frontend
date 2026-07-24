import React from "react";

export default function PricingHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
        Planes diseñados para <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-400">
          el tamaño de tu evento
        </span>
      </h1>
      
      <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
        Elige la solución que mejor se adapte a tus necesidades. Sin cargos ocultos, cambia o cancela tu suscripción en cualquier momento.
      </p>
    </div>
  );
}
