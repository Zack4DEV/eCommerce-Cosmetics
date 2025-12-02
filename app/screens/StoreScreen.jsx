import React, { useState, useRef } from 'react';
import {
  View,
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
TextInput,
FlatList,
Modal,
} from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import AIAssistant from '../components/common/AIAssistant';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const StoreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIAssistantVisible, setAIAssistantVisible] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductCard = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Collection</Text>
          <View style={styles.searchBar}>
            <MaterialIcons
              name="search"
              size={24}
              color={COLORS.text}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <FlatList
            data={products}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.allProductsSection}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.assistantButton}
        onPress={() => setAIAssistantVisible(true)}
      >
        <MaterialIcons name="assistant" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAIAssistantVisible}
        onRequestClose={() => setAIAssistantVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.assistantContainer}>
            <AIAssistant />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAIAssistantVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: 'white',
  },
  title: {
    ...FONTS.h1,
    marginBottom: SIZES.padding,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
  },
  searchIcon: {
    marginHorizontal: SIZES.base,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body,
  },
  featuredSection: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h2,
    marginBottom: SIZES.padding,
  },
  allProductsSection: {
    padding: SIZES.padding,
  },
  assistantButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: SIZES.padding,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  closeButtonText: {
    color: 'white',
    ...FONTS.body,
    fontWeight: '600',
  },
});

export default StoreScreen;
