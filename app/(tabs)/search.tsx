import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import SearchBar from '@/components/ui/SearchBar';
import ProductCard from '@/components/ui/ProductCard';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  imageUrl: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  isDigital: boolean;
  featured: boolean;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const allProducts = useQuery(api.products.getAllProducts);
  const addToCart = useMutation(api.cart.addToCart);

  useEffect(() => {
    if (!allProducts || searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setSearchResults(filtered);
  }, [searchQuery, allProducts]);

  const handleAddToCart = (product: Product) => {
    const userId = 'demo-user';
    addToCart({
      userId,
      productId: product._id,
      quantity: 1,
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <ProductCard
        product={item}
        onPress={() => {}}
        onAddToCart={() => handleAddToCart(item)}
        onToggleFavorite={() => {}}
        isFavorite={false}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>
        {searchQuery.trim() === '' ? 'Start Searching' : 'No Results Found'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery.trim() === '' 
          ? 'Search for your favorite beauty products' 
          : `No products found for "${searchQuery}"`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search beauty products..."
        showFilter={false}
      />

      {searchQuery.trim() !== '' && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {searchResults.length} results for "{searchQuery}"
          </Text>
        </View>
      )}
      
      <FlatList
        data={searchResults}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={searchResults.length > 0 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  grid: {
    padding: 16,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});