'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface TavilySearchResult {
    results: Array<{
        title: string;
        url: string;
        content: string;
        score: number;
    }>;
    query: string;
}

interface SearchResultsProps {
    keywords: string[];
    location: string;
    onSearchComplete?: () => void;
}

export default function SearchResults({ keywords, location, onSearchComplete }: SearchResultsProps) {
    const { user: clerkUser } = useUser();
    const user = useQuery(api.users.getUserByClerkId, 
        clerkUser ? { clerkId: clerkUser.id } : "skip"
    );
    const storeSearchQuery = useMutation(api.search.storeSearchQuery);
    const isSearching = useRef(false);
    const [searchResults, setSearchResults] = useState<TavilySearchResult | null>(null);

    useEffect(() => {
        let isMounted = true;

        const performSearch = async () => {
            if (isSearching.current || !user?._id || !location) return;

            try {
                isSearching.current = true;
                
                // 1. Store the search query in Convex
                await storeSearchQuery({
                    userId: user._id,
                    keywords,
                    location: location,
                });

                // 2. Perform Tavily search through our API route
                const searchQuery = `Find ${keywords.join(' ')} restaurants in ${location}`;
                const response = await fetch('/api/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: searchQuery }),
                });

                if (!response.ok) {
                    throw new Error('Search request failed');
                }

                const tavilyResults = await response.json();
                console.log('Tavily Search Results:', tavilyResults);

                if (isMounted) {
                    setSearchResults(tavilyResults);
                    onSearchComplete?.();
                }
            } catch (error) {
                console.error('Search failed:', error);
                if (isMounted) {
                    toast.error('Search failed', {
                        description: 'Please try again later.',
                    });
                }
            } finally {
                if (isMounted) {
                    isSearching.current = false;
                }
            }
        };

        performSearch();

        return () => {
            isMounted = false;
        };
    }, [user?._id, keywords, location, onSearchComplete]);

    return (
        <div className="w-full max-w-4xl mt-8">
            {searchResults && (
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Search Results</h3>
                    <div className="space-y-4">
                        {searchResults.results.map((result, index) => (
                            <div key={index} className="p-2 hover:bg-gray-50 rounded">
                                <a 
                                    href={result.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {result.title}
                                </a>
                                <p className="text-sm text-gray-600 mt-1">{result.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 