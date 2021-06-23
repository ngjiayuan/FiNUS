import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, ScrollView, Button } from "react-native";
import { Divider } from "react-native-elements";
import styled from "styled-components/native";

import { RecordsContext } from "../../service/data/records.context";
import { CategoryList } from "../../components/CategoryList";
import { ExpenseCat } from "../../utils/ExpenseCat";
import { IncomeCat } from "../../utils/IncomeCat";
import { FormattedDate } from "../../components/FormattedDate";
import { TimeStamp } from "../../components/TimeStamp";
import { RoundedButton } from "../../components/RoundedButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const Container = styled.View`
  flex: 1;
`;

export function EditScreen({ route, navigation }) {
  const [newAmount, setNewAmount] = useState(null);
  const [color, setColor] = useState("orange");
  const [newDate, setNewDate] = useState(new Date());
  const [newCategory, setNewCategory] = useState("");
  const [show, setShow] = useState(false);

  const { date, amount, category, isExpense, timeStamp } = route.params;
  const { removeRecord, editRecord, addRecord } = useContext(RecordsContext);

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
      <View>
        <RoundedButton
          onPress={() => {
            removeRecord(timeStamp);
            navigation.goBack();
          }}
          title="remove"
          style={{
            color: "black",
            borderRadius: 0,
            borderWidth: 0,
            backgroundColor: "#ffe4e4",
            width: "40%",
          }}
          size={40}
          textStyle={{ fontSize: 20 }}
        />
      </View>
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
        <View>
          <Button
            onPress={() => {
              setShow(true);
            }}
            title={
              dateToString(newDate) === FormattedDate()
                ? "Today"
                : dateToString(newDate)
            }
          />
        </View>
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
      </View>
      <View style={{ paddingTop: 10, alignItems: "center" }}>
        <RoundedButton
          title="update"
          onPress={() => {
            editRecord(
              timeStamp,
              dateToString(newDate),
              newAmount,
              newCategory,
              isExpense,
              TimeStamp()
            );
            navigation.goBack();
          }}
        />
      </View>
    </Container>
  );
}
