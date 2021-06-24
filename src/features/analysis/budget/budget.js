import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BudgetList } from "../../../components/BudgetList";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { monthlyData } from "../../../components/MonthlyData";
import { RecordsContext } from "../../../service/data/records.context";
import { YearMonth } from "../../../components/YearMonth";
import { Divider } from "react-native-elements";
import { SafeArea } from "../../../components/SafeArea";

export const Budget = ({ navigation }) => {
  const { records, budget } = useContext(RecordsContext);
  const holder = monthlyData(YearMonth(), true, records).map(
    (object) => object.amount
  );
  const totalExpense = !holder.length
    ? 0
    : holder.reduce((sum, object) => parseInt(sum, 10) + parseInt(object, 10));

  const totalBudget = budget
    .map((object) => object.amount)
    .reduce((sum, object) => parseInt(sum, 10) + parseInt(object, 10));

  const ratio = totalBudget === 0 ? 1 : totalExpense / totalBudget;

  const chartConfig = {
    backgroundColor: "grey",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "silver",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 0.5) =>
      ratio > 1
        ? `rgba(220, 35, 35, ${opacity})`
        : ratio > 0.7
        ? `rgba(250, 160, 0, ${opacity})`
        : `rgba(170, 170, 170, ${opacity})`,
    labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const data = {
    data: [ratio > 1 ? 1 : ratio],
  };

  return (
    <SafeArea>
      <View
        style={{
          flex: 0.45,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProgressChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          strokeWidth={20}
          radius={50}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <View style={{ padding: 10 }}>
          <Text>
            {totalBudget === 0
              ? "Set a budget to get Started"
              : "You have already spent " +
                Math.floor(ratio * 100) +
                "% of monthly budget!"}
          </Text>
        </View>
      </View>

      <Divider />

      <View style={{ flex: 0.48 }}>
        <BudgetList />
      </View>

      <View style={{ flex: 0.07, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
          }}
          onPress={() => {
            navigation.navigate("AddingBudget");
          }}
        >
          <Text>Add a Budget</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
