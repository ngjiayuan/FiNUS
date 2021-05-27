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

export const CategoryList = ({ CategoryData, SetCategory, SetColor }) => {
  const setCatAndColor = (name, color) => {
    SetCategory(name);
    SetColor(color);
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <SmallIcons
        name={item.name}
        color={item.color}
        onPress={() => setCatAndColor(item.catName, item.color)}
      />
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={CategoryData}
        renderItem={renderCategoryItem}
        keyExtractor={(CategoryItem) => CategoryItem.name}
        horizontal={false}
        numColumns={5}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
      />
    </View>
  );
};
