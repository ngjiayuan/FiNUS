import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { Navigation } from "./src/infrastructure/navigation";

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
  return (
    <>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
      <ExpoStatusBar />
    </>
  );
}
