import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const storeSearchQuery = mutation({
  args: {
    userId: v.id("users"),
    keywords: v.array(v.string()),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, keywords, location } = args;

    // Generate a unique query ID
    const queryId = crypto.randomUUID();

    // Store the search query
    return await ctx.db.insert("search_queries", {
      query_id: queryId,
      user_id: userId,
      keywords,
      location,
      timestamp: Date.now(),
    });
  },
});

export const storeLocation = mutation({
    args: {
        latitude: v.number(),
        longitude: v.number(),
        area: v.string(),
        city: v.string(),
        state: v.string(),
        country: v.string(),
        formatted: v.string(),
        postcode: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        // Store the location data
        const locationId = await ctx.db.insert("locations", {
            userId,
            latitude: args.latitude,
            longitude: args.longitude,
            area: args.area,
            city: args.city,
            state: args.state,
            country: args.country,
            formatted: args.formatted,
            postcode: args.postcode,
            createdAt: new Date().toISOString(),
        });

        return locationId;
    },
}); 