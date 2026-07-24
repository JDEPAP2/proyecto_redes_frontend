import React from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function ContactInfoCard() {
  const contactDetails = [
    {
      title: "Teléfono",
      value: "(+57) 304-484-6068",
      href: "tel:+573044846068",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "Correo Electrónico",
      value: "jvnwebsolutions@gmail.com",
      href: "mailto:jvnwebsolutions@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Ubicación Principal",
      value: "Haciendas #123, Cali, Colombia",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Información Directa</h3>
        <p className="text-sm text-slate-300">
          ¿Tienes preguntas o deseas programar una reunión? Escríbenos o visítanos.
        </p>
      </div>

      {/* Lista de Datos */}
      <div className="space-y-4">
        {contactDetails.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                {item.title}
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {item.value}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Redes Sociales */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Síguenos en Redes Sociales
        </h4>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-110 transition-transform duration-300"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20 hover:scale-110 transition-transform duration-300"
          >
            <FaYoutube size={22} />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-12 h-12 rounded-2xl bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <FaTiktok size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
