import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const GuestFeedbackScreen = () => {
  const [ratings, setRatings] = useState({
    br: 0,
    lu: 0,
    sn: 0,
    di: 0,
    hy: 0,
    me: 0,
  });

  const handleStarPress = (type, star) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [type]: star,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <View style={styles.feedbackContainer}>
        {feedbackItems.map((item) => (
          <FeedbackItem
            key={item.type}
            type={item.type}
            imageSource={item.imageSource}
            rating={ratings[item.type]}
            handleStarPress={handleStarPress}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FeedbackItem = ({ type, imageSource, rating, handleStarPress }) => (
  <View style={styles.feedbackItem}>
    <Image source={imageSource} style={styles.displayImage} />
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <TouchableOpacity
          key={starValue}
          onPress={() => handleStarPress(type, starValue)}
        >
          <Text
            style={{
              fontSize: 24,
              color: starValue <= rating ? 'gold' : 'gray',
            }}
          >
            {starValue <= rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212B36',
    paddingVertical: 20,
    backgroundColor: 'white',
    textAlign: 'left',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  displayImage: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const feedbackItems = [
  { type: 'br', imageSource: require('./br_feedback.png') },
  { type: 'lu', imageSource: require('./lu_feedback.png') },
  { type: 'sn', imageSource: require('./sn_feedback.png') },
  { type: 'di', imageSource: require('./di_feedback.png') },
  { type: 'me', imageSource: require('./me_feedback.png') },
  { type: 'hy', imageSource: require('./hy_feedback.png') },
];

export default GuestFeedbackScreen;
