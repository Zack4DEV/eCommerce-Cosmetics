import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllCategories = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("categories"),
    _creationTime: v.number(),
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    productCount: v.number(),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const seedCategories = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Check if categories already exist
    const existingCategories = await ctx.db.query("categories").take(1);
    if (existingCategories.length > 0) {
      return null;
    }

    const categories = [
      {
        name: "Skincare",
        description: "Premium skincare products for all skin types",
        imageUrl: "https://plus.unsplash.com/premium_photo-1703343321328-d727e75e0d20?w=300&h=200&fit=crop",
        productCount: 24,
      },
      {
        name: "Lipstick",
        description: "Luxury lipsticks in all shades and finishes",
        imageUrl: "https://images.unsplash.com/photo-1512207841927-e233f469a877?w=300&h=200&fit=crop",
        productCount: 18,
      },
      {
        name: "Eyeshadow",
        description: "Professional eyeshadow palettes and singles",
        imageUrl: "hhttps://images.unsplash.com/photo-1625093525885-282384697917?w=300&h=200&fit=crop",
        productCount: 15,
      },
      {
        name: "Mascara",
        description: "Volume and length enhancing mascaras",
        imageUrl: "https://images.unsplash.com/photo-1613966802194-d46a163af70d?w=300&h=200&fit=crop",
        productCount: 12,
      },
      {
        name: "Foundation",
        description: "Perfect coverage for every skin tone",
        imageUrl: "https://images.unsplash.com/photo-1598219062199-a940294982e7?w=300&h=200&fit=crop",
        productCount: 20,
      },
      {
        name: "Digital",
        description: "Digital beauty courses and tutorials",
        imageUrl: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=300&h=200&fit=crop",
        productCount: 8,
      }
    ];

    for (const category of categories) {
      await ctx.db.insert("categories", category);
    }

    return null;
  },
});