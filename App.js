/* eslint-disable react-hooks/exhaustive-deps */
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddingPage } from "./src/features/AddingPage";
import { MainPage } from "./src/features/MainPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-native-reanimated";

const Stack = createStackNavigator();

export default function App() {
  function MainScreen({ navigation }) {
    return <MainPage navigation={navigation} records={records} clear={clear} />;
  }

  function AddingScreen({ navigation }) {
    return <AddingPage navigation={navigation} addRecord={addRecord} />;
  }

  const [records, setRecords] = useState([]);

  const addRecord = (date, amount, category, isExpense, timeStamp) => {
    setRecords([...records, { date, amount, category, isExpense, timeStamp }]);
  };

  const clear = () => {
    setRecords([]);
  };

  const storeRecords = async () => {
    try {
      await AsyncStorage.setItem("records", JSON.stringify(records));
    } catch (e) {
      console.log(e);
    }
  };

  const getRecords = async () => {
    try {
      const values = await AsyncStorage.getItem("records");
      if (values && JSON.parse(values).length) {
        setRecords(JSON.parse(values));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    storeRecords();
  }, [records]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" mode="modal">
        <Stack.Screen name="MainPage" component={MainScreen} />
        <Stack.Screen name="AddingPage" component={AddingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
