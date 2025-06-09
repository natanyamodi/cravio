import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Stores a search query and its results in the database
 * Used when a user performs a restaurant search
 */
export const storeSearchQuery = mutation({
  args: {
    userId: v.id("users"),
    keywords: v.array(v.string()),
    location: v.string(),
    searchResults: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { userId, keywords, location, searchResults } = args;

    // Store the search query with results
    return await ctx.db.insert("search_queries", {
      query_id: crypto.randomUUID(),
      user_id: userId,
      keywords,
      location,
      timestamp: Date.now(),
      search_results: searchResults,
    });
  },
}); 