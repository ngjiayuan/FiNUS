import { TextInput, SafeAreaView, StatusBar, Image } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

export const AuthSafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.ui.grey};
  align-items: center;
`;

export const Container = styled.View`
  padding: ${(props) => props.theme.spacing.l};
  flex: 1;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
  height: 50px;
  padding: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.ui.white};
  border-radius: ${(props) => props.theme.sizes.xxs};
  font-size: ${(props) => props.theme.fontSizes.m};
  font-family: ${(props) => props.theme.fonts.roboto};
`;

export const AuthButton = styled(Button)`
  width: 116px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.ui.white};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.l};
`;

export const AuthView = styled.View`
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  align-items: center;
  padding: ${(props) => props.theme.spacing.ml};
  border-radius: ${(props) => props.theme.sizes.xs};
`;

export const ButtonView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const Logo = styled(Image)`
  width: 144px;
  height: 144px;
`;

export const LogoView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.5;
`;
