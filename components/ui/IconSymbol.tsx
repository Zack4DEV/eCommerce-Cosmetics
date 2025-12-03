// components/ui/IconSymbol.tsx
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconSymbolProps {
  name: keyof typeof Ionicons.glyphMap;
  focused?: boolean;
}

export function IconSymbol({ name, focused }: IconSymbolProps) {
  return (
    <Ionicons
      name={name as any}
      size={24}
      color={focused ? "#FF6B6B" : "#999"}
    />
  );
}
