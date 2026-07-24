import React from "react";

export default function AuthTabs({ activeRole, onTabChange }) {
  const isCliente = activeRole === "cliente";

  return (
    <div className="w-full mb-6">
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
        {/* Tab Cliente */}
        <button
          type="button"
          onClick={() => onTabChange("cliente")}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isCliente
              ? "bg-white text-blue-800 shadow-md shadow-blue-900/10 border border-slate-100"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isCliente ? "text-blue-600" : "text-slate-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Soy un Cliente</span>
        </button>

        {/* Tab Marca */}
        <button
          type="button"
          onClick={() => onTabChange("marca")}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
            !isCliente
              ? "bg-white text-emerald-800 shadow-md shadow-emerald-900/10 border border-slate-100"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              !isCliente ? "text-emerald-600" : "text-slate-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V10m0 0H9m3 0h3m-3 4h3m-3 0H9"
            />
          </svg>
          <span>Soy una Marca</span>
        </button>
      </div>

      {/* Dynamic subtitle hint */}
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500 transition-all duration-300">
          {isCliente
            ? "Accede para planificar, cotizar y gestionar tus eventos favoritos"
            : "Accede al panel corporativo para ofrecer servicios y administrar cotizaciones"}
        </p>
      </div>
    </div>
  );
}
