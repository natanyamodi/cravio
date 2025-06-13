'use client';

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RestaurantCarousel from "@/components/search/restaurant-carousel";
import React from 'react';

interface Restaurant {
  name: string;
  location: string;
  menuLinks: { platform: string; url: string }[];
  why: string;
}

export default function SearchResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const router = useRouter();
  const { id: queryId } = React.use(params);

  const searchQuery = useQuery(api.search.getSearchQueryById, { queryId });
  const user = useQuery(api.users.getUserByClerkId,
    clerkUser ? { clerkId: clerkUser.id } : "skip"
  );
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const parseRestaurantResults = (resultsString: string): Restaurant[] => {
    const restaurantBlocks = resultsString.split(/•\s*name:/).filter(Boolean); // Split by "• name:"
    return restaurantBlocks.map((block) => {
      const nameMatch = block.match(/^(.*?)\n/);
      const name = nameMatch ? nameMatch[1].trim() : "Not available";

      const locationMatch = block.match(/location: ([^\n]+)/);
      const location = locationMatch ? locationMatch[1].trim() : "Not available";

      const menuLinksMatch = block.match(/menu link: ([^\n]+)/);
      const menuLinks: { platform: string; url: string }[] = [];
      if (menuLinksMatch) {
        const links = menuLinksMatch[1].split(',').map(link => link.trim());
        links.forEach(link => {
          const match = link.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            menuLinks.push({ platform: match[1].trim(), url: match[2].trim() });
          }
        });
      }

      const whyMatch = block.match(/why: ([\s\S]*)/);
      const why = whyMatch ? whyMatch[1].trim() : "Not available";
      
      return {
        name,
        location,
        menuLinks,
        why,
      };
    });
  };

  useEffect(() => {
    if (searchQuery?.search_results && typeof searchQuery.search_results === 'string') {
      const parsedResults = parseRestaurantResults(searchQuery.search_results);
      setRestaurants(parsedResults);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isClerkLoaded && !clerkUser) {
      router.push('/');
      return;
    }

    if (searchQuery && user && searchQuery.user_id !== user._id) {
      router.push('/');
    }
  }, [isClerkLoaded, clerkUser, searchQuery, user, router]);

  // Show loading state while checking authentication and ownership
  if (!isClerkLoaded || !searchQuery || !user || searchQuery.user_id !== user._id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Top section: Back button and search query info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          {/* Back button */}
          <div className="mb-4 sm:mb-0">
            <Link href="/myPicks">
              <Button variant="ghost" className="flex items-center gap-2 bg-white border border-[#ef512c] text-[#ef512c] hover:bg-[#ef512c] hover:text-white">
                <ArrowLeft className="w-4 h-4" />
                Back to My Picks
              </Button>
            </Link>
          </div>

          {/* Search query info (keywords and location) */}
          <div className="flex flex-col items-end">
            <div className="flex flex-wrap justify-end gap-2">
              {searchQuery.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
            {searchQuery.location && (
              <p className="text-gray-600 mt-1">
                📍 {searchQuery.location}
              </p>
            )}
          </div>
        </div>

        {/* Search results as Carousel */}
        <div className="space-y-6 flex justify-center">
          {restaurants.length > 0 ? (
            <RestaurantCarousel results={restaurants} />
          ) : (
            <p className="text-gray-600">No recommendations available for this search.</p>
          )}
        </div>
      </div>
    </div>
  );
} 