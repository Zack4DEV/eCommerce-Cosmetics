import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MendableAI } from '../../utils/mendableAI';

const AIProductRecommendations = ({ userPreferences }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [userPreferences]);

  const loadRecommendations = async () => {
    try {
      const aiRecommendations = await MendableAI.getProductRecommendations(userPreferences);
      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image
        source={{ uri: `https://source.unsplash.com/400x400/?cosmetics,${item.name}` }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.aiConfidenceContainer}>
          <Text style={styles.aiConfidence}>
            AI Confidence: {(item.aiConfidence * 100).toFixed(0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading AI Recommendations</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI-Powered Recommendations</Text>
      <FlatList
        data={recommendations}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  productCard: {
    width: 250,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  productDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 8,
  },
  aiConfidenceContainer: {
    backgroundColor: '#ecf0f1',
    padding: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  aiConfidence: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
  },
});

export default AIProductRecommendations;