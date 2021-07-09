import styled from "styled-components/native";
import { Switch } from "react-native";
import { Button } from "react-native-paper";

export const DailyReminderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DailyReminderButtonContainer = styled.View`
  flex: 1;
  padding-left: 20px;
`;

export const DailyReminderButton = styled(Button)`
  width: 100%;
  align-items: flex-start;
`;

export const DailyReminderSwitchContainer = styled.View`
  flex: 0.1;
  padding-right: 32px;
`;

export const DailyReminderSwitch = styled(Switch)``;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.ml};
  padding-left: ${(props) => props.theme.spacing.l};
`;

export const ClearButton = styled(Button)`
  margin-left: 20px;
  width: 45%;
  background-color: ${(props) => props.theme.colors.ui.red};
  align-items: flex-start;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;

export const LogoutButton = styled(Button)`
  margin-left: 20px;
  width: 45%;
  background-color: ${(props) => props.theme.colors.ui.black};
  align-items: flex-start;
  justify-content: center;
  border-radius: ${(props) => props.theme.sizes.xxs};
`;
