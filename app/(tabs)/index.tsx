import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "@/components/ui/ProductCard";
import SearchBar from "@/components/ui/SearchBar";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // 🔧 Mock data
  const featuredProducts: Product[] = [
    {
      _id: "1",
      name: "Lipstick",
      description: "Matte red lipstick",
      price: 19.99,
      category: "Makeup",
      brand: "BeautyCo",
      imageUrl: "https://placekitten.com/200/200",
      inStock: true,
      rating: 4.5,
      reviewCount: 120,
      featured: true,
    },
    {
      _id: "2",
      name: "Foundation",
      description: "Liquid foundation",
      price: 29.99,
      category: "Makeup",
      brand: "BeautyCo",
      imageUrl: "https://placekitten.com/201/200",
      inStock: true,
      rating: 4.2,
      reviewCount: 80,
      featured: true,
    },
  ];

  const categories: Category[] = [
    { _id: "c1", name: "Makeup", imageUrl: "https://images.unsplash.com/photo-1631214499500-2e34edcaccfe" },
    { _id: "c2", name: "Skincare", imageUrl: "https://images.unsplash.com/photo-1701271482230-5ecaec3cd3e1" },
    { _id: "c3", name: "Fragrance", imageUrl: "https://images.unsplash.com/photo-1511923199659-1c16881689de" },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product.name);
  };

  const renderFeaturedProduct = ({ item }: { item: Product }) => (
    <View style={styles.featuredProductCard}>
      <ProductCard
        product={item}
        onPress={() => {}}
        onAddToCart={() => handleAddToCart(item)}
        onToggleFavorite={() => {}}
        isFavorite={false}
      />
    </View>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} contentFit="cover" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Beauty Lover! 👋</Text>
            <Text style={styles.subtitle}>Discover amazing cosmetics</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search beauty products..."
        />

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop",
            }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Summer Sale</Text>
            <Text style={styles.heroSubtitle}>Up to 50% off on premium cosmetics</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderFeaturedProduct}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Digital Beauty Course</Text>
              <Text style={styles.offerDescription}>Learn professional makeup techniques</Text>
              <Text style={styles.offerPrice}>
                $99.99 <Text style={styles.originalOfferPrice}>$199.99</Text>
              </Text>
            </View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=120&h=120&fit=crop",
              }}
              style={styles.offerImage}
              contentFit="cover"
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
  },
  heroBanner: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  productsList: {
    paddingHorizontal: 16,
  },
  featuredProductCard: {
    marginRight: 16,
  },
  offerCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  offerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 8,
  },
  originalOfferPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
