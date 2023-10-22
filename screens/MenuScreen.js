import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import days from "./days.json"

const MenuScreen = () => {
  const [currentDayIndex, setCurrentDayIndex]  = useState(new Date().getDay());
    const [currentDayName, setCurrentDayName] = useState([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
  const getCurrentDayMenu = () => {
    
    return days[currentDayName];
  };

  const currentDayMenu = getCurrentDayMenu();

  const toggleCategory = (day, category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [category]: !prev[day]?.[category],
      },
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.Name}</Text>
      {item.Image && (
        <Image
          source={{ uri: item.Image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      )}
    </View>
  );

  const renderDay = (day, category) => (
    <View key={day} style={styles.dayContainer}>
      
        <Text style={styles.dayHeaderText}>{category}</Text>
        
      {days[day]?.[category].map((item, itemIndex) => (
        <TouchableOpacity
          key={itemIndex}
          style={styles.itemTouchable}
          onPress={() => {}}
        >
          {renderItem({ item })}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderColumn = () => (
    <View style={styles.column}>
      {renderDay(currentDayName[currentDayIndex], "Breakfast")}
      {renderDay(currentDayName[currentDayIndex], "Lunch")}
      {renderDay(currentDayName[currentDayIndex], "Snacks")}
      {renderDay(currentDayName[currentDayIndex], "Dinner")}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.columnsContainer}>{renderColumn()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  columnWithMargin: {
    marginRight: 16, // Add margin between columns
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  dayHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemTouchable: {
    marginBottom: 4,
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemImage: {
    width: "90%",
    height: "auto", // This will be set to a fixed height below
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default MenuScreen;
