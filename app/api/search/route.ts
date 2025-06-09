import { NextResponse } from 'next/server';
import { getGeminiRecommendations } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const { keywords, location } = await request.json();
        
        if (!keywords || !location) {
            return NextResponse.json(
                { 
                    success: false,
                    error: 'Keywords and location are required' 
                },
                { status: 400 }
            );
        }

        const results = await getGeminiRecommendations(keywords, location);
        return NextResponse.json(results);

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { 
                success: false,
                error: 'Failed to perform search'
            },
            { status: 500 }
        );
    }
} 