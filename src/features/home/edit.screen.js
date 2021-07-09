import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, ScrollView, Button } from "react-native";
import { Divider } from "react-native-elements";
import styled from "styled-components/native";
import {
  HeaderContainer,
  RemoveButton,
  SetterButton,
  DatePickerContainer,
  SubmitButton,
  SubmitButtonContainer,
} from "./components/adding.components";
import { RecordsContext } from "../../service/data/records.context";
import { CategoryList } from "../../components/CategoryList";
import { ExpenseCat } from "../../utils/ExpenseCat";
import { IncomeCat } from "../../utils/IncomeCat";
import { FormattedDate } from "../../components/FormattedDate";
import { TimeStamp } from "../../components/TimeStamp";
import { RoundedButton } from "../../components/RoundedButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormattedDateToYearMonth } from "../../components/FormattedDateToYearMonth";
import DialogInput from "react-native-dialog-input";

const Container = styled.View`
  flex: 1;
`;

export function EditScreen({ route, navigation }) {
  const [newAmount, setNewAmount] = useState(null);
  const [color, setColor] = useState("orange");
  const [newDate, setNewDate] = useState(new Date());
  const [newCategory, setNewCategory] = useState("");
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [visible, setVisible] = useState(false);

  const { date, amount, category, isExpense, timeStamp, comment } =
    route.params;
  const { removeRecord, editRecord } = useContext(RecordsContext);

  useEffect(() => {
    const dateSplit = date.split("-");
    setNewDate(
      new Date(
        parseInt(dateSplit[2], 10),
        parseInt(dateSplit[1], 10) - 1,
        parseInt(dateSplit[0], 10)
      )
    );
    setNewCategory(category);
    setNewAmount(amount);
    setColor(
      isExpense
        ? ExpenseCat.filter((x) => x.catName === category)[0].color
        : IncomeCat.filter((x) => x.catName === category)[0].color
    );
    setNewComment(comment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateToString = (inputDate) => {
    var day = inputDate.getDate();
    const formattedDate = day < 10 ? "0" + day : day;
    var month = inputDate.getMonth() + 1;
    const formattedMonth = month < 10 ? "0" + month : month;
    var year = inputDate.getFullYear();

    return formattedDate + "-" + formattedMonth + "-" + year;
  };

  const HeaderButton = () => {
    return (
      <HeaderContainer>
        <RemoveButton
          onPress={() => {
            removeRecord(timeStamp);
            navigation.goBack();
          }}
          icon="delete"
          color="white"
          uppercase={false}
          labelStyle={{
            fontFamily: "Poppins_400Regular",
          }}
        >
          remove
        </RemoveButton>
      </HeaderContainer>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderButton />,
    });
  }, [navigation]);

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
          placeholder={amount}
          style={{
            padding: 24,
            fontSize: 24,
            width: "85%",
            textAlign: "right",
          }}
          blurOnSubmit={false}
          keyboardType="number-pad"
          autoFocus={true}
          onChange={({ nativeEvent }) => setNewAmount(nativeEvent.text)}
          backgroundColor={inputcolor}
        />
      </View>
    );
  };

  return (
    <Container>
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
        <Text>{newCategory}</Text>
      </View>
      <Divider />
      <View style={{ flex: 0.3, paddingTop: 20 }}>
        <CategoryList
          CategoryData={isExpense ? ExpenseCat : IncomeCat}
          SetCategory={setNewCategory}
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
            {dateToString(newDate) === FormattedDate()
              ? "Today"
              : dateToString(newDate)}
          </SetterButton>
          <SetterButton
            onPress={() => setVisible(true)}
            icon="comment"
            color="black"
          >
            {newComment === "" ? "comment" : "commented"}
          </SetterButton>
        </DatePickerContainer>
        {show && (
          <DateTimePicker
            value={newDate}
            mode="date"
            is24Hour={false}
            display="default"
            onChange={(event, selectedDate) => {
              const currDate = selectedDate || newDate;
              setShow(false);
              setNewDate(currDate);
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
            setNewComment(inputText);
            setVisible(false);
          }}
        />
      </View>
      <SubmitButtonContainer>
        <SubmitButton
          color="black"
          labelStyle={{
            fontFamily: "Poppins_400Regular",
            fontSize: 18,
          }}
          uppercase={false}
          icon="pencil"
          onPress={() => {
            editRecord(
              timeStamp,
              dateToString(newDate),
              newAmount,
              newCategory,
              isExpense,
              TimeStamp(),
              FormattedDateToYearMonth(dateToString(newDate)),
              newComment
            );
            navigation.goBack();
          }}
        >
          update
        </SubmitButton>
      </SubmitButtonContainer>
    </Container>
  );
}
