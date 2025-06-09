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
});