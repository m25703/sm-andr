import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RatingsScreen = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [parsedData, setParsedData] = useState('');

  const _retrieveData = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfo');
      if (user !== null) {
        setUserInfo(user);
        setIsLoggedIn(true);
      }
      setParsedData(JSON.parse(user));
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };

  useEffect(() => {
    _retrieveData();

    const apiUrl = 'http://192.168.80.21:3000';
    axios
      .get(`${apiUrl}/foodItems`)
      .then(response => {
        const foodItems = response.data.foodItems;
        setFoodItems(foodItems);
        console.log('Successfully fetched items');
      })
      .catch(error => {
        console.log('Error fetching food items', error);
      });
  }, []);

  const [rating, setRating] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleStarPress = star => {
    setRating(star);
  };

  const handlePostSubmit = () => {
    if (!userInfo) {
      console.error('User info is missing.');
      return;
    }

    const postData = {
      User: parsedData.user.id,
      Rating: rating,
      FoodItem: selectedItem,
    };

    if (!rating || !selectedItem) {
      console.error('Rating and FoodItem are required.');
      return;
    }

    const apiUrl = 'http://192.168.80.21:3000';
    axios
      .post(`${apiUrl}/addRating`, postData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error creating post', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(starValue => (
          <TouchableOpacity
            key={starValue}
            onPress={() => handleStarPress(starValue)}>
            <Text
              style={{
                fontSize: 30,
                color: starValue <= rating ? 'gold' : 'gray',
              }}>
              {starValue <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
        style={styles.input}>
        <Picker.Item label="Select an item" value="" />
        {foodItems.map((item, index) => (
          <Picker.Item key={index} label={item.Name} value={item.Name} />
        ))}
      </Picker>
      <Button onPress={handlePostSubmit} title="Post Rating" color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default RatingsScreen;
