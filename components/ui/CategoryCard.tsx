import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image 
        source={{ uri: category.imageUrl }} 
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.productCount}>{category.productCount} products</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
});