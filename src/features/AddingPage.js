import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SmallIcons } from "../components/SmallIcons";

export const AddingPage = ({ navigation }) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const [input, setInput] = useState("");

  const HeaderButton = () => {
    return (
      <View style={styles.titleContainer}>
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
    <View
      contentContainerStyle={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="always"
    >
      <TextInput
        placeholder={category}
        style={styles.textInput}
        keyboardType="number-pad"
        autoFocus={true}
        value={input}
        onChangeText={(text) => setInput(text)}
        backgroundColor="orange"
      />
      <Text>EXPENSE Insert FlatList here</Text>
      <SmallIcons name="account" color="orange" onPress={setCategory} />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder={category}
        style={styles.textInput}
        keyboardType="number-pad"
        autoFocus={true}
        value={input}
        onChangeText={(text) => setInput(text)}
        backgroundColor="orange"
      />
      <Text>INCOME Insert FlatList here</Text>
      <SmallIcons name="account" color="orange" onPress={setCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    padding: 24,
    fontSize: 20,
  },
});
