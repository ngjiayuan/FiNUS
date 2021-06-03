import React, { useState, useContext } from "react";
import { Text, View, Button, TextInput } from "react-native";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink",
      }}
    >
      <TextInput
        label="Email"
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(u) => setEmail(u)}
        style={{
          width: 300,
          padding: 10,
          height: 50,
          marginBottom: 20,
          backgroundColor: "white",
        }}
        placeholder="Email"
      />
      <TextInput
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(p) => setPassword(p)}
        style={{
          width: 300,
          padding: 10,
          height: 50,
          marginBottom: 20,
          backgroundColor: "white",
        }}
        placeholder="Password"
      />
      {error && <Text>{error}</Text>}
      <Button title="Login" onPress={() => onLogin(email, password)} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("RegisterPage")}
      />
    </View>
  );
};
