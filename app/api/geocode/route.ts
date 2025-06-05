import { NextResponse } from 'next/server';

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

export async function POST(request: Request) {
    try {
        const { latitude, longitude } = await request.json();

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: 'Latitude and longitude are required' },
                { status: 400 }
            );
        }

        if (!OPENCAGE_API_KEY) {
            return NextResponse.json(
                { error: 'OpenCage API key is not configured' },
                { status: 500 }
            );
        }

        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const components = result.components;

            // Extract relevant address components
            const address = {
                area: components.suburb || components.neighbourhood || components.city_district || '',
                city: components.city || components.town || components.village || '',
                state: components.state || components.state_code || '',
                country: components.country || '',
                formatted: result.formatted || '',
                postcode: components.postcode || '',
            };

            return NextResponse.json(address);
        }

        return NextResponse.json(
            { error: 'No results found' },
            { status: 404 }
        );

    } catch (error) {
        console.error('Geocoding error:', error);
        return NextResponse.json(
            { error: 'Failed to process geocoding request' },
            { status: 500 }
        );
    }
} 