import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationNavigator } from "./authentication.navigator";
import { AppNavigator } from "./app.navigator";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

export function Navigation() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}
