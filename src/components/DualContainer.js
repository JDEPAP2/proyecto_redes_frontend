import React from "react";

export default function DualContainer({img, title, content, reverse2 = false, reverse = false, width = "md:w-5/12"}) {
    return (
        <div className="container mx-auto px-2">
                    <div className={"flex flex-wrap items-center justify-center my-32" + (reverse?" flex-row-reverse":"")}>
                        <div className={width + " w-full px-4 mr-auto ml-auto flex flex-col"}>
                            <div className={"w-min "  + (reverse2?"flex flex-col items-end":"")}>
                                <h3 className="text-slate-700 md:text-4xl lg:text-5xl text-3xl mb-2 font-extrabold leading-normal">
                                    {title}
                                </h3>
                                <hr className="w-24 py-2 border-emerald-700 border-t-8"></hr>
                            </div>
                            {content.map((v,i)=><p 
                                key={i}
                                className="md:text-xl font-normal text-lg  leading-relaxed mt-4 mb-4 text-slate-700 text-justify">
                                {v}
                            </p>)}
                        </div>
                        {(img&&<div className={"w-full md:w-4/12 px-4 mr-auto ml-auto h-64 md:h-auto"}>
                            <img src={img} className="rounded-md shadow-xl h-full w-full object-cover"></img>
                        </div>)}

                    </div>
            </div>
    );
}
