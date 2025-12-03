import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  // 🔧 Mock data
  const cartItems = [
    { _id: "1", productName: "Lipstick", quantity: 2 },
    { _id: "2", productName: "Foundation", quantity: 1 },
  ];

  const featuredProducts = [
    { _id: "p1", name: "Moisturizer" },
    { _id: "p2", name: "Eyeliner" },
  ];

  const clearCart = () => {
    console.log("Cart cleared");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1611826585949-b0ccabd2c1a4?q=80&w=687",
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Demo User</Text>
          <Text style={styles.userEmail}>demo@example.com</Text>
        </View>

        {/* Cart Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Cart</Text>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item._id} style={styles.cartItem}>
                <Text style={styles.cartItemText}>
                  {item.productName} × {item.quantity}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Your cart is empty</Text>
          )}
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Ionicons name="trash-outline" size={20} color="white" />
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Favorites / Featured */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          {featuredProducts.map((product) => (
            <View key={product._id} style={styles.featuredItem}>
              <Text style={styles.featuredText}>{product.name}</Text>
            </View>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color="white" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollView: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
  settingsButton: { padding: 8 },
  userInfo: { alignItems: "center", marginBottom: 32 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  userName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 14, color: "#666", marginTop: 4 },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  cartItem: { paddingVertical: 8 },
  cartItemText: { fontSize: 16, color: "#333" },
  emptyText: { fontSize: 14, color: "#999" },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  clearButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  featuredItem: { paddingVertical: 6 },
  featuredText: { fontSize: 14, color: "#333" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
