import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { add, min } from "react-native-reanimated";
import { Button } from "react-native";
import { FormattedDate } from "../components/FormattedDate";

const AddButton = styled(RoundedButton)`
  background-color: ${(props) => props.theme.colors.brand.pink1};
`;

const Data = [
  {
    date: "20th May",
    amount: 520,
    id: "5",
  },
];

const Item = ({ date, amount, category, isExpense }) => (
  <View>
    <Text style={{ textAlign: isExpense ? "right" : "left" }}>
      {date} : {category} ${amount}
    </Text>
  </View>
);

export const AccountPage = ({ navigation, records, clear }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  var currentMonth = FormattedDate().slice(3);

  // GOT PROBLEM CANNOT JUST COMPARE MINUTES MUST COMPARE DATE AND HOUR ALSO BUT FOR TESTING
  const currentSum = (currentMonth, isExpense) => {
    const res = records.filter(
      (object) =>
        object.date.slice(3) === currentMonth && object.isExpense === isExpense
    );
    return res.length === 0
      ? 0
      : res
          .map((object) => object.amount)
          .reduce((sum, object) => parseInt(sum) + parseInt(object));
  };

  useEffect(() => {
    setMonthlyIncome(currentSum(currentMonth, false));
    setMonthlyExpense(currentSum(currentMonth, true));
  }, [records]);

  const renderItem = ({ item }) => (
    <Item
      date={item.date}
      amount={item.amount}
      category={item.category}
      isExpense={item.isExpense}
    />
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "green",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <RoundedButton
            size={200}
            title="+"
            onPress={() => navigation.navigate("AddingPage")}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>Monthly Income: {monthlyIncome}</Text>
          <Text
            style={{ flex: 1, justifyContent: "flex-end", textAlign: "right" }}
          >
            Monthly Expenses: {monthlyExpense}
          </Text>
        </View>

        <Button title="clear" onPress={() => clear()} />

        <View
          style={{
            flex: 1,
            backgroundColor: "orange",
          }}
        >
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.timeStamp}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
