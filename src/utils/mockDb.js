// Base de datos quemada / simulada en LocalStorage para prototipado rápido sin backend.

const INITIAL_EVENTS = [
  {
    id: "evt-1",
    tipo: "Matrimonio",
    ubicacion: "Hacienda El Paraíso, Cali",
    fecha_evento: "2026-08-15",
    usuario_id: "mock-user-123"
  },
  {
    id: "evt-2",
    tipo: "Concierto de Rock",
    ubicacion: "Arena Cañaveralejo, Cali",
    fecha_evento: "2026-09-22",
    usuario_id: "mock-user-123"
  },
  {
    id: "evt-3",
    tipo: "Conferencia de Tecnología",
    ubicacion: "Hotel Intercontinental, Cali",
    fecha_evento: "2026-10-05",
    usuario_id: "mock-user-123"
  }
];

const INITIAL_SERVICES = [
  // Categoria 1: Comida & Catering (cat-1)
  {
    id: "srv-1",
    nombre: "Catering Gourmet Premium",
    descripcion: "Servicio de comida de 3 tiempos para eventos elegantes con chef privado.",
    precio_unitario: "45000.00",
    categoria_id: "cat-1",
    marca: "Catering Gourmet SAS",
    reservas: []
  },
  {
    id: "srv-5",
    nombre: "Buffet Típico Valluno",
    descripcion: "Menú tradicional con entrada, plato fuerte típico y bebidas ilimitadas.",
    precio_unitario: "28000.00",
    categoria_id: "cat-1",
    marca: "Sabores del Valle",
    reservas: []
  },
  
  // Categoria 2: Audio & Luces (cat-2)
  {
    id: "srv-2",
    nombre: "DJ & Iluminación Robótica",
    descripcion: "Música en vivo, DJ profesional, mezcla, y luces robóticas de alta tecnología.",
    precio_unitario: "1200000.00",
    categoria_id: "cat-2",
    marca: "Sonido & Luces Cali",
    reservas: []
  },
  {
    id: "srv-6",
    nombre: "Sonido de Alta Potencia y Estructura Truss",
    descripcion: "Equipos de sonido line array ideales para conciertos y eventos masivos.",
    precio_unitario: "2500000.00",
    categoria_id: "cat-2",
    marca: "Sonido & Luces Cali",
    reservas: []
  },

  // Categoria 3: Fotografía & Video (cat-3)
  {
    id: "srv-3",
    nombre: "Fotografía y Video 4K con Drone",
    descripcion: "Paquete completo de fotografía artística y tomas aéreas del evento.",
    precio_unitario: "850000.00",
    categoria_id: "cat-3",
    marca: "Cali Media Production",
    reservas: []
  },

  // Categoria 4: Decoración & Estilo (cat-4)
  {
    id: "srv-4",
    nombre: "Decoración Floral Temática",
    descripcion: "Arreglos florales personalizados de temporada para interiores y exteriores.",
    precio_unitario: "600000.00",
    categoria_id: "cat-4",
    marca: "Decoraciones Florales Express",
    reservas: []
  }
];

const INITIAL_QUOTES = [
  {
    id: "qte-1",
    eventoId: "evt-1",
    evento_id: "evt-1",
    nombre: "Cotización Boda Premium",
    costo_total: "1495000.00",
    precio_total: "1495000.00",
    cantidad_personas: 50,
    estado: "Pendiente",
    servicios: ["srv-1", "srv-3", "srv-4"]
  },
  {
    id: "qte-2",
    eventoId: "evt-2",
    evento_id: "evt-2",
    nombre: "Cotización Concierto - Sonido & Luces",
    costo_total: "1200000.00",
    precio_total: "1200000.00",
    cantidad_personas: 1,
    estado: "Aceptada",
    servicios: ["srv-2"]
  },
  {
    id: "qte-3",
    eventoId: "evt-3",
    evento_id: "evt-3",
    nombre: "Cotización Conferencia Corporativa",
    costo_total: "850000.00",
    precio_total: "850000.00",
    cantidad_personas: 1,
    estado: "Rechazada",
    servicios: ["srv-3"]
  }
];

