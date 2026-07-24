import React, { useEffect, useState, useRef } from "react";

export default function StatisticsContainer({ stats }) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Desconectar el observer una vez que las tarjetas son visibles
                }
            },
            {
                threshold: 0.3, // Activa cuando el 30% del contenedor es visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            stats.forEach((stat, index) => {
                const startValue = 0;
                const endValue = stat.value;
                const duration = 1000; // Duración de la animación en milisegundos

                const increment = (timestamp, start, currentValue, endValue, index) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressRatio = Math.min(progress / duration, 1);
                    const newValue = Math.floor(progressRatio * endValue);

                    setAnimatedStats((prevStats) => {
                        const newStats = [...prevStats];
                        newStats[index] = newValue;
                        return newStats;
                    });

                    if (progress < duration) {
                        requestAnimationFrame((timestamp) =>
                            increment(timestamp, start, currentValue, endValue, index)
                        );
                    }
                };

                requestAnimationFrame((timestamp) =>
                    increment(timestamp, null, startValue, endValue, index)
                );
            });
        }
    }, [isVisible, stats]);

    return (
        <div ref={containerRef} className="container mx-auto md:px-4 md:py-16 px-12 py-10">
            <div className="flex flex-wrap justify-center items-center gap-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`w-full md:w-3/12 bg-white rounded-lg shadow-lg p-8 text-center relative transform transition-transform duration-700 ease-in-out ${
                            isVisible ? "scale-100" : "scale-75"
                        }`}
                    >
                        {/* Left vertical line */}
                        <div className="absolute top-0 bottom-0 left-0 border-l-8 border-blue-800"></div>

                        <h3 className="text-6xl font-bold text-slate-800 mb-2">
                            +{animatedStats[index]}{stat.pref}
                        </h3>
                        <p className="text-slate-600 text-2xl uppercase font-bold">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
