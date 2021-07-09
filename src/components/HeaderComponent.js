import styled from "styled-components/native";

export const HeaderView = styled.View`
  margin-top: ${(props) => props.theme.spacing.m};
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.ml};
`;
