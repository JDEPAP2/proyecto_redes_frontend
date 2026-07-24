import React, { useEffect, useRef, useState } from "react";

export default function DualTwoContainer({ component, title, content, reverse = false}) {
  return (<div className="w-full">
            <div className="absolute z-10 p-2 w-full h-full inset-0">
                <div className={" relative z-10 flex flex-wrap px-4 items-center my-16 " + (reverse?" flex-row-reverse":"")}>
                    <div className="w-full md:w-5/12 mr-auto my-10 ml-auto p-12 rounded-xl">
                        <h3 className="md:text-4xl text-emerald-100 lg:text-5xl text-xl mb-2 font-bold leading-normal">
                            {title}
                        </h3>
                        {content.map((v,i)=><p 
                            key={i}
                            className="md:text-xl font-normal text-white text-lg leading-relaxed mt-4 mb-4 text-pretty">
                            {v}
                        </p>)}
                    </div>
                    <div className="w-full md:w-4/12 mr-auto ml-auto object-cover">
                          {component}
                    </div>
                </div>
            </div>
        </div>
  );
}
