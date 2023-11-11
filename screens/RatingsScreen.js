import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, ActivityIndicator} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './styles.RatingsScreen';

const RatingsScreen = ({navigation}) => {
  const [fooditemdata, setfooditemdata] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadPage = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const apiUrl = 'https://smartmess.iitdh.ac.in/api/auth/signin/android';
      const userData = {
        Email: userInfo.user.email,
        Username: userInfo.user.name,
        First_Name: userInfo.user.givenName,
        Last_Name: userInfo.user.familyName,
        Image: userInfo.user.photo,
      };

      try {
        const response = await axios.post(apiUrl, userData);
        console.log('ns res token', response.data.token);
        const tkn = response.data.token;

        const foodItemsUrl =
          'https://smartmess.iitdh.ac.in/api/manager/dashboard/allFoodItems';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        };
        const foodItemsResponse = await axios.get(foodItemsUrl, {headers});
        setfooditemdata(foodItemsResponse.data);
        console.log(foodItemsResponse.data);

        const itemId = '6547c18c0593ef2642c59302';
        const ratingApiUrl =
          'https://smartmess.iitdh.ac.in/api/manager/dashboard/getItemRating';
        const ratingHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        };

        const ratingResponse = await axios.post(
          ratingApiUrl,
          {itemId},
          {headers: ratingHeaders},
        );
        const filteredRatingResponses = ratingResponse.data.filter(
          item => item.Rating !== 0,
        );
        setRatingResponses(filteredRatingResponses);
      } catch (error) {
        console.error(`Error fetching ratings for Item ${itemId}:`, error);
      }
      setLoading(false);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error(error, error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error(error, error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error(error, error.code);
      } else {
        console.error(error, error.code);
      }
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const [ratingResponses, setRatingResponses] = useState([]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#212B36',
          margin: '2%',
          marginBottom: '5%',
        }}>
        Ratings
      </Text>
      {loading ? ( // Display a loading indicator when loading is true
        <ActivityIndicator size="large" color="#212B36" />
      ) : ratingResponses ? (
        <FlatList
          data={ratingResponses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.foodItemContainer}>
              <Image
                source={{
                  uri: fooditemdata.find(
                    (itemData) => itemData.Id === item.FoodItem
                  )?.Img,
                }}
                style={styles.foodItemImage}
              />
              <View style={styles.foodItemInfo}>
                <Text style={styles.foodItemName}>
                  {
                    fooditemdata.find((itemData) => itemData.Id === item.FoodItem)
                      ?.Name
                  }
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.foodItemRatingLabel}>Rating:</Text>
                  <Text style={styles.foodItemRatingValue}>
                    {item.Rating.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: '#DDDDDD', margin: '5%' }}>Loading...</Text>
      )}
    </View>
  );
};

export default RatingsScreen;