import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { HeaderContainer } from "./components/adding.components";
import { Divider } from "react-native-elements";
import { CategoryList } from "../../components/CategoryList";
import { RoundedButton } from "../../components/RoundedButton";
import { FormattedDate } from "../../components/FormattedDate";
import { TimeStamp } from "../../components/TimeStamp";
import { ExpenseCat } from "../../utils/ExpenseCat";
import { IncomeCat } from "../../utils/IncomeCat";
import { RecordsContext } from "../../service/data/records.context";
import { YearMonth } from "../../components/YearMonth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormattedDateToYearMonth } from "../../components/FormattedDateToYearMonth";

export const AddingScreen = ({ navigation }) => {
  const { addRecord } = useContext(RecordsContext);

  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const [input, setInput] = useState(null);
  const [color, setColor] = useState("orange");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const addAndBack = () => {
    addRecord(
      dateToString(date),
      input,
      category,
      isExpense,
      TimeStamp(),
      FormattedDateToYearMonth(dateToString(date))
    );
    setDate(new Date());
    navigation.goBack();
  };

  const dateToString = (inputDate) => {
    var day = inputDate.getDate();
    const formattedDate = day < 10 ? "0" + day : day;
    var month = inputDate.getMonth() + 1;
    const formattedMonth = month < 10 ? "0" + month : month;
    var year = inputDate.getFullYear();

    return formattedDate + "-" + formattedMonth + "-" + year;
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
          keyboardType="numeric"
          autoFocus={true}
          onChange={({ nativeEvent }) => setInput(nativeEvent.text)}
          backgroundColor={inputcolor}
        />
      </View>
    );
  };

  const HeaderButton = () => {
    return (
      <HeaderContainer>
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
      </HeaderContainer>
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
      <View>
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

      <View style={{ flex: 0.3, paddingTop: 20 }}>
        <CategoryList
          CategoryData={isExpense ? ExpenseCat : IncomeCat}
          SetCategory={setCategory}
          SetColor={setColor}
        />
      </View>
      <View>
        <View>
          <Button
            onPress={() => {
              setShow(true);
            }}
            title={
              dateToString(date) === FormattedDate()
                ? "Today"
                : dateToString(date)
            }
          />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={false}
            display="default"
            onChange={(event, selectedDate) => {
              const currDate = selectedDate || date;
              setShow(false);
              setDate(currDate);
            }}
          />
        )}
      </View>
      <View style={{ paddingTop: 10, alignItems: "center" }}>
        <RoundedButton
          title="submit"
          onPress={() => {
            if (category === "Choose a category") {
              alert("Choose a category");
            } else if (!input) {
              alert("input a valid value!");
            } else {
              addAndBack();
            }
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
