import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCartItems = query({
  args: { userId: v.string() },
  returns: v.array(v.object({
    _id: v.id("cart"),
    _creationTime: v.number(),
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    selectedVariant: v.optional(v.string()),
    product: v.object({
      _id: v.id("products"),
      name: v.string(),
      price: v.number(),
      imageUrl: v.string(),
      inStock: v.boolean(),
    }),
  })),
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const result = [];
    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        result.push({
          ...item,
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            inStock: product.inStock,
          },
        });
      }
    }
    return result;
  },
});

export const addToCart = mutation({
  args: {
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    selectedVariant: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .first();

    if (existingItem) {
      // Update quantity
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
    } else {
      // Add new item
      await ctx.db.insert("cart", {
        userId: args.userId,
        productId: args.productId,
        quantity: args.quantity,
        selectedVariant: args.selectedVariant,
      });
    }
    return null;
  },
});

export const updateCartItem = mutation({
  args: {
    cartItemId: v.id("cart"),
    quantity: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.cartItemId);
    } else {
      await ctx.db.patch(args.cartItemId, {
        quantity: args.quantity,
      });
    }
    return null;
  },
});

export const removeFromCart = mutation({
  args: { cartItemId: v.id("cart") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cartItemId);
    return null;
  },
});

export const clearCart = mutation({
  args: { userId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
    return null;
  },
});