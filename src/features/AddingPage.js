import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export const AddingPage = ({ navigation }) => {
  const [isExpense, setIsExpense] = useState(true);
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
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Adding Page</Text>
      <Text>Currently at {isExpense ? "expense" : "income"}</Text>
    </View>
  );
};
