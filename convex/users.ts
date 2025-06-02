import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Helper function to generate a unique ID
function generateUid(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Query to get all users
export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Query to get user by uid
export const getUserByUid = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .first();
  },
});

// Mutation to clean up invalid data
export const cleanupInvalidUsers = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      if (!user.clerkId || !user.name || !user.createdAt || !user.uid) {
        await ctx.db.delete(user._id);
      }
    }
  },
});

export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Verify that the authenticated user matches the requested clerkId
    if (identity.subject !== args.clerkId) {
      throw new ConvexError("Unauthorized");
    }

    // Check if user already exists by clerkId
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      // Update existing user
      return await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
      });
    }

    // Generate a unique uid for new user
    const uid = generateUid();

    // Create new user
    return await ctx.db.insert("users", {
      uid,
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
  },
}); 