import React, { useEffect, useState, useContext } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import {
  HeaderContainer,
  InputView,
  SubmitButtonContainer,
  SubmitButton,
  SetterButton,
  DatePickerContainer,
  CategoryText,
} from "./components/adding.components";
import { Divider } from "react-native-elements";
import { CategoryList } from "../../components/CategoryList";
import { FormattedDate } from "../../components/FormattedDate";
import { TimeStamp } from "../../components/TimeStamp";
import { ExpenseCat } from "../../utils/ExpenseCat";
import { IncomeCat } from "../../utils/IncomeCat";
import { RecordsContext } from "../../service/data/records.context";
import { YearMonth } from "../../components/YearMonth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormattedDateToYearMonth } from "../../components/FormattedDateToYearMonth";
import DialogInput from "react-native-dialog-input";

export const AddingScreen = ({ navigation }) => {
  const { addRecord } = useContext(RecordsContext);

  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("Choose a category");
  const [input, setInput] = useState(null);
  const [color, setColor] = useState("orange");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const addAndBack = () => {
    addRecord(
      dateToString(date),
      input,
      category,
      isExpense,
      TimeStamp(),
      FormattedDateToYearMonth(dateToString(date)),
      comment
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
      <InputView>
        <Text style={styles.dollarSign(inputcolor)}>$</Text>
        <TextInput
          placeholder="0.00"
          style={styles.textInput}
          blurOnSubmit={false}
          keyboardType="numeric"
          autoFocus={true}
          onChange={({ nativeEvent }) => setInput(nativeEvent.text)}
          backgroundColor={inputcolor}
        />
      </InputView>
    );
  };

  const HeaderButton = () => {
    return (
      <HeaderContainer>
        <Button
          color="black"
          onPress={() => setIsExpense(true)}
          style={styles.expenseButton(isExpense)}
          uppercase={false}
          labelStyle={{
            fontFamily: "Poppins_400Regular",
          }}
        >
          expense
        </Button>
        <Button
          color="black"
          onPress={() => setIsExpense(false)}
          style={styles.incomeButton(isExpense)}
          uppercase={false}
          labelStyle={{
            fontFamily: "Poppins_400Regular",
          }}
        >
          income
        </Button>
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
        <CategoryText>{category}</CategoryText>
      </View>

      <Divider />

      <View style={{ flex: 0.4, paddingTop: 20 }}>
        <CategoryList
          CategoryData={isExpense ? ExpenseCat : IncomeCat}
          SetCategory={setCategory}
          SetColor={setColor}
        />
      </View>
      <View>
        <DatePickerContainer>
          <SetterButton
            onPress={() => {
              setShow(true);
            }}
            icon="calendar"
            color="black"
          >
            {dateToString(date) === FormattedDate()
              ? "Today"
              : dateToString(date)}
          </SetterButton>
          <SetterButton
            onPress={() => setVisible(true)}
            icon="comment"
            color="black"
          >
            {comment === "" ? "comment" : "commented"}
          </SetterButton>
        </DatePickerContainer>
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

        <DialogInput
          isDialogVisible={visible}
          title={"Input your comment"}
          initValueTextInput={comment}
          cancelText="Cancel"
          closeDialog={() => {
            setVisible(false);
          }}
          submitInput={(inputText) => {
            setComment(inputText);
            setVisible(false);
          }}
        />
      </View>
      <SubmitButtonContainer>
        <SubmitButton
          onPress={() => {
            if (category === "Choose a category") {
              alert("Choose a category");
            } else if (!input) {
              alert("input a valid value!");
            } else {
              addAndBack();
            }
          }}
          uppercase={false}
          color="black"
          icon="send"
          labelStyle={{
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
          }}
        >
          submit
        </SubmitButton>
      </SubmitButtonContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expenseButton: (isExp) => ({
    borderRadius: 4,
    backgroundColor: isExp ? "orange" : "white",
    alignItems: "center",
    justifyContent: "center",
  }),
  incomeButton: (isExp) => ({
    borderRadius: 4,
    backgroundColor: isExp ? "white" : "orange",
    alignItems: "center",
    justifyContent: "center",
  }),
  dollarSign: (inputColor) => ({
    justifyContent: "center",
    width: "15%",
    padding: 24,
    fontSize: 24,
    backgroundColor: inputColor,
  }),
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
});
