'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export interface RestaurantCardProps {
  name: string;
  location: string;
  menuLinks: { platform: string; url: string }[];
  why: string;
}

export default function RestaurantCard({
  name,
  location,
  menuLinks,
  why
}: RestaurantCardProps) {
  return (
    <Card className="mt-0 w-[500px] h-[390px] border-dashed border-pink-100 border-5 flex flex-col items-center justify-center shadow-none">
      <CardHeader className="pb-2 w-full pt-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#ef512c] to-pink-500 bg-clip-text text-transparent text-left">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        {/* Location */}
        {location && location !== "Not available" && (
          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}

        {/* Menu Links */}
        {menuLinks && menuLinks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {menuLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#ef512c] to-pink-500 rounded-full hover:from-pink-500 hover:to-[#ef512c] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                {link.platform}
              </Link>
            ))}
          </div>
        )}

        {/* Why Visit */}
        {why && why !== "Not available" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-medium text-gray-700">✍️ Why Visit?</span>
            </div>
            <p className="text-gray-600 text-sm pl-6">{why}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 