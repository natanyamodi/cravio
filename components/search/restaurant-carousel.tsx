'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard from "./restaurant-card";
import { SearchResult } from "@/lib/types";

interface RestaurantCarouselProps {
  results: SearchResult[];
}

export default function RestaurantCarousel({ results }: RestaurantCarouselProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#ef512c] to-pink-500 bg-clip-text text-transparent">
        Your Finds
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {results.map((result, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <RestaurantCard
                  name={result.name}
                  contact={result.contact}
                  address={result.address}
                  addressLink={result.address_link}
                  menuLinks={{
                    swiggy: result.swiggy_link,
                    zomato: result.zomato_link,
                  }}
                  reviews={result.reviews}
                  why={result.why}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex bg-gradient-to-r from-[#ef512c] to-pink-500 text-white border-none hover:from-pink-500 hover:to-[#ef512c]" />
        <CarouselNext className="hidden md:flex bg-gradient-to-r from-[#ef512c] to-pink-500 text-white border-none hover:from-pink-500 hover:to-[#ef512c]" />
      </Carousel>
    </div>
  );
} 