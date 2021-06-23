import { Button } from "react-native-paper";
import styled from "styled-components/native";

export const StyledButton = styled(Button)`
    width: 120px;
    height 50px;
    background-color: ${(props) => props.theme.colors.ui.white};
    border-radius: ${(props) => props.theme.sizes.xxs};
    padding: 2px;
`;
