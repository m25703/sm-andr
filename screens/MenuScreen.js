import React, {useState, useEffect, Suspense, lazy} from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GridView = lazy(() => import('./GridView'));
const MenuItem = lazy(() => import('./MenuItem'));

const MenuScreen = () => {
  const [timetableData, setTimetableData] = useState(null);

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
              .post(`${apiUrl}`, userData)
              .then(response => {
                console.log('ns res token', response.data.token);
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
        // console.log(userInfoString);
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
    loadPage();

    // Get the current date
    const currentDate = new Date();
    // Determine the current day's index (0 for Sunday, 1 for Monday, etc.)
    const currentDayIndex = currentDate.getDay() - 1; // Subtract 1 to match your daysOfWeek array

    // Update the expandedDays state for the current day
    setExpandedDays(prevExpandedDays => {
      const updatedExpandedDays = [...prevExpandedDays];
      updatedExpandedDays[currentDayIndex] = true;
      return updatedExpandedDays;
    });
  }, []);

  const [expandedDays, setExpandedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleDay = index => {
    const updatedExpandedDays = [...expandedDays];
    updatedExpandedDays[index] = !updatedExpandedDays[index];
    setExpandedDays(updatedExpandedDays);
  };

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return timetableData !== null ? (<>
    <Text
    style={{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#212B36',
      padding: '5%',
      backgroundColor: 'white'
    }}>
    Menu
  </Text>
    <FlatList
      style={{ backgroundColor: 'white',
      padding: 20,
      paddingBottom: 700,
      overflow: 'hidden'}}
      data={daysOfWeek}
      keyExtractor={(day, index) => String(index)}
      renderItem={({ item, index }) => (
        <View style={{...styles.menuDay, borderWidth:1,  borderColor:'#D9D9D9'}}>
          <TouchableOpacity onPress={() => toggleDay(index)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F5F6', overflow: 'hidden', borderColor:"#D9D9D9", borderBottomWidth:1, borderTopWidth:1}}>
              <FontAwesomeIcon
                icon={expandedDays[index] ? faAngleDown : faAngleRight}
                size={20}
                color="#454545"
                style={{margin:'5%'}}
              />
              <Text style={{ ...styles.title}}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
          {expandedDays[index] && timetableData ? (
            <Suspense fallback={<Text>Loading...</Text>}>
              <View style={{ margin: 20, borderColor: '#D9D9D9', borderWidth: 1, borderRadius: 15 }}>
                <View style={{}}>
                  <View style={{ backgroundColor: '#FAFAFA', borderBottomColor: '#FAFAFA', borderBottomWidth: 1, borderTopLeftRadius:15, borderTopRightRadius:15 }}>
                    <Text style={{...styles.title, borderColor:"#D9D9D9", borderBottomWidth:1, borderTopWidth:1, paddingLeft:20,  borderTopLeftRadius:15, borderTopRightRadius:15 }}>Breakfast</Text>
                  </View>
                  <GridView
                    data={timetableData[index].Items}
                    numColumns={2}
                    renderItem={(menu) => <MenuItem menu={menu} />}
                  />
                </View>
                <View style={{}}>
                  <Text style={{...styles.title, borderColor:"#D9D9D9", borderBottomWidth:1, borderTopWidth:1, backgroundColor: '#FAFAFA', paddingLeft:20}}>Lunch</Text>
                  <GridView
                    data={timetableData[index + 1].Items}
                    numColumns={2}
                    renderItem={(menu) => <MenuItem menu={menu} />}
                  />
                </View>
                <View style={{}}>
                  <Text style={{...styles.title, borderColor:"#D9D9D9", borderBottomWidth:1, borderTopWidth:1, backgroundColor: '#FAFAFA', paddingLeft:20}}>Snacks</Text>
                  <GridView
                    data={timetableData[index + 2].Items}
                    numColumns={2}
                    renderItem={(menu) => <MenuItem menu={menu} />}
                  />
                </View>
                <View style={{}}>
                  <Text style={{...styles.title, backgroundColor: '#FAFAFA', borderColor:"#D9D9D9", borderBottomWidth:1, borderTopWidth:1, paddingLeft:20}}>Dinner</Text>
                  <GridView
                    data={timetableData[index + 3].Items}
                    numColumns={2}
                    renderItem={(menu) => <MenuItem menu={menu} />}
                  />
                </View>
              </View>
            </Suspense>
          ) : null}
        </View>
      )}
    />
    </>
  ) : (
    <Text> Loading... </Text>
  );
  
};

const styles = StyleSheet.create({
  menuDay: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    color: '#1E1E1E',
    padding: 10,
    height: 75,
    textAlignVertical: 'center',
  },
  menuItem: {
    margin: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 5,
  },
  gridItemLast: {
    flex: 1,
    margin: 5,
    marginRight: 0,
  },
});

export default MenuScreen;
