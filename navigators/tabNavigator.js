import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import MonitorNavigator from "./monitorNavigator";
import Home from "../navbuttons/HomeScreen";
import Device from "../navbuttons/DeviceScreen";
import HomeIcon from "../assets/HomeIcon.png";
import MonitorIcon from "../assets/Monitor.png";
import IoTIcon from "../assets/IoT.png";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator(); 

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
            <Image
              source={HomeIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Monitor"
        component={MonitorNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={MonitorIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Devices"
        component={Device}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={IoTIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
