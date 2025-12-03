import React from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { BlurView } from 'expo-blur';

const TabBarBackground: React.FC = () => {
  if (Platform.OS === 'ios') {
    return <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />;
}

  return <View style={[StyleSheet.absoluteFill, styles.androidBackground]} />;
};

const styles = StyleSheet.create({
  androidBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
},
});

export default TabBarBackground;