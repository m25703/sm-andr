import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Dashboard = () => {
  const [timetableData, setTimetableData] = useState(null);

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
              const apiUrl = 'https://smartmess.iitdh.ac.in/api/user/dashboard/timetable';
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.data.token}`
              };
              axios.get(apiUrl, { headers })
                .then(response => {
                  setTimetableData(response.data);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Timetable Dashboard</Text>
      {timetableData ? (
        <Text style={styles.data}>
          Timetable Data: {JSON.stringify(timetableData)}
        </Text>
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
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
  },
});

export default Dashboard;
