import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import { AuthContext } from "contexts/AuthProvider";

export default function Profile() {
    const { handleLogout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        nombre: "Catalina Arana",
        email: "c.arana@gmail.com",
        fecha: "November 22",
    });

    useEffect(()=>{
        setUserData({
            fecha: userData.fecha,
            ...user
        })
    },[user])

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen relative">
                <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
                <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80">
                    <div className="relative bg-white rounded-lg shadow-lg p-8 w-1/2">
                        {/* Edit Icon / Save Button */}
                        {!isEditing ? (
                            <button 
                                className="absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700 outline-none"
                                onClick={handleEditToggle}
                            >
                                <FaPencilAlt size={18} />
                            </button>
                        ) : (
                            <button 
                                className="absolute top-4 right-4 focus:outline-none bg-slate-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                                onClick={handleEditToggle}
                            >
                                Guardar
                            </button>
                        )}

                        {/* Profile Image */}
                        <div className="flex flex-col items-center text-center">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" // Reemplaza con la URL de la imagen de perfil
                                alt="Profile"
                                className="w-24 h-24 rounded-full mb-4 shadow-lg"
                            />

                            {/* User Info */}
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={userData.nombre}
                                        onChange={handleChange}
                                        className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-200 mb-2"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-200 mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="fecha"
                                        value={userData.fecha}
                                        onChange={handleChange}
                                        className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-200 mb-4"
                                    />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-blue-800">{userData.nombre}</h1>
                                    <p className="text-lg text-gray-500 mb-2">{userData.fecha}</p>
                                    <div className="flex items-center justify-center mb-4 space-x-2">
                                        <FaEnvelope className="text-gray-600" />
                                        <p className="text-gray-600 text-md">{userData.email}</p>
                                    </div>
                                </>
                            )}

                            {/* Action Button */}
                            <button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={() => navigate("/cotizaciones")}
                            >
                                Ver Eventos
                            </button>

                            <button
                                className="bg-blue-800 text-white font-semibold w-1/2 py-2 rounded-xl mb-2 hover:bg-blue-700 transition duration-300"
                                onClick={() => handleLogout()}
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
