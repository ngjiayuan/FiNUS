import React, { useContext } from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { HomeScreen } from "../../features/home/home.screen";
import { EditScreen } from "../../features/home/edit.screen";
import { AddingScreen } from "../../features/home/adding.screen";

const HomeStack = createStackNavigator();

export function HomeNavigator() {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#e8e8e8" } }}
      >
        <HomeStack.Screen name="FiNUS" component={HomeScreen} />
        <HomeStack.Screen name="EditScreen" component={EditScreen} />
        <HomeStack.Screen name="AddingScreen" component={AddingScreen} />
      </HomeStack.Navigator>
    </>
  );
}
