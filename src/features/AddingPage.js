import React from "react";
import { useEffect, useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";

import { SmallIcons } from "../components/SmallIcons";

export const AddingPage = ({ navigation }) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const HeaderButton = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => setIsExpense(true)}
          title="expense"
          color="black"
        />
        <Button
          onPress={() => setIsExpense(false)}
          title="income"
          color="black"
        />
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderButton />,
    });
  }, [navigation, isExpense]);
  return isExpense ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder={category}
        style={{ backgroundColor: category === "rowing" ? "green" : "blue" }}
      />
      <Text>Adding Page</Text>
      <Text>Currently at expense</Text>
      <SmallIcons name="account" color="orange" onPress={setCategory} />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Adding Page</Text>
      <Text>Currently at income</Text>
    </View>
  );
};
