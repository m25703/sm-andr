import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import ActivityScreen from './ActivityScreen';
import ComplaintsScreen from './ComplaintsScreen';
import CreateAnnouncementScreen from './CreateAnnouncementScreen';
import DashboardScreen from './DashboardScreen';
import FeedbackScreen from './FeedbackScreen';
import GuestFeedbackScreen from './GuestFeedbackScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import OngoingMealScreen from './OngoingMealScreen';
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
  DashboardScreen: undefined;
  ActivityScreen: undefined;
  CreateAnnouncementScreen: undefined;
  FeedbackScreen: undefined;
  ViewFeedbackScreen: undefined;
  RatingsScreen: undefined;
  GuestFeedbackScreen: undefined;
  MenuScreen: undefined;
  NotificationScreen: undefined;
  OngoingMealScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
      {/* <Drawer.Screen name="ActivityScreen" component={ActivityScreen} />
      <Drawer.Screen
        name="CreateAnnouncementScreen"
        component={CreateAnnouncementScreen}
      />
      <Drawer.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Drawer.Screen
        name="GuestFeedbackScreen"
        component={GuestFeedbackScreen} 
      />*/}
      <Drawer.Screen name="MenuScreen" component={MenuScreen} />
      {/* <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
      <Drawer.Screen name="OngoingMealScreen" component={OngoingMealScreen} /> */}
      <Drawer.Screen name="RatingsScreen" component={RatingsScreen} />
      <Drawer.Screen name="ViewFeedbackScreen" component={ViewFeedbackScreen} />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
