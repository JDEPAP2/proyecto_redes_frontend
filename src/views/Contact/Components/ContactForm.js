import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 sm:p-10 w-full">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Envíanos un Mensaje</h3>
      <p className="text-sm text-slate-500 mb-6">
        Completa los campos a continuación y responderemos en menos de 24 horas.
      </p>

      {submitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-emerald-900">¡Mensaje Enviado!</h4>
          <p className="text-sm text-emerald-700">
            Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo muy pronto.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Maria Gómez"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mariagomez@ejemplo.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Ej. Cotización de Evento Corporativo"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos más sobre tu evento o consulta..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25 transition-all duration-300 transform active:scale-98 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Enviando mensaje..." : "Enviar Mensaje"}
          </button>
        </form>
      )}
    </div>
  );
}
