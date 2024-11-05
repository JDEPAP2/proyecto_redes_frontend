import React from "react";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";

export default function About() {
    return (
        <>
          <Navbar/>
          <div className="w-full min-h-screen relative">
            <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
      
            <div className="absolute z-10 w-full h-full inset-0 flex flex-col items-center justify-center">
              <h1 className="text-5xl w-120 text-center font-bold text-emerald-100 mb-10">Sobre Nosotros</h1>
              
              <div className="bg-emerald-300 backdrop-blur-xl bg-opacity-20 w-full max-w-3xl p-10 md:p-16 rounded-xl shadow-lg mx-4 text-center">
              <p className="text-white text-lg leading-relaxed mb-6">
                  En Tu Evento, somos apasionados por crear experiencias únicas. Desde eventos corporativos hasta celebraciones personales, nuestro equipo de expertos se dedica a diseñar y coordinar cada detalle para garantizar que tu evento sea memorable. Con años de experiencia en la industria de eventos, hemos trabajado con clientes de todo tipo, ofreciendo soluciones creativas y personalizadas que se adaptan a tus necesidades.
                </p>
                <p className="text-white text-lg leading-relaxed">
                  Nuestro compromiso con la excelencia y la atención al cliente es lo que nos distingue. Creemos que cada evento es una oportunidad para crear momentos especiales que las personas recordarán para siempre. Ya sea que necesites una planificación completa o solo una mano amiga en ciertos aspectos, estamos aquí para hacer que todo sea perfecto.
                </p>
              </div>
          </div>
          </div>
        </>
    );
}
