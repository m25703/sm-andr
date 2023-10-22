import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleSubmitFeedback = () => {
    // You can handle the submission of feedback here, e.g., send it to a server
    console.log("Submitted feedback:", feedback);
    // Reset the feedback input
    setFeedback('');
    // You can also show a success message to the user
  };

  const handleCameraIconPress = () => {
    // Handle the camera icon press
  };

  const handlePhotoIconPress = () => {
    // Handle the photo icon press
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={handleFeedbackChange}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon} onPress={handleCameraIconPress}>
          <Icon name="camera" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handlePhotoIconPress}>
          <Icon name="photo" size={24} color="#333" />
        </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmitFeedback}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,

  },
  icon: {
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    padding: 10,
    margin:10,
  },
});

export default FeedbackScreen;
