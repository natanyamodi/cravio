import { tavily } from "@tavily/core";

interface SearchResult {
  query: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
  responseTime: number;
}

export default async function getSearchResults(queries: string[]): Promise<SearchResult[]> {
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

  try {
    // Execute each query in parallel
    const searchPromises = queries.map(async (query) => {
      const result = await tvly.search(query, {
        search_depth: "advanced",
        include_domains: ["zomato.com", "swiggy.com", "google.com"],
        include_answer: true,
        include_raw_content: false,
        max_results: 5, 
      });
      return result;
    });

    // Wait for all queries to complete
    const results = await Promise.all(searchPromises);
    return results;
  } catch (error) {
    console.error("Tavily search error:", error);
    throw error;
  }
}