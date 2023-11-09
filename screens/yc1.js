import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList, TextInput,
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


const YourComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fooditemdata, setfooditemdata] = useState(['a']);
    const [loaded, setLoaded] = useState(false);
  
    
  
    const handleValidation = () => {
      let isValid = true;
  
      if (name.trim() === '') {
        isValid = false;
        setNameError('Please input name of Food Item');
      } else {
        setNameError('');
      }
  
      if (email.trim() === '') {
        isValid = false;
        setEmailError('Please input the link to image of Food Item');
      } else {
        setEmailError('');
      }
  
      if (password.trim() === '') {
        isValid = false;
        setPasswordError('Please input category of Food Item');
      } else {
        setPasswordError('');
      }
  
      return isValid;
    };
  
    const handleSubmit = () => {
      if (handleValidation()) {
        // Handle form submission
        // This function is called when all fields are filled
        // You can perform your action here, e.g., sending data to a server
      }
    };
  
    return (
      <View style={styles.container}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.asterisk}> * </Text>
            <Text style={styles.label}>Name of Food Item</Text>
          </View>
  
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : (
            <Text style={styles.errorText}> </Text>
          )}
        </View>
  
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.asterisk}> * </Text>
            <Text style={styles.label}>Image of Food Item</Text>
          </View>
  
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : (
            <Text style={styles.errorText}> </Text>
          )}
        </View>
  
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.asterisk}> * </Text>
            <Text style={styles.label}>Food Item Category</Text>
          </View>
  
          <View
            style={{
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 5,
              marginBottom: '5%',
              borderColor: '#D9D9D9',
              height: 50,
            }}>
            <Picker
              selectedValue={password}
              onValueChange={itemValue => setPassword(itemValue)}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
            </Picker>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
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
  
export default YourComponent;
