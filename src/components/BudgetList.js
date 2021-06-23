import React, { useContext } from "react";
import { Text, View, FlatList } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { RecordsContext } from "../service/data/records.context";
import { YearMonth } from "./YearMonth";
import { monthlyData } from "./MonthlyData";
import { Divider } from "react-native-elements";

const BudgetCard = ({ item }) => {
  return (
    <View>
      <Divider />
      <View style={{ marginBottom: 15 }}>
        <Text>{item.catName}</Text>
        <Text>
          {item.spentAmount} / {item.budgetAmount}
        </Text>
        <ProgressBar
          progress={
            item.budgetAmount === 0 ? 0 : item.spentAmount / item.budgetAmount
          }
          width={null}
          color={
            item.budgetAmount === 0
              ? 0
              : item.spentAmount / item.budgetAmount >= 0.7
              ? "red"
              : item.spentAmount / item.budgetAmount >= 0.5
              ? "orange"
              : "grey"
          }
          unfilledColor="white"
        />
      </View>
    </View>
  );
};

const renderItem = ({ item }) => {
  return <BudgetCard item={item} />;
};

export const BudgetList = () => {
  const currentYearMonth = YearMonth();
  const { budget, records } = useContext(RecordsContext);
  const monthlyRecords = monthlyData(currentYearMonth, true, records);
  const ifMonthlyRecordsEmpty = monthlyRecords.length;
  const newBudget = budget.filter((ele) => ele.amount !== 0);
  console.log(ifMonthlyRecordsEmpty);
  const data = !newBudget.length
    ? []
    : newBudget.map(function (ele) {
        return {
          budgetAmount: ele.amount,
          catName: ele.category.catName,
          spentAmount: monthlyRecords.find(
            (record) => record.name === ele.category.catName
          )
            ? monthlyRecords.find(
                (record) => record.name === ele.category.catName
              ).amount
            : 0,
        };
      });

  console.log(newBudget);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.catName}
      />
    </View>
  );
};
