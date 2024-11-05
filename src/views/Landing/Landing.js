import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar.js";
import bg from "assets/img/Bg.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen relative">
      <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />

      <div className="absolute z-10 w-full h-full inset-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl w-120 text-center font-bold text-emerald-100 mb-10">Planifica sin complicaciones con Tú Evento</h1>
        
        <div className="bg-emerald-300 backdrop-blur-xl bg-opacity-20 w-full max-w-3xl p-10 md:p-16 rounded-xl shadow-lg mx-4 text-center">
          <p className="text-white font-semibold text-lg leading-relaxed">
          Con Tu Evento, organizar cualquier tipo de celebración es más sencillo que nunca. Explora servicios personalizados para bodas, fiestas, eventos corporativos y más. Cotiza, compara y selecciona proveedores en un solo lugar para que cada detalle sea perfecto. Empieza a planificar hoy y convierte tu evento en una experiencia inolvidable.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}




