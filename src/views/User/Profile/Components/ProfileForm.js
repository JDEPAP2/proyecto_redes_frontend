import React, { useState, useEffect, useContext } from "react";
import { FaEnvelope, FaPencilAlt, FaPhone } from "react-icons/fa";
import { getUserById, updateUserProfile } from "api/User";
import { AuthContext } from "contexts/AuthProvider"; // Importa el AuthContext

export default function ProfileForm() {
    const { user } = useContext(AuthContext); // Obtén el usuario desde el contexto
    const userId = user?.id; // Extrae el ID del usuario
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        nombre: "",
        email: "",
        fecha: "",
        telefono: "",
    });

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const userData = await getUserById(userId);
                    console.log("Usuario obtenido:", userData);
                    setUserData(userData);
                } catch (error) {
                    console.error("Error al obtener el usuario:", error);
                }
            };
            fetchUser();
        }
    }, [userId]);

    const handleEditToggle = async () => {
        if (isEditing) {
            try {
                await updateUserProfile(userId, userData);
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (!userId) {
        return <div>No se pudo obtener el ID del usuario desde el contexto.</div>;
    }

    return (
        <div className="">
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

            <div className="flex flex-col items-center text-center">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                />
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
                            name="telefono"
                            value={userData.telefono}
                            onChange={handleChange}
                            className="bg-slate-200 w-full p-3 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-200 mb-4"
                        />
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-blue-800">{userData.nombre}</h1>
                        <div className="flex items-center justify-center mb-4 space-x-2">
                            <FaEnvelope className="text-gray-600" />
                            <p className="text-gray-600 text-md">{userData.email}</p>
                        </div>
                        <div className="flex items-center justify-center mb-4 space-x-2">
                            <FaPhone className="text-gray-600" />
                            <p className="text-gray-600 text-md">{userData.telefono}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
