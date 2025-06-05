import { NextResponse } from 'next/server';
import getSearchResults from '@/lib/tavily';

export async function POST(request: Request) {
    try {
        const { query } = await request.json();
        
        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        const results = await getSearchResults(query);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Failed to perform search' },
            { status: 500 }
        );
    }
} 