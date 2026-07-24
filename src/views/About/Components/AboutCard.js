import React from "react";

export default function AboutCard({ title, description, icon, accentColor = "emerald" }) {
  const isEmerald = accentColor === "emerald";

  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-white/20 p-8 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
          isEmerald
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
        }`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>

      <p className="text-slate-300 text-sm leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}
