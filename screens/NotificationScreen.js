import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


import YourComponent from './yc1';
import YourComponent2 from './yc2';
import YourComponent3 from './yc3';
import CustomButton from './cb';


import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';


const ComplaintsScreen = () => {
  const [fooditemdata, setfooditemdata] = useState(null);

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
              const apiUrl = 'https://smartmess.iitdh.ac.in/api/manager/dashboard/allFoodItems';
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.data.token}`
              };
              axios.get(apiUrl, { headers })
                .then(response => {
                  setfooditemdata(response.data);
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

  useEffect(() => {
    loadPage()
    }, []);

  const [visible, setVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const toggleHelloBox = () => {
    setVisible(!visible);
    setFormVisible(false);
    setImageVisible(false);
  };

  const toggleForm = () => {
    setVisible(false);
    setFormVisible(!formVisible);
    setImageVisible(false);
  };

  const toggleImage = () => {
    setVisible(false);
    setFormVisible(false);
    setImageVisible(!imageVisible);
  };

  return (
    <View
      style={{
        margin: 0,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginBottom: '5%',
        }}>
        <CustomButton title="Create A New Food Item" onPress={toggleHelloBox} />
        <CustomButton title="Add Food To Time Table" onPress={toggleForm} />
        <CustomButton
          title="Delete Food From Time Table"
          onPress={toggleImage}
        />
      </View>

      {visible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Create New Food Item{' '}
          </Text>
          <YourComponent />
        </View>
      )}

      {formVisible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Add Food To Time Table
          </Text>
          {fooditemdata ? (
            <YourComponent2 fooditemdata={fooditemdata} />
          ) : (
            <Text style={{color:'#DDDDDD', margin:'5%'}}> Loading... </Text>
          )}
        </View>
      )}

      {imageVisible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Delete Food From Time Table{' '}
          </Text>
          {fooditemdata.length > 0 ? (
            <YourComponent3 fooditemdata={fooditemdata} />
          ) : (
            <Text style={{color:'#DDDDDD', margin:'5%'}}>Loading...</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ComplaintsScreen;
