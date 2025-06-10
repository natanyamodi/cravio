import { mutation, query } from "./_generated/server";
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

    // Generate query_id first
    const query_id = crypto.randomUUID();

    // Store the search query with results
    await ctx.db.insert("search_queries", {
      query_id,
      user_id: userId,
      keywords,
      location,
      timestamp: Date.now(),
      search_results: searchResults,
    });

    // Return the query_id for navigation
    return query_id;
  },
});

export const getUserSearchQueries = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    
    // Get all search queries for the user, ordered by timestamp (newest first)
    const queries = await ctx.db
      .query("search_queries")
      .withIndex("by_user", (q) => q.eq("user_id", userId))
      .order("desc")
      .collect();

    return queries;
  },
});

export const deleteSearchQuery = mutation({
  args: {
    queryId: v.string(),
  },
  handler: async (ctx, args) => {
    const { queryId } = args;
    
    // Find and delete the search query
    const query = await ctx.db
      .query("search_queries")
      .filter((q) => q.eq(q.field("query_id"), queryId))
      .first();
      
    if (query) {
      await ctx.db.delete(query._id);
    }
    
    return query;
  },
});

export const getSearchQueryById = query({
  args: {
    queryId: v.string(),
  },
  handler: async (ctx, args) => {
    const { queryId } = args;
    
    // Get the specific search query
    const query = await ctx.db
      .query("search_queries")
      .filter((q) => q.eq(q.field("query_id"), queryId))
      .first();
      
    return query;
  },
}); 