import React from "react";

export default function DualOptionContainer({ bg, title, options, add = "" }) {
    return (
        <div
            className="relative bg-cover bg-center h-auto"
            // style={{ backgroundImage: `url(${img})` }}
        >
            <img className="absolute z-0 w-full h-full object-cover object-left" src={bg}></img>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative py-20 container mx-auto text-center px-4">
                <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                    {title}
                </h3>
                <hr className="w-24 py-2 mt-2 border-emerald-500 border-t-8 mx-auto" />

                <div className="flex flex-wrap justify-center items-stretch mt-12 font-semibold">
                    {options.map((option, index) => (
                        <div key={index} className="w-full md:w-5/12 p-4">
                            <div className="bg-white shadow-lg rounded-lg h-full p-6">
                                <div className="text-green-600 mb-4 text-4xl">
                                    {option.icon}
                                </div>
                                <h4 className="text-slate-700 text-2xl sm:text-3xl font-bold mb-2">
                                    {option.title}
                                </h4>
                                <p className="text-slate-500 text-lg sm:text-xl">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={add.length === 0? "hidden":""+ " flex flex-wrap justify-center items-stretch mt-12 font-semibold"}>
                    {add}
                </div>
            </div>
        </div>
    );
}
