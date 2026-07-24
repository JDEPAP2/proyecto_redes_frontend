import React from "react";


export default function TitleBanner({title}) {
    return <>
    <div className="relative h-44 md:h-64">
      <div className="absolute w-full h-full">
        <div className="h-full flex flex-col content-center items-center justify-center">
            <div className="rounded-3xl text-center w-auto md:w-120">
              <h1 className="md:text-6xl lg:text-7xl text-5xl font-bold text-slate-800">{title}</h1>
            </div>
            <hr className="w-24 py-5 mt-5 border-emerald-700 border-t-8"></hr>
        </div>
      </div>
    </div>
    </>
}
