import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

import Landing from "views/Landing/Landing";
import About from "views/About/About";
import Auth from "views/Auth/Auth";
import Contact from "views/Contact/Contact";
import Profile from "views/User/Profile/Profile";
import Cotizaciones from "views/Cotizaciones/Cotizaciones";
import AuthProvider from "contexts/AuthProvider";
import { AuthContext } from "contexts/AuthProvider";
import Eventos from "views/Eventos/Eventos";
import Servicios from "views/Servicios/Servicios";
import CotizacionesEvento from "views/Cotizaciones/CotizacionesEvento";
import CrearCotizacion from "views/Cotizaciones/CrearCotizacion";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
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
      <Route path='/user/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/events' element={<PrivateRoute><Eventos /></PrivateRoute>} />
      <Route path='/services' element={<PrivateRoute><Servicios /></PrivateRoute>} />
      <Route path='/quotes' element={<PrivateRoute><Cotizaciones /></PrivateRoute>} />
      <Route path='/quotes-event/:eventoId' element={<PrivateRoute><CotizacionesEvento /></PrivateRoute>} />
      <Route path='/quote/:eventoId' element={<PrivateRoute><CrearCotizacion /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
  </React.StrictMode>
);


