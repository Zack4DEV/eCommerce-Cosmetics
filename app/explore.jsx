import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from './constants/theme';

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
  },
});

export default Explore;
