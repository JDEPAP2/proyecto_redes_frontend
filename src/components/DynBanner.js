import React, { useEffect, useState } from "react";


export default function DynBanner({title, desc, images}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
    }, []);

    return <>
    <div className="relative bg-black h-44 md:h-60">
      {images.map((url, index) => (
        <img
          key={index}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${currentIndex === index ? 'opacity-40' : 'opacity-0'}`}
          src={url}
          alt={`Background ${index}`}
        />
      ))}
      <div className="absolute w-full h-full">
        <div className="h-full flex content-center items-center justify-center">
            <div className="rounded-3xl text-center w-auto md:w-120">
            <h1 className="md:text-6xl lg:text-7xl text-5xl font-bold text-white">{title}</h1>
            <h1 className="md:text-3xl text-xl font-semibold italic text-white">{desc}</h1>
            </div>
        </div>
      </div>
    </div>
    </>
}
