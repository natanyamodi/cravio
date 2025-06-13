'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard from "./restaurant-card";
import { RestaurantCardProps } from "./restaurant-card";

interface RestaurantCarouselProps {
  results: RestaurantCardProps[];
}

export default function RestaurantCarousel({ results }: RestaurantCarouselProps) {
  return (
    <div className="w-full max-w-3xl h-full pb-10 mx-auto px-4 pt-4 border border-none rounded-2xl shadow-lg relative">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Your Finds
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
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
    </div>
  );
} 