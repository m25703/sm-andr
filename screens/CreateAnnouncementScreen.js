import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CreateAnnouncementScreen = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const [notification, setNotification] = useState('');

  const handleAnnouncementSubmit = () => {
    if (announcementText.trim() !== '') {
      setNotification('Announcement created successfully');
      setAnnouncementText('');
    } else {
      setNotification('Please enter valid announcement text');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}></Text>
      
      {/* Form to create announcement */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your announcement"
          value={announcementText}
          onChangeText={text => setAnnouncementText(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAnnouncementSubmit}>
          <Text style={styles.submitButtonText}>Create Announcement</Text>
        </TouchableOpacity>
      </View>
      
      {/* Notification */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>{notification}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
    paddingVertical: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
});

export default CreateAnnouncementScreen;