import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/rootNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
