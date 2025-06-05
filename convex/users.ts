import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Get the current timestamp
    const now = Date.now();

    // Check if we've already stored this user before
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("user_id", identity.subject))
      .unique();

    if (user !== null) {
      // If we've seen this identity before, update the user info
      await ctx.db.patch(user._id, {
        name: identity.name ?? user.name,
        email: identity.email ?? user.email,
        last_logged_in: now,
      });
      return user._id;
    }

    // If it's a new user, create a new user document
    return await ctx.db.insert("users", {
      user_id: identity.subject, // Clerk's unique user ID
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      last_logged_in: now,
    });
  },
});

export const getUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.userId))
      .unique();
    return user?._id;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("user_id", args.clerkId))
      .unique();
    return user;
  },
});