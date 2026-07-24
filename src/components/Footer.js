import React from "react";
import { ReactComponent as Logo2 } from '../assets/svg/Logo White Text.svg';
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";


export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="relative z-40 bg-gradient-to-br from-blue-700 to-blue-900 pt-8 pb-6">
      <div
            className="bottom-auto top-0.5 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >

              </svg>
            </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex 
             text-3xl font-semibold text-emerald-100 mb-3 sm:justify-start justify-center">
              <div className="w-100 flex flex-wrap sm:justify-start justify-center gap-2">
                <img className="w-32" src={logo}></img>
                <span className="text-5xl sm:text-start text-center">Turbas y Sustratos Garfema S.L</span>
              </div>
            </div>
            <h5 className="text-lg mt-10 mb-5 text-white">
              Estructuramos vehículos de inversión seguros con garantías reales para inversión de capital propio, de amigos, familiares y clientes.
            </h5>

          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-emerald-100 text-xl font-semibold mb-2">
                Enlaces útiles
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-white hover:text-emerald-500 cursor-pointer font-semibold block pb-2 text-lg"
                        onClick={()=>navigate("/about")}>Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a className="text-white hover:text-emerald-500 cursor-pointer font-semibold block pb-2 text-lg"
                        onClick={()=>navigate("/service")}>Nuestros Servicios
                    </a>
                  </li>
                  <li>
                    <a className="text-white hover:text-emerald-500 cursor-pointer font-semibold block pb-2 text-lg"
                       >Contáctenos
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-white font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}Tailwind Starter Kit by{" "}
              <a
                href="https://www.instagram.com/jdepap2" target="_blank"
                className="text-white block hover:text-emerald-500"
              >
                JDEPAP2.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
