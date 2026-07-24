import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import ProfileForm from "./Components/ProfileForm";
import { AuthContext } from "contexts/AuthProvider";

export default function Profile() {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);

  const handleLogoutBttn = () => {
    handleLogout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Cargando datos de usuario...</p>
      </div>
    );
  }

  const isBrand = user.rol === "administrador";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <div className="relative flex-1 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-35 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 backdrop-blur-sm" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Información de Perfil Rápida */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-6 md:border-r md:border-white/10 md:pr-8">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Profile Avatar"
                  className="w-28 h-28 rounded-full border-4 border-white/10 object-cover shadow-xl group-hover:border-emerald-500/50 transition duration-300"
                />
                <span className={`absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full border-2 border-slate-950 ${isBrand ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{user.nombre || "Usuario Demo"}</h2>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  {isBrand ? "Cuenta de Marca" : "Cliente Particular"}
                </p>
              </div>

              {/* Botones de Navegación del Panel */}
              <div className="w-full flex flex-col gap-3 pt-4">
                {!isBrand ? (
                  <button
                    onClick={() => navigate("/events")}
                    className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 transition"
                  >
                    Ver Mis Eventos
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/services")}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/10 transition"
                    >
                      Gestionar Servicios
                    </button>
                    <button
                      onClick={() => navigate("/quotes")}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs bg-white/10 hover:bg-white/20 border border-white/10 transition"
                    >
                      Ver Cotizaciones
                    </button>
                  </>
                )}

                <button
                  onClick={handleLogoutBttn}
                  className="w-full py-2.5 px-4 rounded-xl text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 font-bold text-xs transition mt-4"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Columna Derecha: Formulario Editable de Detalles */}
            <div className="md:col-span-8">
              <ProfileForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
