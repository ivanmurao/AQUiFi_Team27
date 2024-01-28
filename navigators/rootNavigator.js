import { createStackNavigator } from "@react-navigation/stack";
import FrontPage from "../screens/FrontPage";
import HomeScreen from "../navbuttons/HomeScreen";
import TabNavigator from "./tabNavigator";

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
