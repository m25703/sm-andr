import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTachometerAlt, faBars, faUtensils, faComment, faBullhorn, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './LoginScreen';
import ComplaintsScreen from './ComplaintsScreen';
import CreateAnnouncementScreen from './CreateAnnouncementScreen';
import DashboardScreen from './DashboardScreen';
import ManagerDashboardScreen from './ManagerDashboardScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import RatingsScreen from './RatingsScreen';
import RegisterScreen from './RegisterScreen';
import SettingsScreen from './SettingsScreen';
import ViewFeedbackScreen from './ViewFeedbackScreen';

type RootStackParamList = {
  SettingsScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  Main: undefined;
};

type RootDrawerParamList = {
  Dashboard: undefined;
  ActivityScreen: undefined;
  CreateAnnouncementScreen: undefined;
  Feedback: undefined;
  'Give Rating': undefined;
  'View Ratings': undefined;
  UserFeedbackScreen: undefined;
  'Add Feedback Form': undefined;
  'Add Announcement': undefined;
  Menu: undefined;
  'Edit Food Item': undefined;
  ComplaintsScreen: undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  const [userRole, setUserRole] = useState("manager");

  // Use useEffect to retrieve the role from AsyncStorage when the screen loads
  useEffect(() => {
    async function fetchUserRole() {
      try {
        // Retrieve the role from AsyncStorage
        const role = await AsyncStorage.getItem('userRole');
        if (role !== null) {
          // If the role is found in AsyncStorage, set it in the state variable
          setUserRole(role);
          console.log(role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }

    // Call the function to fetch the role
    fetchUserRole();
  }, []);

  // Define your different sets of drawer screens based on the user's role
  const managerDrawerScreens = [
    <Drawer.Screen
      name="Dashboard"
      component={ManagerDashboardScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faTachometerAlt} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name='Menu'
      component={MenuScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faBars} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name="Edit Food Item"
      component={NotificationScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faUtensils} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name="Add Feedback Form"
      component={ComplaintsScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faComment} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name="Add Announcement"
      component={CreateAnnouncementScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faBullhorn} color={color} size={size} />
        ),
      }}
    />,
  ];

  const userDrawerScreens = [
    <Drawer.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faTachometerAlt} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name='Menu'
      component={MenuScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faBars} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name="View Ratings"
      component={RatingsScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faStar} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      name="Give Rating"
      component={ViewFeedbackScreen}
      options={{
        headerTitle: " ",
        drawerIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faThumbsUp} color={color} size={size} />
        ),
      }}
    />,
  ];

  return (
    <Drawer.Navigator>
      {userRole === "manager"
        ? managerDrawerScreens
        : userDrawerScreens
      }
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;