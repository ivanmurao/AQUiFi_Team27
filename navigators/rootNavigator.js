import { createStackNavigator } from "@react-navigation/stack";
import FrontPage from "@screens/LandingPage";
import HomeScreen from "@screens/tabScreens/HomeScreen";
import TabNavigator from "./tabNavigator";
import AboutUsScreen from "@screens/drawerScreens/AboutUsScreen";
import DataPrivacyScreen from "@screens/drawerScreens/DataPrivacyScreen";
import TermScreen from "@screens/drawerScreens/TermScreen";

const RootNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="FrontPage">
      <Stack.Screen
        name="FrontPage"
        component={FrontPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DataPrivacyScreen"
        component={DataPrivacyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermScreen"
        component={TermScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
