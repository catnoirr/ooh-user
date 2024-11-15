"use client";

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    src: '/carousel.png',
    alt: 'Pet Care supplies',
  },
  {
    id: 2,
    src: '/carousel.png',
    alt: 'Another banner',
  },
  {
    id: 3,
    src: '/carousel.png',
    alt: 'Yet another banner',
  },
];

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // // Handle slide change based on autoplay
  // const handleDotClick = (index) => {
  //   setCurrentSlide(index);
  //   // Add logic to manually scroll to the clicked slide if your carousel supports it
  // };

  return (
    <Carousel
      className="relative w-full max-w-lg mx-auto mt-3"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem 
            key={slide.id} 
            className={`flex justify-center items-center transition-transform duration-500 ${
              index === currentSlide ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <img src={slide.src} alt={slide.alt} className="w-full h-48 m-3 rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/*
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div> */}
    </Carousel>
  );
};

export default CarouselComponent;
