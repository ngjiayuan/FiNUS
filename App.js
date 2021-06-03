/* eslint-disable react-hooks/exhaustive-deps */
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "./src/infrastructure/navigation/navigation";

import * as firebase from "firebase";

import { AuthenticationContextProvider } from "./src/service/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyCOh8j8b9qBb8GlOEAAPzq3eVWMxFyOd-s",
  authDomain: "finus-4a7d2.firebaseapp.com",
  projectId: "finus-4a7d2",
  storageBucket: "finus-4a7d2.appspot.com",
  messagingSenderId: "1090939193740",
  appId: "1:1090939193740:web:d35342f63fa382d657aea9",
  measurementId: "G-526LRLLGQ9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
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
    <AuthenticationContextProvider>
      <Navigation records={records} clear={clear} addRecord={addRecord} />
    </AuthenticationContextProvider>
  );
}
