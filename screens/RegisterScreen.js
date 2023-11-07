import {
  Button,
  View
} from "react-native";
import React from "react";

const RegisterScreen = ({navigation}) => {
  return (
    
    <View>
    <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
    <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
    <Button title="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
    {/* <Button title="Go to Register" onPress={() => navigation.navigate('RegisterScreen')} />   */}
    </View>

  );
};

export default RegisterScreen;
