import {View, Text, Image, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
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

      // console.log('Initialising Login...');
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      navigation.navigate('Main');
      GoogleSignin.signIn()
        .then(userInfo => {
          // console.log('TEST ' + JSON.stringify(userInfo));

          const currentUser = GoogleSignin.getTokens().then(res => {
            // console.log(res); //<-------Get accessToken

            const apiUrl = 'http://192.168.80.21:3000'; // Replace with your server's IP/domain and port

            // Define the data you want to send in the request
            const userData = {
              Email: userInfo.user.email,
              Username: userInfo.user.name,
              First_Name: userInfo.user.givenName,
              Last_Name: userInfo.user.familyName,
              Image: userInfo.user.photo,
              AccessToken: res.accessToken,
            };

            // Make a POST request using Axios
            axios
              .post(`${apiUrl}/createOrLogin`, userData)
              .then(response => {
                // console.log('Response:', response.data);
                // Handle the response data here
                navigation.navigate('Main');
              })
              .catch(error => {
                console.error('Error:', error);
                // Handle errors here
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {userInfo != null && <Text>{userInfo.user.name}</Text>}
      {userInfo != null && <Text>{userInfo.user.email}</Text>}
      {userInfo != null && (
        <Image
          source={{uri: userInfo.user.photo}}
          style={{width: 100, height: 100}}
        />
      )}
      {userInfo == null ? (
        <Text
          style={{padding: 20, borderWidth: 1}}
          onPress={() => {
            signIn();
          }}>
          Sign in
        </Text>
      ) : (
        <Text
          style={{padding: 20, borderWidth: 1, marginTop: 30}}
          onPress={() => {
            signout();
          }}>
          Sign out
        </Text>
      )}
      {/* <View>
        <Button
          title="Go to Main"
          onPress={() => navigation.navigate('Main')}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('LoginScreen')}
        />
       
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate('RegisterScreen')}
        />
      </View> */}
    </View>
  );
};
export default SettingsScreen;
