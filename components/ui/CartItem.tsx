import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.product.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: item.product.imageUrl }} 
        style={styles.image}
        contentFit="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item._id)} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={18} color="#FF4757" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.price}>${item.product.price.toFixed(2)} each</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Ionicons 
                name="remove" 
                size={16} 
                color={item.quantity <= 1 ? "#CCC" : "#333"} 
              />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item._id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtotal}>${subtotal.toFixed(2)}</Text>
        </View>
        
        {!item.product.inStock && (
          <Text style={styles.outOfStock}>Out of stock</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 8,
    minWidth: 32,
    textAlign: 'center',
  },
  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  outOfStock: {
    color: '#FF4757',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});