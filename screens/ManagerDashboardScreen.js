import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList, 
    Icon,
    Image,
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {ScrollView} from 'react-native-gesture-handler';
  import React, {useState, useEffect, Suspense, lazy} from 'react';
  import {
    GoogleSignin,
    statusCodes,
    GoogleSigninButton,
  } from '@react-native-google-signin/google-signin';
  import axios from 'axios';
  
  const DashboardScreen = () => {
    const [combinedMealData, setCombinedMealData] = useState(null);
    const [days, setDays] = useState({
      Friday: {
        Breakfast: [
        'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  Monday: {Breakfast: [
  'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  Saturday: {Breakfast: [
  'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  Thursday: {Breakfast: [
  'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  Tuesday: {Breakfast: [
  'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  Wednesday: {Breakfast: [
  'Coffee/BournVita',
  ],
  Dinner: [
  'PLAIN RICE',
  ],
  Lunch: [
  'ROTI',
  ],
  Snacks: ['BANANA'],
  },
  });
  const [ser, setSer] = useState('');
  const reqDate = new Date();
    // console.log(reqDate.toLocaleTimeString());
    useEffect(() => {}, []);
  
    function getMealTime() {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
  
      if (hours >= 7 && hours < 10) {
        setSer('Breakfast');
      } else if (hours >= 12 && hours < 15) {
        setSer('Lunch');
      } else if (hours >= 16 && hours < 18) {
        setSer('Snacks');
      } else if (hours >= 19 && hours < 21) {
        setSer('Dinner');
      } else {
        setSer('');
      }
    }
  
    useEffect(() => {
      getMealTime();
      const interval = setInterval(() => {
        getMealTime();
      }, 6000);
  
      return () => clearInterval(interval);
    }, []);
  
    const [timetableData, setTimetableData] = useState(null);
    const filterItemsData = menuData => {
      const filteredData = [];
      for (const entry of menuData) {
        const {Day, Type, Items} = entry;
        if (Items && Array.isArray(Items)) {
          const itemNames = Items.map(item => (item && item.Name) || null).filter(
            Boolean,
          );
          filteredData.push({
            Day,
            Type,
            Items: itemNames,
          });
        }
      }
      return filteredData;
    };
  
    function generateMenuStructure(filteredItems) {
      const menuStructure = {};
  
      filteredItems.forEach(item => {
        const {Day, Type, Items} = item;
  
        if (!menuStructure[Day]) {
          menuStructure[Day] = {};
        }
  
        if (!menuStructure[Day][Type]) {
          menuStructure[Day][Type] = [];
        }
  
        menuStructure[Day][Type] = [...menuStructure[Day][Type], ...Items];
      });
  
      return menuStructure;
    }
  
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    // Your data and renderItem logic
  
    const handleRefresh = () => {
      setIsRefreshing(true);
  
      // Fetch new data or refresh existing data
      // Once the data is updated, set isRefreshing to false
  
      setTimeout(() => {
        setIsRefreshing(false); // Simulating data fetch completion
      }, 2000);
    };
  
    useEffect(() => {
      const refreshTimer = setTimeout(() => {
        handleRefresh(); // Trigger the refresh action
      }, 5000); // Refresh after 5 seconds
  
      return () => {
        clearTimeout(refreshTimer); // Clear the timer to avoid unwanted refreshes
      };
    }, []);
  
    const [userRole, setUserRole] = useState(null);
  
    // Use useEffect to retrieve the role from AsyncStorage when the screen loads
    useEffect(() => {
      async function fetchUserRole() {
        try {
          // Retrieve the role from AsyncStorage
          const role = await AsyncStorage.getItem('userRole');
          if (role !== null) {
            // If the role is found in AsyncStorage, set it in the state variable
            setUserRole(role);
            console.log(role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
  
      // Call the function to fetch the role
      fetchUserRole();
    }, []);
  
    const loadPage = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const usrInfo = await GoogleSignin.signIn();
        GoogleSignin.signIn()
          .then(userInfo => {
            const currentUser = GoogleSignin.getTokens().then(res => {
              const apiUrl =
                'https://smartmess.iitdh.ac.in/api/auth/signin/android';
              // const apiUrl = 'http://192.168.27.21:8001/api/auth/signin/android';
              const userData = {
                Email: userInfo.user.email,
                Username: userInfo.user.name,
                First_Name: userInfo.user.givenName,
                Last_Name: userInfo.user.familyName,
                Image: userInfo.user.photo,
              };
              axios
                .post(apiUrl, userData)
                .then(response => {
                  // console.log('dashboardScreen: res token', response.data.token);
                  const apiUrl =
                    'https://smartmess.iitdh.ac.in/api/manager/dashboard/timetable';
                  const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${response.data.token}`,
                  };
  
                  axios
                    .get(apiUrl, {headers})
                    .then(response => {
                      setTimetableData(response.data);
                      // console.log(JSON.stringify(response.data));
                      const filteredResult = filterItemsData(response.data);
                      // console.log(filteredResult);
                      const menuStructure = generateMenuStructure(filteredResult);
                      // console.log(
                      //   JSON.stringify(menuStructure, null, 2),
                      //   'menuStructure set',
                      // );
                      setDays(menuStructure);
                      // console.log(days, 'days set');
                      const currentDayIndex = new Date().getDay();
                      const currentDayName = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                      ][currentDayIndex];
                      // console.log(currentDayName);
                      const km = mealTypes.map(mealType => ({
                        mealType,
                        items: menuStructure[currentDayName][mealType],
                        bgColor: mealTypeColors[mealType].bgColor,
                        textColor: mealTypeColors[mealType].textColor,
                      }));
                      setCombinedMealData(km);
                    })
                    .catch(error => {
                      console.error(
                        'dashboardScreen:: Error fetching data:',
                        error,
                      );
                    });
                })
                .catch(error => {
                  console.error('dashboardScreen:: Error:', error);
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
          console.error('dashboardScreen:: Error storing user info:', ee);
        }
        console.log('dashboardScreen:: Successfully Loaded Menu Data');
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
      loadPage();
    }, []);
  
    const mealTypeImages = {
      Breakfast: require('./breakfast_logo.png'),
      Lunch: require('./lunch_logo.png'),
      Snacks: require('./snacks_logo.png'),
      Dinner: require('./dinner_logo.png'),
    };
  
    const MealBox = ({mealType, items, bgColor, textColor}) => {
      const mealImage = mealTypeImages[mealType];
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: bgColor, borderRadius: 15},
          ]}>
          <Image
            source={mealImage}
            style={{height: 90, width: 90, aspectRatio: 1, margin: '7%'}}
          />
          <Text style={[styles.title, {color: textColor}]}>{mealType}</Text>
  
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${mealType}-${index}`}
            renderItem={({item}) => (
              <Text style={[styles.item, {color: textColor}]}>{item}</Text>
            )}
          />
        </View>
      );
    };
  
    const mealTypes = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
    const mealTypeColors = {
      Breakfast: {bgColor: '#D1E9FC', textColor: '#3E548E'},
      Lunch: {bgColor: '#E9FCD4', textColor: '#479044'},
      Snacks: {bgColor: '#FFF7CD', textColor: '#A68745'},
      Dinner: {bgColor: '#FFE7D9', textColor: '#9F495D'},
    };
  
    return days ? (
      <View style={styles.pageContainer}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#212B36',
            margin: '5%',
          }}>
          Today's Menu
        </Text>
        <FlatList
          data={combinedMealData}
          keyExtractor={item => item.mealType}
          renderItem={({item}) => (
            <MealBox
              mealType={item.mealType}
              items={item.items}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          )}
        />
      </View>
    ) : (
      <Text style={{color:'#DDDDDD', margin:'5%'}}>Loading...</Text>
    );
  };
  
  const styles = StyleSheet.create({
    pageContainer: {
      margin: 0,
      backgroundColor: '#FFFFFF',
      marginBottom: '15%',
    },
    container: {
      padding: '5%',
      margin: '3%',
      width: '94%',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingBottom: '10%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 10,
    },
    item: {
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      margin: 1,
      fontSize: 18,
    },
  });
  
  export default DashboardScreen;
  