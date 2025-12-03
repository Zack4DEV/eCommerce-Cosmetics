// components/HapticTab.tsx
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, GestureResponderEvent } from "react-native";
import * as Haptics from "expo-haptics";

interface HapticTabProps {
  label: string;
  icon: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  isFocused?: boolean;
}

export function HapticTab({ label, icon, onPress, isFocused }: HapticTabProps) {
  const handlePress = (event: GestureResponderEvent) => {
    Haptics.selectionAsync();
    if (onPress) onPress(event);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isFocused && styles.focused]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.icon}>{icon}</View>
      <Text style={[styles.label, isFocused && styles.focusedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  focused: {
    backgroundColor: "#FFF0F0",
    borderRadius: 8,
  },
  icon: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: "#999",
  },
  focusedLabel: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
});
