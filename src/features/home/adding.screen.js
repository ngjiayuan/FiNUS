import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import { CategoryList } from "../../components/CategoryList";
import { RoundedButton } from "../../components/RoundedButton";
import { FormattedDate } from "../../components/FormattedDate";
import { TimeStamp } from "../../components/TimeStamp";
import { ExpenseCat } from "../../utils/ExpenseCat";
import { IncomeCat } from "../../utils/IncomeCat";
import { RecordsContext } from "../../service/data/records.context";

export const AddingScreen = ({ navigation }) => {
  const { addRecord } = useContext(RecordsContext);

  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const [input, setInput] = useState(null);
  const [color, setColor] = useState("orange");

  const addAndBack = () => {
    addRecord(FormattedDate(), input, category, isExpense, TimeStamp());
    navigation.goBack();
  };

  const inputPanel = (inputcolor) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            justifyContent: "center",
            width: "15%",
            padding: 24,
            fontSize: 24,
            backgroundColor: inputcolor,
          }}
        >
          $
        </Text>
        <TextInput
          placeholder="0.00"
          style={{
            padding: 24,
            fontSize: 24,
            width: "85%",
            textAlign: "right",
          }}
          blurOnSubmit={false}
          keyboardType="number-pad"
          autoFocus={true}
          onChange={({ nativeEvent }) => setInput(nativeEvent.text)}
          backgroundColor={inputcolor}
        />
      </View>
    );
  };

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
    setColor("orange");
  }, [isExpense]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <ScrollView
          contentContainerStyle={{ flexDirection: "row" }}
          keyboardShouldPersistTaps="always"
        >
          {inputPanel(color)}
        </ScrollView>
      </View>

      <View
        style={{ alignItems: "center", height: 50, justifyContent: "center" }}
      >
        <Text>{category}</Text>
      </View>

      <Divider />

      <View style={{ flex: 0.25, paddingTop: 20 }}>
        <CategoryList
          CategoryData={isExpense ? ExpenseCat : IncomeCat}
          SetCategory={setCategory}
          SetColor={setColor}
        />
      </View>

      <View style={{ paddingTop: 10, alignItems: "center" }}>
        <RoundedButton
          title="submit"
          onPress={() => {
            category === "Choose a category"
              ? alert("Choose a category")
              : !input
              ? alert("input a valid value!")
              : addAndBack();
          }}
        />
      </View>
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
