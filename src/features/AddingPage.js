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
import { CategoryList } from "../components/CategoryList";
import { SmallIcons } from "../components/SmallIcons";
import { RoundedButton } from "../components/RoundedButton";
import { FormattedDate } from "../components/FormattedDate";
import { TimeStamp } from "../components/TimeStamp";

const ExpenseCat = [
  {
    name: "star-circle",
    catName: "general",
  },
  {
    name: "silverware",
    catName: "dining",
  },
];

const IncomeCat = [
  {
    name: "piggy-bank",
    catName: "general",
  },
  {
    name: "cash",
    catName: "salaries",
  },
];

export const AddingPage = ({ navigation, addRecord }) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const [input, setInput] = useState(null);

  const HeaderButton = () => {
    return (
      <View style={styles.titleContainer}>
        <RoundedButton
          onPress={() => setIsExpense(true)}
          title="expense"
          style={{
            color: "black",
            borderRadius: 0,
            borderWidth: 0,
            backgroundColor: isExpense ? "orange" : "white",
            width: "40%",
          }}
          size={40}
          textStyle={styles.buttonText}
        />
        <RoundedButton
          onPress={() => setIsExpense(false)}
          title="income"
          style={{
            color: "black",
            borderRadius: 0,
            borderWidth: 0,
            backgroundColor: isExpense ? "white" : "orange",
            width: "40%",
          }}
          size={40}
          textStyle={styles.buttonText}
        />
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderButton />,
    });
  }, [navigation, isExpense]);

  useEffect(() => {
    setCategory("Choose a category");
  }, [isExpense]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Text style={styles.inputTitle}>$</Text>
        <TextInput
          placeholder="0.00"
          style={styles.textInput}
          keyboardType="number-pad"
          autoFocus={true}
          onEndEditing={({ nativeEvent }) => setInput(nativeEvent.text)}
          backgroundColor="orange"
        />
      </View>
      <Text>{JSON.stringify(input)}</Text>
      <Text>{category}</Text>
      <CategoryList
        CategoryData={isExpense ? ExpenseCat : IncomeCat}
        SetCategory={setCategory}
      />
      <RoundedButton
        title="submit"
        onPress={() => {
          addRecord(TimeStamp(), FormattedDate(), input);
          navigation.navigate("MainPage");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInputContainer: {
    flexDirection: "row",
  },
  inputTitle: {
    justifyContent: "center",
    width: "15%",
    padding: 24,
    fontSize: 24,
    backgroundColor: "orange",
  },
  textInput: {
    padding: 24,
    fontSize: 24,
    width: "85%",
    textAlign: "right",
  },
  category: {
    fontSize: 18,
    padding: 10,
  },
  button: {
    color: "black",
    borderRadius: 0,
    borderWidth: 0,
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
