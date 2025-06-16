'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import RestaurantCard from "./restaurant-card";
import { RestaurantCardProps } from "./restaurant-card";
import { useEffect, useState } from "react";

interface RestaurantCarouselProps {
  results: RestaurantCardProps[];
}

export default function RestaurantCarousel({ results }: RestaurantCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-3xl h-full pb-10 mx-auto px-4 pt-4 border border-none rounded-2xl shadow-lg relative">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Your Finds
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {results.map((result, index) => (
            <CarouselItem key={index} className="pl-4 basis-full">
              <div className="p-1 flex justify-center">
                <RestaurantCard
                  name={result.name}
                  location={result.location}
                  menuLinks={result.menuLinks}
                  why={result.why}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex bg-linear-to-br from-[#ef512c] to-pink-500 text-white border-none hover:from-pink-500 hover:to-[#ef512c] hover:text-white hover:scale-105" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex bg-linear-to-br from-[#ef512c] to-pink-500 text-white border-none hover:from-pink-500 hover:to-[#ef512c] hover:text-white hover:scale-105" />
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {results.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-gradient-to-r from-[#ef512c] to-pink-500 w-4"
                : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 