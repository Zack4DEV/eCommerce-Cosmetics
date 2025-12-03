import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllProducts = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("products"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getFeaturedProducts = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("products"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  returns: v.array(v.object({
    _id: v.id("products"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const searchProducts = query({
  args: { searchTerm: v.string() },
  returns: v.array(v.object({
    _id: v.id("products"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx, args) => {
    const allProducts = await ctx.db.query("products").collect();
    const searchTerm = args.searchTerm.toLowerCase();
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },
});

export const getProduct = query({
  args: { productId: v.id("products") },
  returns: v.union(
    v.object({
      _id: v.id("products"),
      _creationTime: v.number(),
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
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

export const seedProducts = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Check if products already exist
    const existingProducts = await ctx.db.query("products").take(1);
    if (existingProducts.length > 0) {
      return null;
    }

    const products = [
      {
        name: "Luxury Matte Lipstick Set",
        description: "Premium matte lipstick collection with long-lasting formula. Perfect for all occasions.",
        price: 49.99,
        originalPrice: 79.99,
        category: "Lipstick",
        brand: "Glamour Beauty",
        imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 150,
        rating: 4.8,
        reviewCount: 324,
        tags: ["matte", "long-lasting", "luxury", "set"],
        isDigital: false,
        featured: true,
      },
      {
        name: "Hydrating Face Serum",
        description: "Advanced hydrating serum with hyaluronic acid. Instantly plumps and moisturizes skin.",
        price: 34.99,
        originalPrice: 54.99,
        category: "Skincare",
        brand: "Pure Glow",
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556228149-d75c4dc86bc5?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 89,
        rating: 4.9,
        reviewCount: 567,
        tags: ["hydrating", "hyaluronic acid", "anti-aging", "serum"],
        isDigital: false,
        featured: true,
      },
      {
        name: "Professional Eyeshadow Palette",
        description: "48-color professional eyeshadow palette with shimmer and matte finishes.",
        price: 29.99,
        category: "Eyeshadow",
        brand: "Color Pro",
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 234,
        rating: 4.7,
        reviewCount: 892,
        tags: ["eyeshadow", "palette", "professional", "shimmer", "matte"],
        isDigital: false,
        featured: false,
      },
      {
        name: "Makeup Masterclass Digital Course",
        description: "Complete digital makeup course with 50+ video tutorials from professional artists.",
        price: 99.99,
        originalPrice: 199.99,
        category: "Digital",
        brand: "Beauty Academy",
        imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 999,
        rating: 4.9,
        reviewCount: 156,
        tags: ["digital", "course", "tutorial", "professional", "online"],
        isDigital: true,
        featured: true,
      },
      {
        name: "Vitamin C Brightening Cream",
        description: "Brightening cream infused with Vitamin C to even skin tone and reduce dark spots.",
        price: 42.99,
        category: "Skincare",
        brand: "Pure Glow",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556228149-d75c4dc86bc5?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 67,
        rating: 4.6,
        reviewCount: 243,
        tags: ["vitamin c", "brightening", "anti-aging", "cream"],
        isDigital: false,
        featured: false,
      },
      {
        name: "Waterproof Mascara",
        description: "Long-lasting waterproof mascara that lengthens and volumizes lashes.",
        price: 18.99,
        originalPrice: 28.99,
        category: "Mascara",
        brand: "Lash Perfect",
        imageUrl: "https://images.unsplash.com/photo-1631214540242-6c1e83fe3b8a?w=400&h=400&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1631214540242-6c1e83fe3b8a?w=400&h=400&fit=crop"
        ],
        inStock: true,
        stockQuantity: 445,
        rating: 4.5,
        reviewCount: 678,
        tags: ["waterproof", "mascara", "volumizing", "lengthening"],
        isDigital: false,
        featured: false,
      }
    ];

    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return null;
  },
});