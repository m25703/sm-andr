import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FeedbackPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (title != '' && description != '') {
      console.log(title, description);
      try {
        await GoogleSignin.hasPlayServices();
        const usrInfo = await GoogleSignin.signIn();
        GoogleSignin.signIn()
          .then(userInfo => {
            const currentUser = GoogleSignin.getTokens().then(res => {
              const apiUrl =
                'https://smartmess.iitdh.ac.in/api/auth/signin/android';
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
                    'https://smartmess.iitdh.ac.in/api/manager/dashboard/floatFeedbackForm';
                  const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${response.data.token}`,
                  };
                  axios
                    .post(apiUrl, {title, description}, {headers})
                    .then(response => {
                      console.log(response);
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
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#212B36',
          margin: '5%',
        }}>
        Feedback Form
      </Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Title *"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description *"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
      />
      <TouchableOpacity
        style={{...styles.button, width: '30%'}}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: '50%',
  },
  submitButton: {
    backgroundColor: '#2065D1',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 10,
    alignSelf: 'left',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1677FF', // Change the background color as needed
    borderRadius: 10, // Use a percentage value for border radius
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'left',
    padding: 10,
    marginTop: '2%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FeedbackPage;
