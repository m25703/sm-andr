import {View, Text, Image, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SettingsScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '118779391236-kdlu7dnrcckgp5nl2jnsogqfqtsoejeo.apps.googleusercontent.com',
    });
  }, []);


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
  
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
                const token = response.data.token;
                const role = response.data.user.Role; // Assuming the role is in response.data.user.Role
  
                // Store the role in AsyncStorage
                AsyncStorage.setItem('userRole', role);
                console.log(AsyncStorage.getItem('userRole'));
                // Continue with navigation
                navigation.navigate('Main');
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
          style={{ height:150, aspectRatio: 1, margin: '3%' }}
        />
        <View style={{backgroundColor:'#EEEEEE', margin:'2%', borderRadius:5, alignItems:'center'}}>
        {userInfo != null && <Text style={{color:'black', margin:'2%'}}>{userInfo.user.name}</Text>}
        {userInfo != null && <Text style={{color:'black', margin:'2%'}}>{userInfo.user.email}</Text>}
        {userInfo != null && (
          <Image source={{ uri: userInfo.user.photo }} style={styles.image} />
        )}
        </View>
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
        <TouchableOpacity style={styles.button} onPress={signout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
      height: 50, 
      width: 50,
    },
    image: {
      height: 70, 
      width: 70,
      borderRadius: 70,
      margin:'2%'
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
    button: {
      width: 308,
      height: 56,
      backgroundColor: 'white',
      borderWidth: 2,
      margin: '2%',
      borderRadius: 1,
      borderColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'darkslategrey',
      fontSize: 13,
      fontWeight: 'bold',
    },
  });
  

export default SettingsScreen;
