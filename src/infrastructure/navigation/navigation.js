import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AddingPage } from "../../features/AddingPage";
import { MainPage } from "../../features/MainPage";
import { LoginScreen } from "../../features/account/LoginPage";
import { RegisterScreen } from "../../features/account/RegisterPage";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

const Stack = createStackNavigator();

export function Navigation({ records, clear, addRecord }) {
  function MainScreen({ navigation }) {
    return <MainPage navigation={navigation} records={records} clear={clear} />;
  }

  function AddingScreen({ navigation }) {
    return <AddingPage navigation={navigation} addRecord={addRecord} />;
  }

  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator initialRouteName="MainPage" mode="modal">
          <Stack.Screen name="MainPage" component={MainScreen} />
          <Stack.Screen name="AddingPage" component={AddingScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="LoginPage" component={LoginScreen} />
          <Stack.Screen name="RegisterPage" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
