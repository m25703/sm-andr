import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
const GridView = ({ data, numColumns, renderItem }) => {
    // Filter out null items from the data array
    const filteredData = data.filter(item => item !== null);
  
    return (
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={index % numColumns === 0 ? styles.gridItemFirst : styles.gridItem}>
            {renderItem(item)}
          </View>
        )}
        numColumns={numColumns}
      />
    );
  };
  

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
  },
  gridItemFirst: {
    flex: 1,
    marginLeft: 10, // Adjust the margin for the first item
    marginRight: 5,
  },
  gridItemLast: {
    flex: 1,
    marginLeft: 5,
    marginRight: 10, // Adjust the margin for the last item
  },
});

export default GridView;
