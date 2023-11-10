import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const GiveRatingScreen = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [selectedFoodItemImage, setSelectedFoodItemImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [tok, settok] = useState(null);

  const handleStarPress = star => {
    setRating(star);
  };

  const loadPage = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getTokens();
      const apiUrl = 'https://smartmess.iitdh.ac.in/api/auth/signin/android';
      const userData = {
        Email: usrInfo.user.email,
        Username: usrInfo.user.name,
        First_Name: usrInfo.user.givenName,
        Last_Name: usrInfo.user.familyName,
        Image: usrInfo.user.photo,
      };
      const response = await axios.post(apiUrl, userData);
      console.log('ns res token', response.data.token);
      settok(response.data.token);
      const dashboardUrl = 'https://smartmess.iitdh.ac.in/api/manager/dashboard/allFoodItems';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${response.data.token}`,
      };
      const dashboardResponse = await axios.get(dashboardUrl, { headers });
      setTimetableData(dashboardResponse.data);
      console.log(dashboardResponse.data);
      const userInfoString = JSON.stringify(usrInfo);
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('userInfo', userInfoString);
      console.log('ns: Successfully Loaded Menu Data');
    } catch (error) {
      console.error(error, error.code);
    }
  };
  
  useEffect(() => {
    loadPage();
  }, []);

  const handleFoodItemSubmit = async () => {
    if (selectedFoodItem && rating > 0) {
      const selectedItem = timetableData.find(
        foodItem => foodItem.Name === selectedFoodItem,
      );
      if (selectedItem) {
        console.log('Selected Food Item:', selectedItem);
      } else {
        console.log('Selected food item not found in the data');
      }
      console.log(rating);
      const fid = selectedItem.Id;
      try {
        const url =
          'https://smartmess.iitdh.ac.in/api/user/dashboard/giveRating';
        const foodId = fid;
        console.log(rating);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tok}`,
          },
          body: JSON.stringify({
            foodId,
            rating,
          }),
        });
        console.log(response);
        return response;
      } catch (err) {
        console.log(err);
      }
      return null;
    } else {
      console.log('No food item selected');
    }
  };

  return (
    <>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#212B36',
          padding: '5%',
          backgroundColor: 'white',
        }}>
        Rate a Food Item
      </Text>
      <View style={styles.container}>
        {timetableData ? (
          <View style={{width: '80%'}}>
            {selectedFoodItemImage ? (
              <Image
                source={{uri: selectedFoodItemImage}}
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                  margin: 10,
                }}
              />
            ) : (
              <Text>Select an item</Text>
            )}
            <Picker
              selectedValue={selectedFoodItem}
              onValueChange={itemValue => {
                setSelectedFoodItem(itemValue); // Set the selected food item
                // Set the corresponding image URL here
                // setSelectedFoodItemImage
                const selectedItem = timetableData.find(
                  foodItem => foodItem.Name === itemValue,
                );
                console.log(selectedItem)
                console.log(selectedFoodItem)
                console.log(selectedFoodItemImage)
                if (selectedItem) {
                  setSelectedFoodItemImage(selectedItem.Img);
                }
              }}
              style={{backgroundColor: '#F0F0F0'}}>
              <Picker.Item label="Select a Food Item" value={null} />
              {timetableData.map(foodItem => (
                <Picker.Item
                  key={foodItem.Id}
                  label={foodItem.Name}
                  value={foodItem.Name}
                />
              ))}
            </Picker>

            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map(starValue => (
                <TouchableOpacity
                  key={starValue}
                  onPress={() => handleStarPress(starValue)}>
                  <Text
                    style={{
                      fontSize: 40,
                      color: starValue <= rating ? 'gold' : 'gray',
                    }}>
                    {starValue <= rating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={{...styles.button, width: '30%', alignSelf: 'center'}}
              onPress={handleFoodItemSubmit}>
              <Text style={styles.buttonText}>Rate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{color: '#DDDDDD', margin: '5%'}}>Loading...</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GiveRatingScreen;
