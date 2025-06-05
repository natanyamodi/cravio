import {tavily} from "@tavily/core"


// Step 1. Instantiating your Tavily client
export default async function getSearchResults(query: string) {
    const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// Step 2. Executing a search query
try {
    const searchResults = await tvly.search(query,{
      search_depth: "advanced",
      include_domains: ["zomato.com", "swiggy.com"],
      include_answer: true,
      include_raw_content: false,
      max_results: 20,
    });

    // Process the results to extract relevant information
    return searchResults;
  } catch (error) {
    console.error("Tavily search error:", error);
    throw error;
  }
}