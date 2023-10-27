import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

import { UserType } from "../UserContext";

const RatingsScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);
  const { userId, setUserId } = useState("test2");
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);

  const [rating, setRating] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); // Use selectedItem instead of item
  const listofitems = ["ALOO MUTTER","ALOO PARATHA","ALOO RASEWALLA","ARHAR DAL","BANANA","BBJ","PICKLE","BHINDI FRY","BLACK CHANNA MASALA DRY","BLACK CHANNA SPROUTS","BOILED EGG","BOILED PEANUTS","BOILED SWEET CORN","BOURNVITA","BUTTERMILK","CABBAGE CAPSICUM DRY","CHANNA MASALA","CHAWALI MASALA","CHOLE","CHOLE MASALA","CHOPPED ONION & LEMON","COCONUT CHUTNEY","COFFEE","CORN FLAKES","CORN RICE","CURD","CURD RICE","DAHI WADA","DAL PALAK","DAL PANCHRATNA","DAL TADKA","EGG BHURJI","EGG BIRYANI","EGG CURRY","FRUIT CUSTARD","GAWAR MASALA DRY","GOBI MUTTER RASEWALLA","GREEN CHAWLI SUBZI","GREEN CHILLI & RED CHUTNEY","GREEN CHILLI / LEMON SLICES","GREEN CHUTNEY & DRY RED CHUTNEY","GREEN CHUTNEY & RED CHUTNEY","GREEN MOONG SPROUTS","GULAB JAMUN","ICE CREAM","KULFI","IDLI", "VADA","JEERA RICE","KALA JAMUN","KASHMIRI DUM ALOO","KHEER","LASSI","LEMON RICE","MANCHURIAN GRAVY","MANGO RASNA","MASALA DOSA","MASOOR DAL","MATKI MASALA DRY","MATKI SPROUTS","METHI PARATHA","MILK","MIX DAL","MIX VEG CURRY","MOONG DAL","MOONG DAL HALWA","MOONG MASALA DRY","MUSHROOM MASALA","OMELETTE","ONION FRIED RICE","ONION MASALA RICE","PAKODA","PANEER CHILLI","PANEER KOHLAPURI","PANEER TAWA MASALA","PAV BHAJI","PLAIN RICE","PLAIN ROTI / BUTTER ROTI","PLAIN ROTI / FULKA ROTI","POHA","POORI","RAITA","RAJMA MASALA","RASAM","RASNA","RED CHUTNEY","SALAD","PAPAD","CHUTNEY","SAMBHAR","SAMOSA","SEV / NAMKEEN","SOYA CHUNKS MASALA DRY","TEA","TOMATO RICE","TOOR DAL","TORAI CHANA DRY","UPMA / SHEERA","VADA PAV","VEG BIRYANI","VEG CUTLET","VEG KADHAI GRAVY","VEG KORMA","VEG MAGGI","VEG PULAO","VEG RAITA"];

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handlePostSubmit = () => {
    console.log(userId);
    const postData = {
      userId,
    };
    if (rating.length === 0 || selectedItem.length === 0) return;
    if (rating) {
      postData.rating = rating;
    }
    if (selectedItem) {
      postData.item = selectedItem; // Use selectedItem instead of item
    }

    axios
      .post("http://10.196.118.102:3000/create-rating", postData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((starValue) => (
          <TouchableOpacity key={starValue} onPress={() => handleStarPress(starValue)}>
            <Icon
              name={starValue <= rating ? 'star' : 'star-o'}
              size={30}
              color={starValue <= rating ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select an item" value="" />
        {listofitems.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      <Button
        onPress={handlePostSubmit}
        title="Post"
        color="#007BFF" // Set your preferred button color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default RatingsScreen;
