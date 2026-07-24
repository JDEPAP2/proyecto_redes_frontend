import React, { useEffect, useRef, useState } from "react";

export default function OptionContainer({ title, options, add = "" }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Dejar de observar una vez que es visible
          }
        });
      },
      { threshold: 0.1 } // Umbral de visibilidad
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      options.forEach((_, index) => {
        setTimeout(() => {
          setVisibleIndexes((prevIndexes) => [...prevIndexes, index]);
        }, index * 300); // Retrasar la aparición de cada opción
      });
    }
  }, [isVisible, options]);

  return (
    <div ref={containerRef} className="relative bg-cover bg-center h-auto py-16">
      <div className="absolute inset-0"></div>
      <div className="relative container mx-auto text-center px-4">
        <h3 className="text-slate-800 text-xl md:text-4xl lg:text-5xl font-bold">
          {title}
        </h3>
        <hr className="w-24 py-2 mt-2 border-emerald-700 border-t-8 mx-auto" />

        <div className="flex flex-wrap justify-center items-center mt-12 font-semibold">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex  justify-center w-full md:w-4/12 py-4 transition-opacity duration-1000 transform transition-transform ${
                visibleIndexes.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="rounded-lg h-full p-6">{option}</div>
            </div>
          ))}
        </div>
        <div
          className={`${
            add.length === 0 ? "hidden" : ""
          } flex flex-wrap justify-center items-stretch mt-12 font-semibold transition-opacity duration-1000 transform transition-transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {add}
        </div>
      </div>
    </div>
  );
}
