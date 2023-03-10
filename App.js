import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Post from "./screens/Post";
import ListFilter from "./screens/ListFilter";
import FilterContextProvider from "./providers/FilterContext";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FilterContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Filter" component={ListFilter} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </FilterContextProvider>
  );
}
