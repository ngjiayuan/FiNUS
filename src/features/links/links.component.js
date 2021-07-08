import React from "react";
import styled from "styled-components/native";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const InfoCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.ui.white};
  margin-bottom: ${(props) => props.theme.spacing.m};
`;

const CardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.ui.white};
  padding: ${(props) => props.theme.spacing.m};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: ${(props) => props.theme.fontSizes.m};
  padding-left: ${(props) => props.theme.spacing.m};
`;

const Website = styled.Text`
  font-family: ${(props) => props.theme.fonts.robotoMono};
  font-size: ${(props) => props.theme.fontSizes.sm};
  padding-left: ${(props) => props.theme.spacing.m};
  padding-bottom: ${(props) => props.theme.spacing.m};
  text-decoration: underline;
`;

export function LinkCard({ link = {} }) {
  const {
    name = "Link Name",
    photo = "https://twisper.com/wp-content/uploads/2020/03/close-up-photo-of-burger-3915906-scaled.jpg",
    website = "https://www.website.com/",
    category = "none",
  } = link;

  return (
    <>
      <InfoCard elevation={5}>
        <CardCover key={name} source={{ uri: photo }} resizeMode="contain" />
        <Title>{name}</Title>
        <Website>{website}</Website>
      </InfoCard>
    </>
  );
}

export const FilterContainer = styled.View`
  align-items: center;
`;

export const Filter = styled(DropDownPicker)`
  border-radius: 1px;
  border-width: 0px;
  width: 170px;
  height: 40px;
`;

export const CardListContainer = styled.View`
  margin-bottom: 60px;
  z-index: -5;
`;
