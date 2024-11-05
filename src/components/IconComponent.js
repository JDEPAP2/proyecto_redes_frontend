import React from "react";

export default function IconComponent({ color, icon, title, content, src, event }, props) {
    return (
        <div className=" select-none group pt-6 w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div
                        className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ${color}`}
                    >
                        <i className={`fas fa-${icon}`}></i>
                    </div>
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <hr className="mt-1 mx-4"></hr>
                    <p className="mt-5 mb-4 text-gray-600 text-xs">{content}</p>
                    <a  href={src} onClick={()=>event?event():()=>""}
                        className={`transition-opacity duration-300 ease-in-out ${
                            /* Aquí aplicamos las clases para mostrar/ocultar el elemento */
                            'opacity-0 group-hover:opacity-100'
                        } font-bold cursor-pointer hover:text-red-400 text-rose-600 underline underline-offset-4`}
                    >
                        Descubrir más
                    </a>
                </div>
            </div>
        </div>
    );
}
