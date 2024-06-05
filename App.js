import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/rootNavigator";
import ValveNotification from "./components/ValveNotification";

const App = () => {
  return (
    <>
      <ValveNotification />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
