import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosInstance from "../config/axiosConfig";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await axiosInstance.get("/posters");
        setImages((response.data.data || []).slice(0,3));
      } catch (error) {
        console.error("Error fetching posters:", error);
      }
    };

    fetchPosters();
  }, []);

  const nextSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && images.length > 0) {
        nextSlide();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, images]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log("Button clicked:", images[currentIndex]?.cta);
    // Add functionality as needed
  };

  return (
    <div className="relative w-full h-[250px] mx-3 sm:h-full max-h-[70vh] md:h-full">
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out transform h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className="w-full h-full relative flex-shrink-0"
            >
              <img
                src={image?.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover duration-700 ease-in-out"
              />
            </div>
          ))}
        </div>

        {/* Overlay Content */}
        {images.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-[23px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[40px] font-bold mb-4">
              {images[currentIndex]?.title}
            </h2>
            <div className="relative z-30">
              <button
                className="px-4 py-2.5 bg-black text-white font-bold rounded-full cursor-pointer hover:bg-[#1d1d1d] transition-colors duration-200 active:bg-gray-700"
                style={{ WebkitTapHighlightColor: "transparent" }}
                onClick={handleButtonClick}
              >
                {images[currentIndex]?.description}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/30 rounded-full hover:bg-black/50 text-white transition-colors duration-200 cursor-pointer pointer-events-auto"
          >
            <FaChevronLeft className="text-2xl sm:text-3xl" />
          </button>
          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/30 rounded-full hover:bg-black/50 text-white transition-colors duration-200 cursor-pointer pointer-events-auto"
          >
            <FaChevronRight className="text-2xl sm:text-3xl" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-none">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full pointer-events-auto ${
                currentIndex === index ? "bg-black scale-100" : "bg-white/50"
              } transition-transform cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
