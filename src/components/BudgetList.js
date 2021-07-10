import React, { useContext } from "react";
import { Text, View, FlatList } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { RecordsContext } from "../service/data/records.context";
import { YearMonth } from "./YearMonth";
import { monthlyData } from "./MonthlyData";
import { Divider } from "react-native-elements";
import { Icon } from "react-native-elements";

const BudgetCard = ({ item }) => {
  return (
    <View>
      <Divider />
      <View style={{ marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: item.category.color,
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Icon
            name={item.category.name}
            type="material-community"
            size={40}
            color={"white"}
          />

          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
              right: 20,
            }}
          >
            <Text>{item.category.catName}</Text>
            <Text>
              {item.spentAmount} / {item.budgetAmount}
            </Text>
          </View>
        </View>

        <ProgressBar
          progress={
            item.budgetAmount === 0 ? 0 : item.spentAmount / item.budgetAmount
          }
          width={null}
          height={15}
          color={
            item.budgetAmount === 0
              ? 0
              : item.spentAmount / item.budgetAmount >= 0.7
              ? "red"
              : item.spentAmount / item.budgetAmount >= 0.5
              ? "orange"
              : "grey"
          }
          opacity={0.5}
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
  const newBudget = budget.filter((ele) => ele.amount !== 0);
  const data = !newBudget.length
    ? []
    : newBudget.map(function (ele) {
        return {
          budgetAmount: ele.amount,
          category: ele.category,
          spentAmount: monthlyRecords.find(
            (record) => record.name === ele.category.catName
          )
            ? monthlyRecords
                .filter((record) => record.name === ele.category.catName)
                .map((ele) => ele.amount)
                .reduce((sum, amt) => parseInt(sum) + parseInt(amt))
            : 0,
        };
      });

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.category.catName}
      />
    </View>
  );
};
