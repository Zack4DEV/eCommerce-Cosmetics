import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CategoryCard from '@/components/ui/CategoryCard';

interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export default function CategoriesScreen() {
  const categories = useQuery(api.categories.getAllCategories);

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => {
        // Navigate to category products
        console.log('Navigate to category:', item.name);
      }}
    />
  );

  if (!categories) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore our beauty collection</Text>
      </View>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  grid: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});