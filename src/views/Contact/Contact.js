import React from "react";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import ContactInfoCard from "./Components/ContactInfoCard";
import ContactForm from "./Components/ContactForm";

export default function Contact() {
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">


            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Ponte en <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                Contacto con Nosotros
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              ¿Tienes una duda, proyecto o sugerencia? Déjanos un mensaje o contáctanos directamente a través de nuestros canales oficiales.
            </p>
          </div>

          {/* Contact Grid: Direct Info + Interactive Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <ContactInfoCard />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}