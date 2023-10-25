import React, {useEffect} from 'react';
import DrawerNavigator from './screens/DrawerNavigator';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import LoginScreen from './screens/LoginScreen';
// import ActivityScreen from './screens/ActivityScreen';
// import ComplaintsScreen from './screens/ComplaintsScreen';
// import CreateAnnouncementScreen from './screens/CreateAnnouncementScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import FeedbackScreen from './screens/FeedbackScreen';
// import GuestFeedbackScreen from './screens/GuestFeedbackScreen';
// import MenuScreen from './screens/MenuScreen';
// import NotificationScreen from './screens/NotificationScreen';
// import OngoingMealScreen from './screens/OngoingMealScreen';
// import RatingsScreen from './screens/RatingsScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import ViewFeedbackScreen from './screens/ViewFeedbackScreen';
import messaging from '@react-native-firebase/messaging';
import {View, Text, Alert} from 'react-native';

// const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New notification:', JSON.stringify(remoteMessage));
      console.log('Message handled in the foreground!', remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
  <DrawerNavigator />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="LoginScreen">
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    //     <Stack.Screen name="Activity" component={ActivityScreen} />
    //     <Stack.Screen name="Complaints" component={ComplaintsScreen} />
    //     <Stack.Screen
    //       name="Create Announcement"
    //       component={CreateAnnouncementScreen}
    //     />
    //     <Stack.Screen name="Feedback" component={FeedbackScreen} />
    //     <Stack.Screen name="Guest Feedback" component={GuestFeedbackScreen} />
    //     <Stack.Screen name="Menu" component={MenuScreen} />
    //     <Stack.Screen name="Notifications" component={NotificationScreen} />
    //     <Stack.Screen name="Ongoing Meal" component={OngoingMealScreen} />
    //     <Stack.Screen name="Ratings" component={RatingsScreen} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //     <Stack.Screen name="Settings" component={SettingsScreen} />
    //     <Stack.Screen name="View Feedback" component={ViewFeedbackScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}



export default App;