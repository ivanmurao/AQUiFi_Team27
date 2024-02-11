import { createStackNavigator } from "@react-navigation/stack";
import MonitorScreen from "../navbuttons/MonitorScreen";
import TurbidityScreen from "../parameters/TurbidityScreen";
import PHScreen from "../parameters/PHScreen";
import AboutUsScreen from "../menu/AboutUsScreen";
import FaqScreen from "../menu/FaqScreen";
import TermScreen from "../menu/TermScreen";

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
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermScreen"
        component={TermScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MonitorNavigator;
