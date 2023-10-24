import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // place API call to get the user role

    const fetchUserRole = async () => {
      // const fetchedUserRole = 'admin';
      const fetchedUserRole = 'user';
      // const fetchedUserRole = 'manager';
      // const fetchedUserRole = 'guest';
      setUserRole(fetchedUserRole);
    };
    fetchUserRole();
  }, []);

  const navigation = useNavigation();

  const getIconDataForRole = role => {
    switch (role) {
      case 'admin':
        return [
          { name: 'star-outline', description: 'Ratings', screen: 'Ratings' },
          { name: 'alert-circle-outline', description: 'Complaints', screen: 'Complaints' },
          { name: 'settings-outline', description: 'Settings', screen: 'Settings' },
        ];
      case 'user':
        return [
          { name: 'restaurant-outline', description: 'View Menu', screen: 'Menu' },
          // { name: 'calendar-outline', description: 'Attendance', screen: 'Attendance' },
          // { name: 'card-outline', description: 'Payments', screen: 'Payments' },
          { name: 'star-outline', description: 'Ratings', screen: 'Ratings' },
          { name: 'notifications-outline', description: 'Notifications', screen: 'Notifications' },
          { name: 'fast-food-outline', description: 'Ongoing Meal', screen: 'Ongoing Meal' },
          { name: 'chatbubbles-outline', description: 'Feedback', screen: 'Feedback' },
          { name: 'chatbubble-ellipses-outline', description: 'View Feedback', screen: 'View Feedback' },
          // { name: 'settings-outline', description: 'Ratings', screen: 'Ratings' },
          { name: 'megaphone-outline', description: 'Create Announcement', screen: 'Create Announcement' },
          { name: 'settings-outline', description: 'Settings', screen: 'Settings' },
          // { name: 'alert-circle-outline', description: 'Complaints', screen: 'Complaints' },
          // { name: 'card-outline', description: 'Payments', screen: 'Payments' },
        ];
      case 'manager':
        return [
          { name: 'restaurant-outline', description: 'View Menu', screen: 'Menu' },
          { name: 'card-outline', description: 'Payments', screen: 'Payments' },
          { name: 'star-outline', description: 'Ratings', screen: 'Ratings' },
          { name: 'fast-food-outline', description: 'Ongoing Meal', screen: 'Ongoing Meal' },
          { name: 'megaphone-outline', description: 'Create Announcement', screen: 'Create Announcement' },
          { name: 'settings-outline', description: 'Settings', screen: 'Settings' },
        ];
      case 'guest':
        return [
          { name: 'restaurant-outline', description: 'View Menu', screen: 'Menu' },
          { name: 'fast-food-outline', description: 'Ongoing Meal', screen: 'Ongoing Meal' },
        ];
      default:
        return [];
    }
  };

  const iconData = getIconDataForRole(userRole);

  const renderIconBox = (iconName, description, screenName) => (
    <TouchableOpacity
      style={styles.iconBox}
      onPress={() => navigation.navigate(screenName)}
    >
      <Icon name={iconName} size={50} color="#4285F4" />
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );

  const renderIconGrid = () => (
    <View style={styles.iconGrid}>
      {iconData.map((data, index) => (
        <View key={index} style={styles.iconBoxContainer}>
          {renderIconBox(data.name, data.description, data.screen)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderIconGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconBoxContainer: {
    width: '48%',
    marginBottom: 20,
  },
  iconBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default DashboardScreen;