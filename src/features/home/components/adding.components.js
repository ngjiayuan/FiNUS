import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  flex: 1;
`;

export const InputView = styled.View`
  flex-direction: row;
`;

export const SubmitButtonContainer = styled.View`
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  height: 55px;
  width: 250px;
  background-color: ${(props) => props.theme.colors.ui.orange};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const SetterButton = styled(Button)`
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
  height: 40px;
  width: 150px;
  background-color: ${(props) => props.theme.colors.ui.blue};
`;

export const DatePickerContainer = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.sizes.s};
`;

export const CategoryText = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
`;

export const RemoveButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.ui.red};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;
