import {View, Text, Image, Button, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {set} from 'mongoose';

const SettingsScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '118779391236-kdlu7dnrcckgp5nl2jnsogqfqtsoejeo.apps.googleusercontent.com',
    });
  }, []);



  const getTimeTable = async tkn => {
    const apiUrl = 'https://smartmess.iitdh.ac.in/api/user/dashboard/timetable';
    console.log('tkn', tkn);
    let response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });

    response = await response.json();
    console.log('getTimeTable res: ', response);
    
    console.log("getTimeTable res 0:", response[0].Items[0]);
    return response;
  };

  const [tkn, setkn] = useState(null);
  const setTokenAsync = async () => {
    try {
      if(tkn!=null) {
      await AsyncStorage.setItem('tkn', tkn); // Use await here
      console.log('trying to set', tkn);
      const storedToken = await AsyncStorage.getItem('tkn'); // Use await here
      console.log('actual:', storedToken); // Use the storedToken variable
      // navigation.navigate('Main'); 
    }
    } catch (error) {
      console.log('Error setting or retrieving async token:', error);
    }
  };

  const [storedData, setStoredData] = useState(null);

  // useEffect(() => {
  //   // Retrieve data from AsyncStorage when the component mounts
  //   getDataFromAsyncStorage();
  // }, []);

  const setDataInAsyncStorage = async (value) => {
    try {
      await AsyncStorage.setItem('myKey', value);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getDataFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('myKey');
      if (value !== null) {
        setStoredData(value);
        console.log('Data retrieved successfully:', value);
      } else {
        console.log('Data does not exist in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      navigation.navigate('Main');
      GoogleSignin.signIn()
        .then(userInfo => {
          const currentUser = GoogleSignin.getTokens().then(res => {
            // console.log(res); //<-------Get accessToken
            // console.log(userInfo);
            const apiUrl = 'https://smartmess.iitdh.ac.in/api/auth/signin/android';
            // const apiUrl = 'http://192.168.27.21:8001/api/auth/signin/android';
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
              console.log('res token', response.data.token);
              // setkn(response.data.token);
              // setDataInAsyncStorage(response.data.token);
              // setTokenAsync(); // Call setTokenAsync after setting tkn
              navigation.navigate('Main'); // Move the navigation here

            })
            .catch(error => {
              console.error('Error:', error);
            });
          });
        })
        .catch(error => {
          console.log('.....' + JSON.stringify(error));
        });

      try {
        const userInfoString = JSON.stringify(usrInfo);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('userInfo', userInfoString);
      } catch (ee) {
        console.error('Error storing user info:', ee);
      }
      // console.log('User Info: ', usrInfo);
      console.log('Successfully Logged In');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(1);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(2);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(3);
      } else {
        console.log('aa: ', error.code);
      }
    }
  };
  const signout = async () => {
    try {
      await GoogleSignin.signOut();
      try {
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        await AsyncStorage.removeItem('userInfo');
      } catch (ee) {
        console.error('Error signing out:', ee);
      }
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <View style={{ ...styles.container, backgroundColor: '#FFFFFF', margin: 0 }}>
        <Image
          source={require('./lgo.png')}
          style={{ ...styles.topLeftImage, aspectRatio: 1, margin: '3%' }}
        />
        {userInfo != null && <Text>{userInfo.user.name}</Text>}
        {userInfo != null && <Text>{userInfo.user.email}</Text>}
        {userInfo != null && (
          <Image source={{ uri: userInfo.user.photo }} style={styles.image} />
        )}
        <Text style={{ ...styles.signInText, textAlign: 'left' }}>
          Sign in using Google
        </Text>
        <View style={styles.googleSignInContainer}>
          <GoogleSigninButton
            style={styles.googleSignInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => {
              signIn();
            }}
          />
        </View>
        <Button onPress={signout} title='Sign Out'/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: 0,
      backgroundColor: '#FFFFFF'
    },
    topLeftImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 50, 
      width: 50,
    },
    image: {
      height: 70, 
      width: 70,
    },
    signInText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#212B36',
      margin: '3%',
    },
    googleSignInContainer: {
      alignItems: 'center',
    },
    googleSignInButton: {
      width: 312,
      height: 60,
    },
  });
  

export default SettingsScreen;
