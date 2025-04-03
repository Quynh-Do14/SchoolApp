/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomMenu from './src/infrastructure/common/layouts/bottom-menu';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Constants from './src/core/common/constants';
import { RecoilRoot } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/page/Auth';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigation<any>();

  const getTokenStoraged = async () => {
    const token = await AsyncStorage.getItem("token").then(result => {
      if (result) {
        setToken(result)
      }
    });
    return token;
  };
  useEffect(() => {
    getTokenStoraged().then(() => { })
  }, [])

  // useEffect(() => {
  //   if (token) {
  //     navigate.navigate(Constants.Navigator.Navbar.value)
  //   }
  //   else {
  //     navigate.navigate(Constants.Navigator.Auth.LoginScreen.value)
  //   }
  // }, [token])
  return (
    <Stack.Navigator
      initialRouteName={Constants.Navigator.Auth.LoginScreen.value}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={"BottomMenu"}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Constants.Navigator.Auth.LoginScreen.value} component={LoginScreen} />
    </Stack.Navigator>
  );
};


function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
