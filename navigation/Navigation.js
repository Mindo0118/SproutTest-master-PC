import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/StartScreen/StartScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RegisterMake from '../screens/RegisterScreen/RegisterMake'; // 추가
import RegisterComp from '../screens/RegisterScreen/RegisterComp'; // 추가
import Initial01 from '../screens/InitialSettingsScreen/Initial01'; // 추가
import AppHomeScreen from "../screens/AppHomeScreen/AppHomeScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [image, setImage] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {/* 다른 화면들 */}
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterMake" component={RegisterMake} />
        <Stack.Screen name="RegisterComp" component={RegisterComp} />
        <Stack.Screen name="Initial01" component={Initial01} />
        <Stack.Screen name="AppHomeScreen" component={AppHomeScreen} />
       


      </Stack.Navigator>
    </NavigationContainer>
  );
}
