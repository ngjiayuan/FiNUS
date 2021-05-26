import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddingPage } from "./src/features/AddingPage";
import { MainPage } from "./src/features/MainPage";

function MainScreen({ navigation }) {
  return <MainPage onButtonPress={() => navigation.navigate("AddingPage")} />;
}

function AddingScreen({ navigation }) {
  return <AddingPage navigation={navigation} />;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainScreen} />
        <Stack.Screen name="AddingPage" component={AddingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
