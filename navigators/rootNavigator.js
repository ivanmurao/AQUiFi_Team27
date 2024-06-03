import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from "@screens/LandingPage";
import TabNavigator from "./tabNavigator";
import DrawerNavigator from "./drawerNavigator";

const RootNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
