import React, { useEffect, useState } from "react";

export default function DynHandBanner({ images, texts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeText, setFadeText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    animateTextChange(() =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    );
  };

  const handlePrev = () => {
    animateTextChange(() =>
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
    );
  };

  const handleDotClick = (index) => {
    animateTextChange(() => setCurrentIndex(index));
  };

  const animateTextChange = (updateIndex) => {
    setFadeText(false);
    setTimeout(() => {
      updateIndex();
      setFadeText(true);
    }, 1000);
  };

  return (
    <div className="relative bg-black h-72 md:h-80 overflow-hidden">
      {/* Image slider with slide animation */}
      <div
        className="absolute w-full h-full flex transition-transform duration-1000"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {images.map((url, index) => (
          <img
            loading="lazy"
            key={index}
            className="w-full h-full object-cover flex-shrink-0"
            src={url}
            alt={`Background ${index}`}
          />
        ))}
      </div>

      <div className="absolute w-full h-full bg-black bg-opacity-60"></div>

      <div className="absolute w-full h-full flex items-center justify-center px-10 md:px-0">
        <TextFade fadeText={fadeText} texts={texts[currentIndex]} />
      </div>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-50 p-2 text-white"
        onClick={handlePrev}
        aria-label="Previous"
      ></button>

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50 p-2 text-white"
        onClick={handleNext}
        aria-label="Next"
      ></button>

      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer transition-colors ${
              currentIndex === index
                ? "bg-white"
                : "bg-gray-500 hover:bg-white"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

function TextFade({ fadeText, texts }) {
  return (
    <div className="rounded-3xl text-center w-auto md:w-120">
      <h1
        className={`md:text-6xl lg:text-7xl text-4xl font-bold text-white transition-opacity duration-1000 ${
          fadeText ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: fadeText
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 100% 0% 0%)",
          transition: "clip-path 1s ease-in-out, opacity 1s",
        }}
      >
        {texts.title}
      </h1>
      <h1
        className={`md:text-3xl text-lg font-semibold italic text-white transition-opacity duration-1000 ${
          fadeText ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: fadeText
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 100% 0% 0%)",
          transition: "clip-path 1s ease-in-out, opacity 1s",
        }}
      >
        {texts.subtitle}
      </h1>
    </div>
  );
}
