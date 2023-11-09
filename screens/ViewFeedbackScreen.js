import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Dashboard = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [tok, settok] = useState(null);

  const handleStarPress = star => {
    setRating(star);
  };


  const loadPage = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      GoogleSignin.signIn()
        .then(userInfo => {
          const currentUser = GoogleSignin.getTokens().then(res => {
            const apiUrl = 'https://smartmess.iitdh.ac.in/api/auth/signin/android';
            const userData = {
              Email: userInfo.user.email,
              Username: userInfo.user.name,
              First_Name: userInfo.user.givenName,
              Last_Name: userInfo.user.familyName,
              Image: userInfo.user.photo,
            };
            axios
            .post(`${apiUrl}`, userData)
            .then(response => {
              console.log('ns res token', response.data.token);
              settok(response.data.token);
              const apiUrl = 'https://smartmess.iitdh.ac.in/api/manager/dashboard/allFoodItems';
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.data.token}`
              };
              axios.get(apiUrl, { headers })
                .then(response => {
                  setTimetableData(response.data);
                  console.log(response.data);
                })

                .catch(error => {
                  console.error('ns: Error fetching data:', error);
                });
            })
            .catch(error => {
              console.error('ns: Error:', error);
            });
          });
        })
        .catch(error => {
          console.error('.....' + JSON.stringify(error));
        });

      try {
        const userInfoString = JSON.stringify(usrInfo);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('userInfo', userInfoString);
      } catch (ee) {
        console.error('ns: Error storing user info:', ee);
      }
      console.log('ns: Successfully Loaded Menu Data');
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

  const handleSubmit = () => {
    //
  }

  useEffect(() => {
    loadPage();
  }, []);

  const handleFoodItemSubmit = async () => {
    if (selectedFoodItem && rating > 0) {
      const selectedItem = timetableData.find((foodItem) => foodItem.Name === selectedFoodItem);
      if (selectedItem) {
        console.log('Selected Food Item:', selectedItem);
      } else {
        console.log('Selected food item not found in the data');
      }
      console.log(rating);
      const fid = selectedItem.Id;
      try {
        const url = `https://smartmess.iitdh.ac.in/api/user/dashboard/giveRating`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tok}`,
          },
    
          body: JSON.stringify({
            fid,
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
    <View style={styles.container}>
     <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#212B36',
          margin: '5%',
        }}>
        Rate a Food Item
      </Text>
      {timetableData ? (
        <View style={{width:'80%'}}>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <TouchableOpacity
                key={starValue}
                onPress={() => handleStarPress(starValue)}>
                <Text
                  style={{
                    fontSize: 40, // Increase font size
                    color: starValue <= rating ? 'gold' : 'gray',
                  }}>
                  {starValue <= rating ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Picker
  selectedValue={selectedFoodItem}
  onValueChange={(itemValue) => setSelectedFoodItem(itemValue)}
  style={{backgroundColor:'#F0F0F0'}} // Apply a custom style
>
  <Picker.Item label="Select a Food Item" value={null} />
  {timetableData.map((foodItem) => (
    <Picker.Item
      key={foodItem.Id}
      label={foodItem.Name}
      value={foodItem.Name}
    />
  ))}
</Picker>
<TouchableOpacity
        style={{...styles.button, width: '30%'}}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
        </View>
      ) : (
        <Text style={{color:'#DDDDDD', margin:'5%'}}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Dashboard;