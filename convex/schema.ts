import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    user_id: v.string(), // Clerk's unique user ID (primary identifier)
    name: v.string(),
    email: v.string(),
    last_logged_in: v.number(), // Unix timestamp for last login
  })
    .index("by_user_id", ["user_id"])
    .index("by_email", ["email"]),

  search_queries: defineTable({
    query_id: v.string(), // Unique ID
    user_id: v.id("users"), // Foreign key to users table
    keywords: v.array(v.string()),
    location: v.optional(v.string()),
    timestamp: v.number(), // Unix timestamp
    search_results: v.optional(v.any()), // Will store search results when implemented
  })
    .index("by_user", ["user_id"])
    .index("by_timestamp", ["timestamp"]),

  places: defineTable({
    query_id: v.id("search_queries"),
    place_id: v.string(), // Unique ID or 3rd-party place ID
    name: v.string(),
    address: v.string(),
    contact: v.optional(v.string()),
    website: v.optional(v.string()),
    location: v.string(), // City or coordinates
    categories: v.array(v.string()),
    reviews_raw: v.optional(v.array(v.string())),
    summary_review: v.optional(v.string()),
    rating: v.optional(v.number()),
    menu_links: v.optional(v.array(v.string())),
    offers: v.optional(v.array(v.string())),
    source: v.string(),
    // Preserving existing fields that might be useful
    description: v.optional(v.string()),
    priceLevel: v.optional(v.number()),
    created_at: v.optional(v.number()),
  })
    .index("by_place_id", ["place_id"])
    .index("by_location", ["location"])
    .index("by_categories", ["categories"])
    .index("by_source", ["source"]),

  locations: defineTable({
    userId: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    area: v.string(),
    city: v.string(),
    state: v.string(),
    country: v.string(),
    formatted: v.string(),
    postcode: v.string(),
    createdAt: v.string(),
  }),
});