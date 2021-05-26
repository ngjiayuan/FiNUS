import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddingPage, HeaderButton } from "./src/features/AddingPage";
import { MainPage } from "./src/features/MainPage";

function MainScreen({ navigation }) {
  return <MainPage onButtonPress={() => navigation.navigate("AddingPage")} />;
}

function AddingScreen() {
  return <AddingPage />;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainScreen} />
        <Stack.Screen
          name="AddingPage"
          component={AddingScreen}
          options={{
            headerTitle: (props) => <HeaderButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
