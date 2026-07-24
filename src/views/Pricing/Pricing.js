import React from "react";
import Navbar from "components/Navbar";
import bg from "assets/img/Bg.png";
import PricingHeader from "./Components/PricingHeader";
import PricingCard from "./Components/PricingCard";

export default function Pricing() {
  const plans = [
    {
      name: "Básico",
      price: "Gratis",
      description: "Prueba la plataforma y gestiona tus primeros eventos.",
      features: [
        "1 Evento activo simultáneo",
        "Hasta 20 cotizaciones básicas",
        "Soporte comunitario por correo",
        "Acceso a panel de control simple",
      ],
      buttonText: "Comenzar gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49.99",
      description: "Para organizadores profesionales y marcas en crecimiento.",
      features: [
        "Eventos activos ILIMITADOS",
        "Cotizaciones personalizadas ilimitadas",
        "Soporte prioritario 24/7",
        "Panel de control avanzado con analíticas",
        "Visibilidad destacada en la plataforma",
      ],
      buttonText: "Obtener Pro",
      popular: true,
    },
    {
      name: "Enterprise / Marca",
      price: "$99.99",
      description: "Para agencias y corporaciones con necesidades de alta escala.",
      features: [
        "Todo lo incluido en el plan Pro",
        "Integración de API personalizada",
        "Personalización de marca (White-label)",
        "Asesor de cuenta dedicado para eventos",
        "Contratos de nivel de servicio (SLA)",
      ],
      buttonText: "Contactar Ventas",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-955 text-slate-100 font-sans">
      <Navbar />

      <div className="relative flex-1 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover filter brightness-35 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 backdrop-blur-sm" />
        </div>

        {/* Decorative Ambient Orbs */}
        <div className="absolute top-24 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <PricingHeader />

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          {/* FAQ link banner */}
          <div className="text-center pt-8">
            <p className="text-sm text-slate-400">
              ¿Tienes alguna pregunta especial sobre los planes?{" "}
              <a href="/contact" className="text-emerald-400 hover:text-emerald-300 font-semibold underline">
                Contáctanos directamente
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
