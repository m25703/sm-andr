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

export default CustomButton;

  