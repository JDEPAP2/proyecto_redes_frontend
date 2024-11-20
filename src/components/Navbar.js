import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { AuthContext } from "contexts/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar(props, { children }) {
  const location = useLocation()?.pathname;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="relative flex flex-wrap items-center shadow-md bg-gradient-to-r from-blue-800 to-blue-900 justify-between px-2 py-3">
      <div className="container py-1 px-2 md:px-4 md:mx-auto flex flex-row flex-wrap items-center justify-between">
        <div className="flex sm:hidden justify-between w-auto static">
          <div className="sm:text-2xl flex items-center gap-2 text-white py-2 px-5">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div
              className="text-2xl fa fa-bars fill-blue-100 cursor-pointer"
              onClick={() => toggleSidebar()}
            ></div>
          </div>
        </div>

        <div className="flex justify-between w-auto static">
          <div className="sm:text-2xl flex items-center gap-2 text-md font-bold">
            <div className="lg:w-64 w-0 h-14 -my-3 px-5 flex items-center gap-5">
              <span
                className="lg:block hidden text-green-300 text-4xl cursor-pointer"
                onClick={() => navigate("/home")}
              >
                Tú Evento
              </span>
            </div>
          </div>
        </div>
        <div className="sm:flex gap-5 text-lg xl:text-xl text-white xl:gap-20 hidden font-light">
          <div
            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-auto ${
              location === "/about"
                ? "border-blue-300"
                : "hover:border-blue-400 border-transparent"
            }`}
            onClick={() => navigate("/about")}
          >
            Sobre Nosotros
          </div>
          {user && user?.rol === "administrador" && (<div
            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
              location === "/services"
                ? "border-white"
                : "hover:border-white border-transparent"
            }`}
            onClick={() => navigate(user ? "/services" : "/login")}
          >
            Servicios
          </div>)}
          {user && user?.rol === "administrador" && (<div
            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
              location === "/quotes"
                ? "border-white"
                : "hover:border-white border-transparent"
            }`}
            onClick={() => navigate(user ? "/quotes" : "/login")}
          >
            Cotizaciones
          </div>)}
          {user && user?.rol !== "administrador" && (<div
            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
              location === "/events"
                ? "border-white"
                : "hover:border-white border-transparent"
            }`}
            onClick={() => navigate(user ? "/events" : "/login")}
          >
            Eventos
          </div>)}

          <div
            className={`border-b-4 cursor-pointer transition ease-in-out delay-100 w-min ${
              location === "/contact"
                ? "border-white"
                : "hover:border-white border-transparent"
            }`}
            onClick={() => navigate("/contact")}
          >
            Contacto
          </div>
        </div>
        <div className="sm:block hidden items-center rounded" id="example-navbar-warning">
          {user ? (
            <div
              className="text-xl font-normal text-emerald-300 py-3 px-5 cursor-pointer flex items-center"
              onClick={() => navigate(`/user/${user.id}`)
              }
            >
              <FaUserCircle className="mr-2" /> Perfil
            </div>
          ) : (
            <button
              className="text-xl font-normal text-emerald-300 py-3 px-5"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
