import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { FormattedDate } from "../../components/FormattedDate";
import { RecordsContext } from "../../service/data/records.context";

const AddButton = styled(RoundedButton)`
  background-color: ${(props) => props.theme.colors.brand.pink1};
`;

const ItemButton = styled(TouchableOpacity)`
  background-color: #e4f4ff;
  padding: 2px;
  width: 50%;
  border-radius: 4px;
  align-items: center;
`;

export const HomeScreen = ({ navigation }) => {
  const { records, clear } = useContext(RecordsContext);

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  var currentMonth = FormattedDate().slice(3);

  const Item = ({ date, amount, category, isExpense, timeStamp }) => (
    <View style={styles.itemContainer(isExpense)}>
      <ItemButton
        onPress={() =>
          navigation.navigate("EditScreen", {
            date: date,
            amount: amount,
            category: category,
            isExpense: isExpense,
            timeStamp: timeStamp,
          })
        }
      >
        <Text>
          {date} : {category} ${amount}
        </Text>
      </ItemButton>
    </View>
  );

  useEffect(() => {
    const currentSum = (currMonth, isExpense) => {
      const res = records.filter(
        (object) =>
          object.date.slice(3) === currMonth && object.isExpense === isExpense
      );
      return res.length === 0
        ? 0
        : res
            .map((object) => object.amount)
            .reduce((sum, object) => parseInt(sum) + parseInt(object));
    };
    setMonthlyIncome(currentSum(currentMonth, false));
    setMonthlyExpense(currentSum(currentMonth, true));
  }, [records, currentMonth]);

  const renderItem = ({ item }) => (
    <Item
      date={item.date}
      amount={item.amount}
      category={item.category}
      isExpense={item.isExpense}
      timeStamp={item.timeStamp}
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
            onPress={() => navigation.navigate("AddingScreen")}
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
  itemContainer: (isExp) => ({
    padding: 2,
    alignItems: isExp ? "flex-end" : "flex-start",
  }),
});
