import React, { useState } from "react";
import { SmallIcons } from "./SmallIcons";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

export const CategoryList = ({ CategoryData, SetCategory }) => {
  const renderCategoryItem = ({ item }) => {
    return (
      <SmallIcons
        name={item.name}
        color="orange"
        onPress={() => SetCategory(item.catName)}
      />
    );
  };
  return (
    <FlatList
      data={CategoryData}
      renderItem={renderCategoryItem}
      keyExtractor={(CategoryItem) => CategoryItem.name}
      horizontal={true}
    />
  );
};
