import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

import Landing from "views/Landing/Landing";
import About from "views/About/About";
import Auth from "views/Auth/Auth";
import Contact from "views/Contact/Contact";
import Pricing from "views/Pricing/Pricing";
import Profile from "views/User/Profile/Profile";
import Cotizaciones from "views/Cotizaciones/Cotizaciones";
import AuthProvider from "contexts/AuthProvider";
import { AuthContext } from "contexts/AuthProvider";
import Eventos from "views/Eventos/Eventos";
import Servicios from "views/Servicios/Servicios";
import CotizacionesEvento from "views/Cotizaciones/CotizacionesEvento";
import CrearCotizacion from "views/Cotizaciones/CrearCotizacion";

// Ruta privada genérica (debe estar autenticado)
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Ruta exclusiva para el rol Cliente
const ClientRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.rol !== "cliente") return <Navigate to="/services" />;
  return children;
};

// Ruta exclusiva para el rol Marca (administrador)
const BrandRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.rol !== "administrador") return <Navigate to="/events" />;
  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AuthProvider>
   <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Navigate to="/"/>} />
      <Route path="/login" element={<Auth isRegister={false} />} />
      <Route path="/register" element={<Auth isRegister={true} />} />
      <Route path='/' element={<Landing/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/pricing' element={<Pricing/>} />
      
      {/* Rutas compartidas pero privadas */}
      <Route path='/user/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />

      {/* Rutas exclusivas del Cliente */}
      <Route path='/events' element={<ClientRoute><Eventos /></ClientRoute>} />
      <Route path='/quotes-event/:eventoId' element={<ClientRoute><CotizacionesEvento /></ClientRoute>} />
      <Route path='/quote/:eventoId' element={<ClientRoute><CrearCotizacion /></ClientRoute>} />

      {/* Rutas exclusivas de la Marca (administrador) */}
      <Route path='/services' element={<BrandRoute><Servicios /></BrandRoute>} />
      <Route path='/quotes' element={<BrandRoute><Cotizaciones /></BrandRoute>} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
  </React.StrictMode>
);
