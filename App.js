import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";

import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import {
  useFonts as useRobotoMono,
  RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";

import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/service/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";

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
  // initialise fonts
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
  });
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
  });
  const [robotoMonoLoaded] = useRobotoMono({
    RobotoMono_400Regular,
  });
  if (!robotoLoaded || !poppinsLoaded || !robotoMonoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar />
    </>
  );
}
