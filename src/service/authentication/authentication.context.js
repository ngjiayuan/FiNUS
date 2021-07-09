import React, { useState, createContext, useEffect } from "react";
import * as firebase from "firebase";
import * as GoogleSignIn from "expo-google-sign-in";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [google, setGoogle] = useState(false);

  // EXPO-GOOGLE-SIGN-IN
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initAsync(), []);

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId:
        "1090939193740-he4rmudcs0vk8l5ldnrj15q8a71t7cc5.apps.googleusercontent.com",
    });
    _syncUserWithStateAsync();
  };

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  // EXPO-GOOGLE-SIGN-IN
  const _syncUserWithStateAsync = async () => {
    const loginUser = await GoogleSignIn.signInSilentlyAsync();
    setUser(loginUser);
  };

  // EXPO-GOOGLE-SIGN-IN
  const googleLogin = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        _syncUserWithStateAsync();
        setGoogle(true);
      }
    } catch ({ message }) {
      setError("login: Error:" + message);
    }
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = async () => {
    if (google) {
      await GoogleSignIn.signOutAsync();
      setUser(null);
      setGoogle(false);
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
          setError(null);
        });
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        googleLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
