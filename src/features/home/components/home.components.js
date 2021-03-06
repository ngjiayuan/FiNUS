import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { RoundedButton } from "../../../components/RoundedButton";

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
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.blue};
  padding-left: ${(props) => props.theme.spacing.s};
  padding-right: ${(props) => props.theme.spacing.s};
`;

export const MonthlyIncome = styled.Text`
  flex: 1;
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.ml};
`;

export const MonthlyExpense = styled.Text`
  flex: 1;
  text-align: right;
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.ml};
`;

export const MonthButton = styled(Button)`
  width: 120px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.ui.blue};
  justify-content: center;
  border-radius: 0px;
  border-width: 0.5px;
  border-color: black;
`;

export const CalendarView = styled.View`
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Calendar = styled.View`
  background-color: #fff;
  margin-horizontal: 50px;
  margin-vertical: 70px;
  border-radius: 4px;
  padding-bottom: 10px;
  align-items: center;
`;

export const CloseButton = styled(Button)`
  width: 120px;
  background-color: ${(props) => props.theme.colors.ui.red};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.ui.blue};
  padding-left: ${(props) => props.theme.spacing.s};
  padding-right: ${(props) => props.theme.spacing.s};
`;

export const ClearButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
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
  justify-content: flex-end;
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

export const ExpenseTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.m};
  background-color: ${(props) => props.theme.colors.ui.red};
  padding-horizontal: 5px;
  border-radius: 2px;
  width: 60%;
  text-align: center;
`;

export const IncomeTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.m};
  background-color: ${(props) => props.theme.colors.ui.green};
  padding-horizontal: 5px;
  border-radius: 2px;
  width: 60%;
  text-align: center;
`;
