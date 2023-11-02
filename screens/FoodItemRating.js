import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodItemRating = ({ foodItem, averageRating }) => {
  return (
    <View style={styles.ratingItem}>
      <Text>{foodItem}</Text>
      <Text>Average Rating: {averageRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default FoodItemRating;
