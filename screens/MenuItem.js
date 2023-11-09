import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const MenuItem = ({ menu }) => (
  <View style={styles.menuItem}>
    <Image source={{ uri: menu.Image }} style={styles.image} />
    <Text style={{ fontWeight: 'bold', fontSize: 14, margin: 5, color:'darkslategrey' }}>{menu.Name}</Text>
  </View>
);

const styles = StyleSheet.create({
  menuItem: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden', // Clip the image within the container
  },
  image: {
    width: '100%',
    aspectRatio:1,
    resizeMode: 'cover',
    borderBottomLeftRadius: 0, // Remove the border radius on the bottom corners
    borderBottomRightRadius: 0,
    
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 5,
  },
});

export default MenuItem;
