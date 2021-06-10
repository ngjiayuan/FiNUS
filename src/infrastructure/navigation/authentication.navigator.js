import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/authentication/login.screen";
import { RegisterScreen } from "../../features/authentication/register.screen";

const Stack = createStackNavigator();

export function AuthenticationNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
