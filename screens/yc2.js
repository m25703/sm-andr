import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Icon,
  Image,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useState, useEffect, Suspense, lazy} from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

const YourComponent2 = ({fooditemdata}) => {
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');
  const [mealItem, setMealItem] = useState('');
  const [dayError, setDayError] = useState('');
  const [mealTypeError, setmealTypeError] = useState('');
  const [mealItemError, setMealItemError] = useState('');

  const handleValidation = () => {
    let isValid = true;

    if (day.trim() === '') {
      isValid = false;
      setDayError("'day' is required");
    } else {
      setDayError('');
    }

    if (mealType.trim() === '') {
      isValid = false;
      setmealTypeError("'mealType' is required");
    } else {
      setmealTypeError('');
    }

    if (mealItem.trim() === '') {
      isValid = false;
      setMealItemError("'mealItem' is required");
    } else {
      setMealItemError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    // if (handleValidation()) {
    //   if (day !== '' && mealItem !== '' && mealType !== '') {
    //     console.log(day, mealItem, mealType);
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const usrInfo = await GoogleSignin.signIn();
    //       GoogleSignin.signIn()
    //         .then(userInfo => {
    //           const currentUser = GoogleSignin.getTokens().then(res => {
    //             const apiUrl =
    //               'https://smartmess.iitdh.ac.in/api/auth/signin/android';
    //             const userData = {
    //               Email: userInfo.user.mealType,
    //               Username: userInfo.user.day,
    //               First_Name: userInfo.user.givenName,
    //               Last_Name: userInfo.user.familyName,
    //               Image: userInfo.user.photo,
    //             };
    //             axios
    //               .put(`${apiUrl}`, userData)
    //               .then(response => {
    //                 console.log('ns res token', response.data.token);
    //                 const apiUrl =
    //                   'https://smartmess.iitdh.ac.in/api/manager/dashboard/addTimeTable';

    //                 setMealItem(fooditemdata.find(item => item.Id === mealItem));

    //                 if (selectedFoodItem) {

    //                   const headers = {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${response.data.token}`,
    //                   };

    //                   const requestData = {
    //                     day,
    //                     mealType,
    //                     mealItem,
    //                   };
    //                   console.log(requestData);
    //                   axios
    //                     .post(apiUrl, requestData, { headers })
    //                     .then(response => {
    //                       console.log(response);
    //                     })
    //                     .catch(error => {
    //                       console.error('Error making the request:', error);
    //                     });
    //                 } else {
    //                   console.error('Selected food item not found in the data.');
    //                 }
    //               })
    //               .catch(error => {
    //                 console.error('ns: Error:', error);
    //               });
    //           });
    //         })
    //         .catch(error => {
    //           console.error('.....' + JSON.stringify(error));
    //         });

    //       try {
    //         const userInfoString = JSON.stringify(usrInfo);
    //         await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    //         await AsyncStorage.setItem('userInfo', userInfoString);
    //       } catch (ee) {
    //         console.error('ns: Error storing user info:', ee);
    //       }
    //       console.log('ns: Successfully Loaded Menu Data');
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         console.error(error, error.code);
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         console.error(error, error.code);
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         console.error(error, error.code);
    //       } else {
    //         console.error(error, error.code);
    //       }
    //     }
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text>
          <Text style={styles.label}>Day</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={day}
            onValueChange={itemValue => setDay(itemValue)}>
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </View>

        {dayError ? (
          <Text style={styles.errorText}>{dayError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text>
          <Text style={styles.label}>Meal type</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={mealType}
            onValueChange={itemValue => setMealType(itemValue)}>
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Snacks" value="Snacks" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker>
        </View>

        {mealTypeError ? (
          <Text style={styles.errorText}>{mealTypeError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text>
          <Text style={styles.label}>Food Items</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={mealItem}
            onValueChange={itemValue => setMealItem(itemValue)}>
            {console.log(fooditemdata)}
            {fooditemdata.map(item => (
              <Picker.Item key={item.Id} label={item.Name} value={item.Id} />
            ))}
          </Picker>
        </View>
        {mealItemError ? (
          <Text style={styles.errorText}>{mealItemError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={{...styles.button, width: '30%'}}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  asterisk: {
    color: 'red',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    margin: '2%',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    margin: 1,
  },
  button: {
    backgroundColor: '#1677FF', // Change the background color as needed
    borderRadius: 10, // Use a percentage value for border radius
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '70%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        margin: '2%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
      }}
      onPress={onPress}>
      <Text style={{color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default YourComponent2;
