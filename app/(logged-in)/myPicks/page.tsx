'use client';

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SearchQueryCard from "@/components/my-picks/search-query-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function MyPicksPage() {
  const { user: clerkUser } = useUser();
  const user = useQuery(api.users.getUserByClerkId, 
    clerkUser ? { clerkId: clerkUser.id } : "skip"
  );
  
  const searchQueries = useQuery(api.search.getUserSearchQueries,
    user?._id ? { userId: user._id } : "skip"
  );

  if (!user || !searchQueries) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (searchQueries.length === 0) {
    return (
      <div className="mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28
        transition-all animate-in lg:px-12 max-w-7xl lg:mt-20">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-gray-800/60 mb-4">You haven&apos;t saved any spots yet</h1>
        <p className="text-lg text-gray-600 text-center">
            Your future favourite places are just a click away! Let&apos;s start the hunt!
        </p>
        <Button variant={'link'} className="text-white mt-6 text-base
                sm:text-lg lg:text-xl rounded-xl px-8 sm:px-10 lg:px-12 
                py-6 sm:py-7 lg:py-8 lg:mt-10 bg-linear-to-br from-[#ef512c] to-pink-500 hover:from-pink-500 hover:to-[#ef512c] hover:no-underline font-bold shadow-lg hover:scale-105 transition-all duration-300">
                <Link href="/discover" className="flex gap-2 items-center">
                    <span>Find your next craving</span>
                    <ArrowRight className="animate-pulse" />
                </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">My Picks</h1>
          <Button className="bg-gradient-to-r from-[#ef512c] to-pink-500 text-white rounded-lg px-4 py-2 hover:from-pink-500 hover:to-[#ef512c] transition-all duration-300">
            <Link href="/discover" className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Find New
            </Link>
          </Button>
          
        </div>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {searchQueries.map((query) => (
            <SearchQueryCard
              key={query.query_id}
              queryId={query.query_id}
              keywords={query.keywords}
              timestamp={query.timestamp}
              location={query.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 