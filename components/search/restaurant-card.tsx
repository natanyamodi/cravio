'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface RestaurantCardProps {
  name: string;
  contact?: string;
  address?: string;
  addressLink?: string;
  menuLinks?: {
    swiggy?: string;
    zomato?: string;
  };
  reviews?: string;
  why?: string;
}

export default function RestaurantCard({
  name,
  contact,
  address,
  addressLink,
  menuLinks,
  reviews,
  why
}: RestaurantCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#ef512c] to-pink-500 bg-clip-text text-transparent">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact */}
        {contact && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-pink-500" />
            <span>{contact}</span>
          </div>
        )}

        {/* Address */}
        {address && (
          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
            {addressLink ? (
              <Link 
                href={addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 hover:underline"
              >
                {address}
              </Link>
            ) : (
              <span>{address}</span>
            )}
          </div>
        )}

        {/* Menu Links */}
        {(menuLinks?.swiggy || menuLinks?.zomato) && (
          <div className="flex gap-3">
            {menuLinks.swiggy && (
              <Link
                href={menuLinks.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#ef512c] to-pink-500 rounded-full hover:from-pink-500 hover:to-[#ef512c] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Swiggy
              </Link>
            )}
            {menuLinks.zomato && (
              <Link
                href={menuLinks.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#ef512c] to-pink-500 rounded-full hover:from-pink-500 hover:to-[#ef512c] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Zomato
              </Link>
            )}
          </div>
        )}

        {/* Reviews */}
        {reviews && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-4 h-4 text-pink-500" />
              <span className="font-medium">Reviews</span>
            </div>
            <p className="text-gray-600 text-sm pl-6">{reviews}</p>
          </div>
        )}

        {/* Why Visit */}
        {why && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-4 h-4 text-pink-500" />
              <span className="font-medium">Why Visit?</span>
            </div>
            <p className="text-gray-600 text-sm pl-6">{why}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 