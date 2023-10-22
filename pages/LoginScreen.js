import React from 'react';
import { View, Text, Button } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>add login/registration functionality here</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => {
          navigation.navigate('DashboardScreen');
        }}
      />
    </View>
  );
}

export default LoginScreen;
