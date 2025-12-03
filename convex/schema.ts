import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    category: v.string(),
    brand: v.string(),
    imageUrl: v.string(),
    images: v.array(v.string()),
    inStock: v.boolean(),
    stockQuantity: v.number(),
    rating: v.number(),
    reviewCount: v.number(),
    tags: v.array(v.string()),
    isDigital: v.boolean(),
    featured: v.boolean(),
  })
    .index("by_category", ["category"])
    .index("by_brand", ["brand"])
    .index("by_featured", ["featured"])
    .index("by_rating", ["rating"]),

  categories: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    productCount: v.number(),
  }),

  brands: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    website: v.optional(v.string()),
    verified: v.boolean(),
  }),

  cart: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    selectedVariant: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  favorites: defineTable({
    userId: v.string(),
    productId: v.id("products"),
  }).index("by_user", ["userId"]),

  orders: defineTable({
    userId: v.string(),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
      name: v.string(),
    })),
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.object({
      fullName: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.string(),
  }).index("by_user", ["userId"]),

  reviews: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    rating: v.number(),
    comment: v.string(),
    verified: v.boolean(),
    helpful: v.number(),
  }).index("by_product", ["productId"])
    .index("by_user", ["userId"]),
});