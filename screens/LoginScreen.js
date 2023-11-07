import React from 'react';
import { View, Text, Button } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>add login/registration functionality here</Text>
      <View>
      <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
      {/* <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} /> */}
      <Button title="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
      <Button title="Go to Register" onPress={() => navigation.navigate('RegisterScreen')} />  
      </View>
    </View>
  );
}

export default LoginScreen;