const getStorageItem = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (!value) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const parsed = JSON.parse(value);
    // Si falta el campo clave o detectamos cambios mayores, resetear
    if (key === "mock_quotes" && parsed.length > 0 && (!parsed[0].evento_id || !parsed[0].cantidad_personas)) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    // Forzar actualización de servicios si no tienen marca o categoria_id
    if (key === "mock_services" && parsed.length > 0 && (!parsed[0].categoria_id || !parsed[0].marca)) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const mockDb = {
  // Eventos
  getEvents: (userId) => {
    const events = getStorageItem("mock_events", INITIAL_EVENTS);
    return events.filter(e => e.usuario_id === userId || !userId);
  },
  getEventById: (id) => {
    const events = getStorageItem("mock_events", INITIAL_EVENTS);
    return events.find(e => e.id === id);
  },
  createEvent: (eventData) => {
    const events = getStorageItem("mock_events", INITIAL_EVENTS);
    const newEvent = {
      ...eventData,
      id: eventData.id || `evt-${Date.now()}`,
      usuario_id: eventData.usuario_id || "mock-user-123"
    };
    setStorageItem("mock_events", [...events, newEvent]);
    return newEvent;
  },
  updateEvent: (id, eventData) => {
    const events = getStorageItem("mock_events", INITIAL_EVENTS);
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    setStorageItem("mock_events", updated);
    return { ...eventData, id };
  },
  deleteEvent: (id) => {
    const events = getStorageItem("mock_events", INITIAL_EVENTS);
    setStorageItem("mock_events", events.filter(e => e.id !== id));
    return { success: true };
  },

  // Servicios
  getServices: () => {
    const services = getStorageItem("mock_services", INITIAL_SERVICES);
    return services.map(s => ({ ...s, reservas: s.reservas || [] }));
  },
  getServicesByCategory: (catId) => {
    const services = getStorageItem("mock_services", INITIAL_SERVICES);
    // Filtrar por categoría correctamente y asegurar reservas
    return services
      .filter(s => s.categoria_id === catId)
      .map(s => ({ ...s, reservas: s.reservas || [] }));
  },
  createService: (serviceData) => {
    const services = getStorageItem("mock_services", INITIAL_SERVICES);
    const newService = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      marca: serviceData.marca || "Marca General",
      reservas: serviceData.reservas || []
    };
    setStorageItem("mock_services", [...services, newService]);
    return newService;
  },
  updateService: (id, serviceData) => {
    const services = getStorageItem("mock_services", INITIAL_SERVICES);
    const updated = services.map(s => s.id === id ? { ...s, ...serviceData } : s);
    setStorageItem("mock_services", updated);
    return { ...serviceData, id };
  },
  deleteService: (id) => {
    const services = getStorageItem("mock_services", INITIAL_SERVICES);
    setStorageItem("mock_services", services.filter(s => s.id !== id));
    return { success: true };
  },

  // Cotizaciones
  getQuotes: () => {
    return getStorageItem("mock_quotes", INITIAL_QUOTES);
  },
  getQuoteById: (id) => {
    const quotes = getStorageItem("mock_quotes", INITIAL_QUOTES);
    return quotes.find(q => q.id === id);
  },
  getQuotesByEvent: (eventoId) => {
    const quotes = getStorageItem("mock_quotes", INITIAL_QUOTES);
    return quotes.filter(q => q.eventoId === eventoId || q.evento_id === eventoId);
  },
  createQuote: (quoteData) => {
    const quotes = getStorageItem("mock_quotes", INITIAL_QUOTES);
    
    // Calcular costo total sumando los servicios elegidos
    const allServices = getStorageItem("mock_services", INITIAL_SERVICES);
    const selectedServiceIds = quoteData.servicios || [];
    const sumServices = allServices
      .filter(s => selectedServiceIds.includes(s.id))
      .reduce((acc, curr) => acc + parseFloat(curr.precio_unitario || 0), 0);

    const qty = parseInt(quoteData.cantidad_personas || 1, 10);
    const calculatedTotal = (sumServices * qty).toFixed(2);

    const newQuote = {
      ...quoteData,
      id: `qte-${Date.now()}`,
      eventoId: quoteData.evento_id || quoteData.eventoId,
      evento_id: quoteData.evento_id || quoteData.eventoId,
      estado: quoteData.estado || "Pendiente",
      costo_total: calculatedTotal,
      precio_total: calculatedTotal,
      cantidad_personas: qty
    };
    setStorageItem("mock_quotes", [...quotes, newQuote]);
    return newQuote;
  },
  updateQuote: (id, quoteData) => {
    const quotes = getStorageItem("mock_quotes", INITIAL_QUOTES);
    const updated = quotes.map(q => q.id === id ? { ...q, ...quoteData } : q);
    setStorageItem("mock_quotes", updated);
    return { ...quoteData, id };
  },
  deleteQuote: (id) => {
    const quotes = getStorageItem("mock_quotes", INITIAL_QUOTES);
    setStorageItem("mock_quotes", quotes.filter(q => q.id !== id));
    return { success: true };
  }
};
