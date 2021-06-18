import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/home.screen";
import { EditScreen } from "../../features/home/edit.screen";
import { AddingScreen } from "../../features/home/adding.screen";

const HomeStack = createStackNavigator();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="EditScreen" component={EditScreen} />
      <HomeStack.Screen name="AddingScreen" component={AddingScreen} />
    </HomeStack.Navigator>
  );
}
