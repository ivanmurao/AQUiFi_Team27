import { View, StyleSheet, Image, StatusBar } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Foundation } from "@expo/vector-icons";

import TabNavigator from "./tabNavigator";
import AboutUsScreen from "@screens/drawerScreens/AboutUsScreen";
import DataPrivacyScreen from "@screens/drawerScreens/DataPrivacyScreen";
import TermScreen from "@screens/drawerScreens/TermScreen";

import sidebarLogo from "@assets/images/logos/aquifi-dark.png";
import aboutus from "@assets/images/icons/about-us.png";
import toc from "@assets/images/icons/toc.png";
import privacy from "@assets/images/icons/privacy.png";

import NoInternetConnection from "@components/NoInternetConnection";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <>
      <NoInternetConnection />
      <StatusBar backgroundColor={"#255C99"} />
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#255C99",
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
          drawerActiveTintColor: "black",
          drawerInactiveTintColor: "black",
          headerTitle: "",
          lazy: true,
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginHorizontal: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginVertical: 15,
          },
          drawerStyle: { width: "70%" },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Main"
          component={TabNavigator}
          options={{
            drawerIcon: () => (
              <Foundation
                name="home"
                size={30}
                color="#2256C4"
                style={styles.expoIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={AboutUsScreen}
          options={{
            drawerIcon: () => <Image source={aboutus} style={styles.sbicon} />,
          }}
        />
        <Drawer.Screen
          name="Terms of Agreement"
          component={TermScreen}
          options={{
            drawerIcon: () => <Image source={toc} style={styles.sbicon} />,
          }}
        />
        <Drawer.Screen
          name="Data Privacy Policy"
          component={DataPrivacyScreen}
          options={{
            drawerIcon: () => <Image source={privacy} style={styles.sbicon} />,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <Image source={sidebarLogo} style={styles.sidebarLogo} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  sidebarLogo: {
    width: 100,
    height: 110,
    alignSelf: "center",
    marginVertical: 50,
    marginBottom: 100,
  },
  sbicon: {
    width: 30,
    height: 30,
  },
  expoIcon: {
    marginLeft: 5,
  },
});
