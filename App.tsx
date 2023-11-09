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
    // console.log("Device Token:",token);
  };
  // AsyncStorage.setItem("keepLoggedIn",JSON.stringify(true));
  // AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
  // AsyncStorage.setItem("userInfo",JSON.stringify(true));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [tkn,setkn] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [auth, setAuth] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiMjEwMDEwMDI4QGlpdGRoLmFjLmluIiwicm9sZSI6Im1hbmFnZXIiLCJ0aW1lIjoxNjk5MjU1NjY0NTMwfSwiaWF0IjoxNjk5MjU1NjY0LCJleHAiOjE2OTkzNDIwNjR9.piAeLq6-R8ARKT25lXAkhVhMXBrEjlKsTNW67gGETfo")
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        console.log("async data stored: ", data);
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      if (user !== null) {
        console.log("async user stored: ", user);
        setUserInfo(JSON.parse(user));
      }
      const tkn = await AsyncStorage.getItem('tkn');
      if (tkn !== null) {
        console.log("async tkn stored: ", tkn);
        setkn(JSON.parse(tkn));
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
