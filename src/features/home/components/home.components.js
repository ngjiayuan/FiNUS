import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { RoundedButton } from "../../../components/RoundedButton";

export const HeaderView = styled.View`
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.ml};
`;

export const AddButtonContainer = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.blue};
  padding: ${(props) => props.theme.spacing.sm};
`;

export const AddButton = styled(RoundedButton)`
  border-width: 1px;
  background-color: ${(props) => props.theme.colors.ui.pink};
`;

export const MonthlySumContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.ui.blue};
  padding: ${(props) => props.theme.spacing.xs};
`;

export const MonthlyIncome = styled.Text`
  flex: 1;
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.m};
`;

export const MonthlyExpense = styled.Text`
  flex: 1;
  text-align: right;
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.m};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.ui.blue};
  padding-left: ${(props) => props.theme.spacing.s};
  padding-right: ${(props) => props.theme.spacing.s};
`;

export const ClearButtonContainer = styled.View`
  flex: 1;
`;

export const ClearButton = styled(Button)`
  width: 90px;
  background-color: ${(props) => props.theme.colors.ui.red};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const LogoutButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const LogoutButton = styled(Button)`
  width: 100px;
  background-color: ${(props) => props.theme.colors.ui.black};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const ListContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.lightblue};
  padding: ${(props) => props.theme.spacing.s};
`;

export const ItemButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.ui.lightgrey};
  padding: ${(props) => props.theme.spacing.xs};
  width: 50%;
  border-radius: ${(props) => props.theme.sizes.xs};
  elevation: 2;
  box-shadow: 1px 1px 1px grey;
`;

export const ItemText = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
