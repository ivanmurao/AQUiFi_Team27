import { createStackNavigator } from "@react-navigation/stack";
import MonitorScreen from "@screens/tabScreens/MonitorScreen";
import TurbidityScreen from "@screens/parameters/TurbidityScreen";
import PHScreen from "@screens/parameters/PHScreen";

const MonitorNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MonitorScreen"
        component={MonitorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TurbidityScreen"
        component={TurbidityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PHScreen"
        component={PHScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MonitorNavigator;
