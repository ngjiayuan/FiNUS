import React, { useState, useContext } from "react";
import { Text } from "react-native";
import {
  AuthSafeArea,
  Container,
  AuthInput,
  AuthButton,
  AuthView,
  ButtonView,
  Title,
  Logo,
  LogoView,
} from "../components/authentication.components";
import { Spacer } from "../../../components/Spacer";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <>
      <AuthSafeArea>
        <Container>
          <LogoView>
            <Logo source={require("../../../../assets/piggy.png")} />
            <Title>FiNUS</Title>
          </LogoView>
          <AuthView>
            <AuthInput
              value={email}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(u) => setEmail(u)}
              placeholder="e-mail"
            />
            <Spacer />
            <AuthInput
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => setPassword(p)}
              placeholder="password"
            />
            <Spacer />
            <AuthInput
              value={repeatedPassword}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => setRepeatedPassword(p)}
              placeholder="re-enter password"
            />
            <Spacer />
            {error && <Text>{error}</Text>}
            <ButtonView>
              <AuthButton
                onPress={() => navigation.goBack()}
                color="black"
                icon="arrow-left"
                labelStyle={{
                  fontFamily: "Poppins_400Regular",
                }}
                uppercase={false}
              >
                back
              </AuthButton>
              <AuthButton
                onPress={() => {
                  onRegister(email, password, repeatedPassword);
                  navigation.navigate("LoginScreen");
                }}
                color="black"
                icon="email-outline"
                labelStyle={{
                  fontFamily: "Poppins_400Regular",
                }}
                uppercase={false}
              >
                register
              </AuthButton>
            </ButtonView>
          </AuthView>
        </Container>
      </AuthSafeArea>
    </>
  );
};
