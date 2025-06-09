'use client';

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useEffect } from "react";

interface SearchResult {
    success: boolean;
    data?: string;
    error?: string;
}

interface TavilyResult {
    title: string;
    url: string;
    content: string;
    score: number;
    published_date?: string;
    author?: string;
}

interface SearchResultsProps {
    keywords: string[];
    location: string;
    onSearchComplete: (results: SearchResult) => void;
    onSearchStage?: (stage: 'searching' | 'generating' | 'success' | 'error', error?: string) => void;
}

export default function SearchResults({ keywords, location, onSearchComplete, onSearchStage }: SearchResultsProps) {
    const { user: clerkUser } = useUser();
    const user = useQuery(api.users.getUserByClerkId, 
        clerkUser ? { clerkId: clerkUser.id } : "skip"
    );
    const storeSearchQuery = useMutation(api.search.storeSearchQuery);
    const isSearching = useRef(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!isSearching.current && user?._id) {
            performSearch();
        }
    }, [user?._id, keywords, location]);

    const performSearch = async () => {
        if (isSearching.current || !user?._id) return;
        
        try {
            isSearching.current = true;
            
            // Generate search queries
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    keywords,
                    location,
                }),
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            const results = await response.json();
            
            // Log the entire search process
            console.group('🔍 Search Process Log');
            console.log('📍 Location:', location);
            console.log('🔑 Keywords:', keywords);
            
            if (results.queries) {
                console.group('📝 Generated Queries');
                results.queries.forEach((query: string, index: number) => {
                    console.log(`Query ${index + 1}:`, query);
                });
                console.groupEnd();
            }

            if (results.tavilyResults) {
                console.group('🌐 Tavily Search Results');
                results.tavilyResults.forEach((result: TavilyResult, index: number) => {
                    console.log(`Result Set ${index + 1}:`, result);
                });
                console.groupEnd();
            }

            if (results.success) {
                console.group('🤖 Gemini Final Response');
                console.log('Formatted Recommendations:', results.data);
                console.groupEnd();

                // Store results
                await storeSearchQuery({
                    keywords,
                    location,
                    searchResults: results.data,
                    userId: user._id
                });

                onSearchStage?.('success');
                onSearchComplete(results.data);
            } else {
                throw new Error(results.error || 'Search failed');
            }
            
            console.groupEnd();
        } catch (error) {
            console.error('❌ Search Error:', error);
            onSearchStage?.('error');
        } finally {
            if (isMounted.current) {
                isSearching.current = false;
            }
        }
    };

    return null; 
} 