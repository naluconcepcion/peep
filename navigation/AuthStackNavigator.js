import OpeningScreen from '../screens/OpeningScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import DemographicsScreen from '../screens/DemographicsScreen'

// import TabOneScreen from '../screens/TabOneScreen'
// import TabTwoScreen from '../screens/TabTwoScreen'
// import TabThreeScreen from '../screens/TabThreeScreen'
// import TabFourScreen from '../screens/TabFourScreen'
// import TabFiveScreen from '../screens/TabFiveScreen'

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Opening"
      screenOptions={{
        headerShown: false
      }}
    >
    <AuthStack.Screen
      name="Opening"
      component = {OpeningScreen}
    />
    <AuthStack.Screen
        name="Login"
        component = {LoginScreen}
      />
      <AuthStack.Screen
        name="Signup"
        component = {SignupScreen}
      />
      <AuthStack.Screen
        name="Demographics"
        component = {DemographicsScreen}
      />
    </AuthStack.Navigator>
  );
}
