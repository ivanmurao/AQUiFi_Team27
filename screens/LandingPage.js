import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Home from '../navbuttons/HomeScreen';
import MonitorScreen from '../navbuttons/MonitorScreen';
import Device from '../navbuttons/DeviceScreen';

import TurbidityScreen from '../parameters/TurbidityScreen';
import PHScreen from '../parameters/PHScreen';

import HomeIcon from '../assets/HomeIcon.png';
import MonitorIcon from '../assets/Monitor.png';
import IoTIcon from '../assets/IoT.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MonitorStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MonitorScreen" component={MonitorScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TurbidityScreen" component={TurbidityScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PHScreen" component={PHScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const LandingPage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,  
          height: 50,

        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={HomeIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="Monitor"
        component={MonitorStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={MonitorIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="Devices"
        component={Device}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={IoTIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LandingPage;
