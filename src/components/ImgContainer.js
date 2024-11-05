import React from "react";

export default function ImgContainer({bg, title, content, reverse = false, colort, colorb, height}) {
    return (
        <div className="relative w-full">
            <img className="absolute z-0 w-full h-full object-cover object-left" src={bg}></img>
            <div className="absolute z-10 p-2 bg-black opacity-50 w-full h-full inset-0">
            </div>
                <div className={colort +" relative z-10 flex flex-wrap px-4 items-center my-16 " + (reverse?" flex-row-reverse":"")}>
                    <div className="w-full md:w-5/12 mr-auto my-10 ml-auto bg-white p-12 rounded-xl">
                        <h3 className="md:text-4xl lg:text-5xl text-xl mb-2 font-extrabold leading-normal">
                            {title}
                        </h3>
                        <hr className={"w-24 py-2 mt "+ colorb +" border-t-8"}></hr>
                        {content.map((v,i)=><p 
                            key={i}
                            className="md:text-xl font-normal text-lg leading-relaxed mt-4 mb-4 text-pretty">
                            {v}
                        </p>)}
                    </div>
                    <img className={height + "hidden md:block w-full md:w-4/12 mr-auto ml-auto rounded-md shadow-2xl object-cover"}></img>
                </div>
        </div>
    );
}