import React from "react";
import { Button, Text, View } from "react-native";

export const HeaderButton = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={() => alert("change to income")}
        title="expense"
        color="black"
      />
      <Button
        onPress={() => alert("change to income")}
        title="income"
        color="black"
      />
    </View>
  );
};

export const AddingPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Adding Page</Text>
    </View>
  );
};
