'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  const params = useParams();
  const queryId = params.id as string;

  // Get the specific search query and its results
  const searchQuery = useQuery(api.search.getSearchQueryById, { queryId });

  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/myPicks">
            <Button variant="ghost" className="flex items-center gap-2 bg-white border border-[#ef512c] text-[#ef512c] hover:bg-[#ef512c] hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              Back to My Picks
            </Button>
          </Link>
        </div>

        {/* Search query info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
          {searchQuery.location && (
            <p className="text-gray-600 mb-2">
              📍 {searchQuery.location}
            </p>
          )}
        </div>

        {/* Search results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Recommendations</h2>
          {searchQuery.search_results ? (
            <div className="prose prose-lg max-w-none">
              {typeof searchQuery.search_results === 'string' ? (
                <div 
                  className="whitespace-pre-wrap text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: searchQuery.search_results.replace(/\n/g, '<br/>') 
                  }} 
                />
              ) : (
                <pre className="text-gray-700">
                  {JSON.stringify(searchQuery.search_results, null, 2)}
                </pre>
              )}
            </div>
          ) : (
            <p className="text-gray-600">No recommendations available for this search.</p>
          )}
        </div>
      </div>
    </div>
  );
} 