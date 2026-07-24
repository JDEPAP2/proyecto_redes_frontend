import React, { useState, useEffect, useContext } from "react";
import { getUserById, updateUserProfile } from "api/User";
import { AuthContext } from "contexts/AuthProvider";

export default function ProfileForm() {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(userId);
          setUserData({
            nombre: data.nombre || "",
            email: data.email || "",
            telefono: data.telefono || "",
          });
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        await updateUserProfile(userId, userData);
      } catch (error) {
        console.error("Error al guardar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Detalles del Perfil</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Administra tu información personal y datos de contacto.
          </p>
        </div>

        <button
          onClick={handleEditToggle}
          disabled={loading}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
            isEditing
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10"
              : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
          }`}
        >
          {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Editar Datos"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Nombre Completo / Razón Social
          </label>
          <input
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition duration-200 ${
              isEditing
                ? "bg-slate-800/80 border-slate-700 text-white focus:ring-2 focus:ring-blue-500"
                : "bg-transparent border-transparent text-slate-300 cursor-not-allowed select-none"
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition duration-200 ${
              isEditing
                ? "bg-slate-800/80 border-slate-700 text-white focus:ring-2 focus:ring-blue-500"
                : "bg-transparent border-transparent text-slate-300 cursor-not-allowed select-none"
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Número de Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition duration-200 ${
              isEditing
                ? "bg-slate-800/80 border-slate-700 text-white focus:ring-2 focus:ring-blue-500"
                : "bg-transparent border-transparent text-slate-300 cursor-not-allowed select-none"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
