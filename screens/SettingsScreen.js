import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SettingsScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '118779391236-kdlu7dnrcckgp5nl2jnsogqfqtsoejeo.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    try {
      console.log('try');

      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      console.log(usrInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(1);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(2);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(3);

        // play services not available or outdated
      } else {
        console.log(error.code);
        // some other error happened
      }
    }
  };
  const signout = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {userInfo != null && <Text>{userInfo.user.name}</Text>}
      {userInfo != null && <Text>{userInfo.user.email}</Text>}
      {userInfo != null && (
        <Image
          source={{uri: userInfo.user.photo}}
          style={{width: 100, height: 100}}
        />
      )}
      {userInfo == null ? (
        <Text
          style={{padding: 20, borderWidth: 1}}
          onPress={() => {
            signIn();
          }}>
          Sign in
        </Text>
      ) : (
        <Text
          style={{padding: 20, borderWidth: 1, marginTop: 30}}
          onPress={() => {
            signout();
          }}>
          Sign out
        </Text>
      )}
    </View>
  );
};
export default SettingsScreen;
