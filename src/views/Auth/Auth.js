import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "components/Navbar.js";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import bg from "assets/img/Bg.png";
import DualTwoContainer from "components/DualTwoContainer";

export default function Auth({ isRegister }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen">
        <img src={bg} alt="Background" className="-z-10 fixed inset-0 h-full w-full object-cover" />
        <main className="flex items-center justify-center h-full">
          <section className="w-full flex items-center justify-center min-h-screen py-20">
            <div className="w-2/3 xl:w-1/3">
                
            </div>
            <DualTwoContainer
                    title="Organiza el evento de tus sueños"
                    content={["¿Necesitas una cotización rápida? Contáctanos y te daremos una estimación personalizada basada en tus necesidades específicas. Nuestro equipo de expertos estará encantado de ayudarte a crear una experiencia inolvidable."]}
                    component={isRegister ? <RegisterForm /> : <LoginForm />}
                />
          </section>
        </main>
      </div>
    </>
  );
}
