import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {styles} from './styles';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GuestFeedbackScreen = () => {
  const [ratings, setRatings] = useState({
    Breakfast: 0,
    Lunch: 0,
    Snacks: 0,
    Dinner: 0,
    Hygiene: 0,
    'Mess Service': 0,
  });
  const [description, setDescription] = useState(null);

  const handleStarPress = (type, star) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [type]: star,
    }));
    console.log(ratings);
    console.log(description);
  };

  const handleSubmit = async () => {
    if (!ratings.Breakfast || !ratings.Lunch || !ratings.Dinner || !ratings.Snacks || !ratings["Mess Service"] || !ratings.Hygiene) {
      alert('Please Rate all fields');
    } else 
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
                    'https://smartmess.iitdh.ac.in/api/user/dashboard/submitFeedback';
                  const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${response.data.token}`,
                  };
                  const FormID = "654730acb4a19c006df37acf";
                  const BreakfastRating = ratings.Breakfast;
                  const LunchRating = ratings.Lunch;
                  const DinnerRating = ratings.Dinner;
                  const SnacksRating = ratings.Snacks;
                  const Comments = description;
                  const MessServiceRating = ratings["Mess Service"];
                  const HygieneRating = ratings.Hygiene;
                  axios
                    .post(apiUrl, {FormID,
                      BreakfastRating,
                      LunchRating,
                      DinnerRating,
                      SnacksRating,
                      Comments,
                      MessServiceRating,
                      HygieneRating}, {headers})
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#212B36',
                margin: '5%',
              }}>
              Feedback
            </Text>
      <View>
        {feedbackItems.map(item => (
          <View key={item.type} style={{...styles.feedbackContainer, borderRadius: 20}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#212B36',
                margin: '5%',
              }}>
              {item.type}
            </Text>
            <FeedbackItem
              key={item.type}
              type={item.type}
              imageSource={item.imageSource}
              rating={ratings[item.type]}
              handleStarPress={handleStarPress}
            />
          </View>
        ))}
      </View>
      <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#212B36',
                margin: '5%',
              }}>
              Additional Comments
            </Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Comments"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FeedbackItem = ({type, imageSource, rating, handleStarPress}) => (
  <View style={styles.feedbackItem}>
    <Image source={imageSource} style={styles.displayImage} />
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map(starValue => (
        <TouchableOpacity
          key={starValue}
          onPress={() => handleStarPress(type, starValue)}>
          <Text
            style={{
              fontSize: 24,
              color: starValue <= rating ? 'gold' : '#DDDDDD',
              fontWeight: 'bold',
            }}>
            {starValue <= rating ? '★' : '★'}{' '}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const feedbackItems = [
  {type: 'Breakfast', imageSource: require('./br_feedback.png')},
  {type: 'Lunch', imageSource: require('./lu_feedback.png')},
  {type: 'Snacks', imageSource: require('./sn_feedback.png')},
  {type: 'Dinner', imageSource: require('./di_feedback.png')},
  {type: 'Hygiene', imageSource: require('./hy_feedback.png')},
  {type: 'Mess Service', imageSource: require('./me_feedback.png')},
];

export default GuestFeedbackScreen;
