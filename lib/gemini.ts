import { GoogleGenerativeAI } from "@google/generative-ai";
import { QUERY_PROMPT, SYSTEM_PROMPT } from "./prompt";
import getSearchResults from "./tavily";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface TavilyResult {
    title: string;
    url: string;
    content: string;
    score: number;
}

interface SearchResult {
    query: string;
    results: TavilyResult[];
    responseTime: number;
}

// Step 1: Generate search queries
async function generateSearchQueries(keywords: string[], location: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Create the prompt for query generation
        const userPrompt = `Keywords: ${JSON.stringify(keywords)}\nLocation: ${location}`;
        const fullPrompt = `${QUERY_PROMPT}\n\nUser Input:\n${userPrompt}`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            generationConfig: {
                temperature: 0.3, // Lower temperature for more focused queries
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });

        const response = await result.response;
        const text = response.text();
        
        if (!text) {
            throw new Error("No queries generated");
        }

        // Clean the response text to extract just the JSON array
        let jsonStr = text.trim();
        
        // Remove markdown code block if present
        jsonStr = jsonStr.replace(/```json\n?|\n?```/g, '');
        
        // Remove any leading/trailing whitespace
        jsonStr = jsonStr.trim();
        
        console.log("\n🔧 Raw Gemini Response:", text);
        console.log("\n🧹 Cleaned JSON String:", jsonStr);

        // Parse the JSON array from the response
        const queries = JSON.parse(jsonStr);
        if (!Array.isArray(queries) || queries.length !== 5) {
            throw new Error(`Invalid query format generated. Expected 5 queries, got ${queries.length}`);
        }

        // Validate each query is a string
        if (!queries.every(q => typeof q === 'string')) {
            throw new Error("Invalid query format: all queries must be strings");
        }

        return {
            success: true,
            data: queries as string[]
        };
    } catch (error) {
        console.error("\n❌ Query generation error:", error);
        console.error("\n📝 Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to generate search queries" 
        };
    }
}

// Step 2: Parse search results
async function parseSearchResults(searchResults: SearchResult[], keywords: string[], location: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Pass the raw search results as JSON
        const searchData = JSON.stringify(searchResults, null, 2);
        const userPrompt = `Here are the search results about restaurants in ${location}:\n\n${searchData}\n\n` +
            `Based on these results, please generate recommendations that match these preferences: ${keywords.join(', ')}.`;

        const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
        });

        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("No recommendations generated");
        }

        return {
            success: true,
            data: text
        };
    } catch (error) {
        console.error("Gemini parsing error:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to parse search results" 
        };
    }
}

// Main function to orchestrate the entire search process
export async function getGeminiRecommendations(keywords: string[], location: string) {
    try {
        console.group('🔍 Search Process Log');
        console.log('📍 Location:', location);
        console.log('🔑 Keywords:', keywords);

        // Step 1: Generate search queries
        console.group('📝 Query Generation');
        const queryResult = await generateSearchQueries(keywords, location);
        if (!queryResult.success || !queryResult.data) {
            throw new Error(queryResult.error);
        }
        
        // Log raw queries with formatting
        console.log('\n🔍 Generated Search Queries:');
        queryResult.data.forEach((query, index) => {
            console.log(`\nQuery ${index + 1}:`);
            console.log('----------------------------------------');
            console.log(query);
            console.log('----------------------------------------');
        });
        console.groupEnd();

        // Step 2: Execute Tavily searches
        console.group('🌐 Tavily Search Execution');
        const searchResults = await getSearchResults(queryResult.data);
        
        // Log raw Tavily results with formatting
        console.log('\n📊 Raw Tavily Search Results:');
        searchResults.forEach((resultSet: SearchResult, index: number) => {
            console.log(`\nResult Set ${index + 1} (Query: ${resultSet.query}):`);
            console.log('========================================');
            resultSet.results.forEach((result: TavilyResult, resultIndex: number) => {
                console.log(`\nResult ${resultIndex + 1}:`);
                console.log('----------------------------------------');
                console.log('Title:', result.title);
                console.log('URL:', result.url);
                console.log('Content:', result.content);
                console.log('Score:', result.score);
                console.log('----------------------------------------');
            });
            console.log('========================================');
        });
        console.groupEnd();
        
        // Step 3: Parse the results
        console.group('🤖 Gemini Parsing');
        const parseResult = await parseSearchResults(searchResults, keywords, location);
        if (!parseResult.success) {
            throw new Error(parseResult.error);
        }
        console.log('\n🎯 Final Parsed Results:');
        console.log(parseResult.data);
        console.groupEnd();

        console.groupEnd(); // End main search process log

        return {
            success: true,
            data: parseResult.data,
            queries: queryResult.data,
            rawSearchResults: searchResults
        };
    } catch (error) {
        console.error('\n❌ Search Process Error:', error);
        console.error('\n📝 Error Details:', {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        });
        console.groupEnd(); // Ensure group is closed even on error
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to complete search process"
        };
    }
} 