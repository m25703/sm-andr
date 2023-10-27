import React, {useEffect, useState} from 'react';
import DrawerNavigator from './screens/DrawerNavigator';
import messaging from '@react-native-firebase/messaging';
import {View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);
  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log("Device Token:",token);
  };
  // AsyncStorage.setItem("keepLoggedIn",JSON.stringify(true));
  // AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
  // AsyncStorage.setItem("userInfo",JSON.stringify(true));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        console.log("data: ", data);
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      if (user !== null) {
        console.log("user: ", user);
        setUserInfo(JSON.parse(user));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New notification:', JSON.stringify(remoteMessage));
      console.log('Message handled in the foreground!', remoteMessage);
    });
    return unsubscribe;
  }, []);
  return (
      <DrawerNavigator />
  );
  
}
export default App;
