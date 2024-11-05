import React from "react";


export default function Banner({bg}) {
    return <>
    <div className="relative bg-black h-44 md:h-60">
        <img
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 opacity-40`}
          src={bg}
          alt={`Background ${bg}`}
        />
      <div className="absolute w-full h-full">
        <div className="h-full flex content-center items-center justify-center">
            <div className="rounded-3xl text-center w-auto md:w-120">
              <h1 className="md:text-6xl lg:text-7xl text-4xl font-bold text-white">Equipo Garfema</h1>
            </div>
        </div>
      </div>
    </div>
    </>
}
