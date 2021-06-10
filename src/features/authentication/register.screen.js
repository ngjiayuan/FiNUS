import React, { useState, useContext } from "react";
import { Text, View, Button, TextInput } from "react-native";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

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
      <TextInput
        label="repeatedPassword"
        value={repeatedPassword}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(p) => setRepeatedPassword(p)}
        style={{
          width: 300,
          padding: 10,
          height: 50,
          marginBottom: 20,
          backgroundColor: "white",
        }}
        placeholder="Re-enter Password"
      />
      {error && <Text>{error}</Text>}
      <Button
        title="Register"
        onPress={() => onRegister(email, password, repeatedPassword)}
      />
    </View>
  );
};
