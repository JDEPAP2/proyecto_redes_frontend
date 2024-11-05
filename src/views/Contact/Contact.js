import Navbar from "components/Navbar";
import React from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import bg from "assets/img/Bg.png";

export default function Contact() {
    return (
        <>
          <Navbar/>
          <div className="w-full min-h-screen relative">
          <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
    
          <div className="absolute z-10 w-full h-full inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl w-120 text-center font-bold text-emerald-100 mb-10">Contacto</h1>
            
            <div className="bg-emerald-300 backdrop-blur-xl bg-opacity-20 w-full max-w-3xl p-10 md:p-16 rounded-xl shadow-lg mx-4 text-center">
                <div className="text-white text-lg leading-relaxed mb-6">
                <p>• Teléfono: (+XX) XXX-XXX-XXXX</p>
                <p>• Correo electrónico: <a href="mailto:contacto@tuevento.com" className="underline">contacto@tuevento.com</a></p>
                <p>• Dirección: Calle del Evento #123, Ciudad, País</p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">Nuestras redes</h3>
                
                <div className="flex justify-center space-x-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 text-white p-4 rounded-full">
                    <FaInstagram size={24} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 text-white p-4 rounded-full">
                    <FaYoutube size={24} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 text-white p-4 rounded-full">
                    <FaTiktok size={24} />
                </a>
                </div>
            </div>
            </div>
        </div>
        </>
      );
    }
    