import React from "react";

export default function ImgDualContainer({bg, img, title, content, reverse = false, colort, colorb, height}) {
    return (
        <div className="relative p-2 w-full"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: reverse === 'left' ? 'left center' : 'right center'
        }}>
            <div className="absolute bg-black opacity-60 w-full h-full inset-0">
            </div>
                <div className={colort +" relative z-10 px-4 flex flex-wrap items-center my-32 " + (reverse?" flex-row-reverse":"")}>
                    <div className="w-full md:w-5/12  mr-auto my-10 ml-auto">
                        <h3 className="md:text-4xl lg:text-5xl text-3xl mb-2 font-extrabold leading-normal">
                            {title}
                        </h3>
                        <hr className={"w-24 py-2 mt "+ colorb +" border-t-8"}></hr>
                        {content.map((v,i)=><p 
                            key={i}
                            className="md:text-xl font-normal text-lg  leading-relaxed mt-4 mb-4 text-pretty">
                            {v}
                        </p>)}
                    </div>
                    <img src={img} className={height + " w-full md:w-4/12 mr-auto ml-auto rounded-md shadow-2xl object-cover"}></img>
                </div>
        </div>
    );
}
