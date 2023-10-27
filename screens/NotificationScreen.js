import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationBox = ({ title, message }) => (
  <View style={styles.notificationBox}>
    <Text style={styles.notificationTitle}>{title}</Text>
    <Text style={styles.notificationMessage}>{message}</Text>
  </View>
);

const NotificationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);
  const notifications = [
    {
      id: 1,
      title: 'Notification Title 1',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Notification Title 2',
      message: 'Praesent vel lorem nec velit posuere eleifend.',
    },
    // Add more notifications here
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notifications.map((notification) => (
        <NotificationBox
          key={notification.id}
          title={notification.title}
          message={notification.message}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  notificationBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 16,
  },
});

export default NotificationPage;
