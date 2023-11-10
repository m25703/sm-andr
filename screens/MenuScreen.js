import React, {useState, useEffect, Suspense, lazy} from 'react';
import {FlatList, Text, View, Button, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GridView = lazy(() => import('./GridView'));
const MenuItem = lazy(() => import('./MenuItem'));

const MenuScreen = () => {
  const [timetableData, setTimetableData] = useState(null);
  const filterItemsData = menuData => {
    // Initialize an empty array to store the filtered data
    const filteredData = [];

    // Iterate through each menu entry
    for (const entry of menuData) {
      // Extract the relevant information
      const {Day, Type, Items} = entry;

      if (Items && Array.isArray(Items)) {
        // Extract item names from the 'Items' array and filter out any null or undefined values
        const itemNames = Items.map(item => (item && item.Name) || null).filter(
          Boolean,
        );

        // Push the filtered data to the result array
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
                    console.log(JSON.stringify(response.data));
                    const filteredResult = filterItemsData(response.data);
                    console.log(filteredResult);
                    const menuStructure = generateMenuStructure(filteredResult);
                    console.log(JSON.stringify(menuStructure, null, 2));
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
  }, []);

  return timetableData ? (
    <FlatList
      data={timetableData}
      keyExtractor={day => day.id}
      renderItem={({item}) => (
        <View style={styles.menuDay}>
          <Text style={styles.title}>
            {item.Day} - {item.Type}
          </Text>
          <Suspense fallback={<Text>Loading...</Text>}>
            <GridView
              data={item.Items}
              numColumns={2}
              renderItem={menu => <MenuItem menu={menu} />}
            />
          </Suspense>
        </View>
      )}
    />
  ) : (
    <Text style={{color:'#DDDDDD', margin:'5%'}}>Loading...</Text>
  );
};
const styles = StyleSheet.create({
  menuDay: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
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
