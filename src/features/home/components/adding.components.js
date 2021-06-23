import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const HeaderButton = styled(Button)`
  width: 90px;
  background-color: ${(props) => props.theme.colors.ui.red};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;
