import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORA_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

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
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORA_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
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
