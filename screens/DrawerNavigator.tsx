import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTachometerAlt,
  faBars,
  faUtensils,
  faComment,
  faBullhorn,
  faStar,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuestFeedbackScreen from './GuestFeedbackScreen'
import ComplaintsScreen from './ComplaintsScreen';
import CreateAnnouncementScreen from './CreateAnnouncementScreen';
import DashboardScreen from './DashboardScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import RatingsScreen from './RatingsScreen';
import SettingsScreen from './SettingsScreen';
import GiveRatingScreen from './GiveRatingScreen';

type RootStackParamList = {
  SettingsScreen: undefined;
  Main: undefined;
};

type RootDrawerParamList = {
  Dashboard: undefined;
  Feedback: undefined;
  'Give Rating': undefined;
  'View Ratings': undefined;
  'Give Feedback': undefined;
  'Add Feedback Form': undefined;
  'Add Announcement': undefined;
  Menu: undefined;
  'Edit Food Item': undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  const [userRole, setUserRole] = useState('manager');
  useEffect(() => {
    async function fetchUserRole() {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role !== null) {
          setUserRole(role);
          console.log(role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    fetchUserRole();
  }, []);

  const managerDrawerScreens = [
    <Drawer.Screen
      key="DashboardManager"
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faTachometerAlt} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="MenuManager"
      name="Menu"
      component={MenuScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faBars} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="EditFoodItem"
      name="Edit Food Item"
      component={NotificationScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faUtensils} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="AddFeedbackForm"
      name="Add Feedback Form"
      component={ComplaintsScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faComment} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="AddAnnouncement"
      name="Add Announcement"
      component={CreateAnnouncementScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faBullhorn} color={color} size={size} />
        ),
      }}
    />,
  ];

  const userDrawerScreens = [
    <Drawer.Screen
      key="DashboardUser"
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faTachometerAlt} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="MenuUser"
      name="Menu"
      component={MenuScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faBars} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="ViewRatings"
      name="View Ratings"
      component={RatingsScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faStar} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="GiveRating"
      name="Give Rating"
      component={GiveRatingScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faThumbsUp} color={color} size={size} />
        ),
      }}
    />,
    <Drawer.Screen
      key="GiveFeedback"
      name="Give Feedback"
      component={GuestFeedbackScreen}
      options={{
        headerTitle: ' ',
        drawerIcon: ({color, size}) => (
          <FontAwesomeIcon icon={faComment} color={color} size={size} />
        ),
      }}
    />,
  ];

  return (
    <Drawer.Navigator>
      {userRole === 'manager' ? managerDrawerScreens : userDrawerScreens}
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
