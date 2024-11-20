import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import ProfileForm from "./Components/ProfileForm";
import { AuthContext } from "contexts/AuthProvider";

export default function Profile() {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"));
    const { user, handleLogout } = useContext(AuthContext);

    const handleLogoutBttn = () => {
        handleLogout();
        navigate("/login");
    };

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen relative">
                <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-80">
                    <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
                        <ProfileForm userId={userId} />
                        <div className="flex flex-col items-center mt-4">
                            
                            {(user.rol !== "administrador"&&<button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={() => navigate("/events")}
                            >
                                Ver Eventos
                            </button>)}
                            {(user.rol === "administrador"&&<button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={() => navigate("/services")}
                            >
                                Ver Servicios
                            </button>)}                            
                            {(user.rol === "administrador"&&<button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={() => navigate("/quotes")}
                            >
                                Ver Cotizaciones
                            </button>)}
                            <button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={handleLogoutBttn}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
