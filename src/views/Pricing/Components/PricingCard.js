import React from "react";

export default function PricingCard({
  name,
  price,
  period = "/mes",
  description,
  features = [],
  buttonText = "Comenzar ahora",
  popular = false,
}) {
  return (
    <div
      className={`relative group bg-slate-900/60 backdrop-blur-xl border p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
        popular
          ? "border-emerald-500 bg-slate-900/80 ring-2 ring-emerald-500/20"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-emerald-500 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/20">
            Más Popular
          </span>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-xs text-slate-400 mb-6">{description}</p>

        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
          {price !== "Gratis" && <span className="text-sm text-slate-400 font-medium">{period}</span>}
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-slate-300 leading-relaxed font-light">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 transform active:scale-98 ${
          popular
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25"
            : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
