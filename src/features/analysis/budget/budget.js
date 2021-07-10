import React, { useContext } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { BudgetList } from "../../../components/BudgetList";
import { ProgressChart } from "react-native-chart-kit";
import { monthlyData } from "../../../components/MonthlyData";
import { RecordsContext } from "../../../service/data/records.context";
import { YearMonth } from "../../../components/YearMonth";
import { Divider } from "react-native-elements";
import { SafeArea } from "../../../components/SafeArea";
import { TotalBudget } from "./components/totalBudget.component";
import { HeaderView, HeaderText } from "../../../components/HeaderComponent";
import { Spacer } from "../../../components/Spacer";
import { Button } from "react-native-paper";

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

  const ratio = totalBudget === 0 ? 0 : totalExpense / totalBudget;

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
        : `rgba(60, 120, 240, ${opacity})`,
    labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 6,
      marginTop: 0,
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
      <HeaderView>
        <HeaderText>Budget</HeaderText>
      </HeaderView>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 0.5, alignItems: "center", width: "100%" }}>
          {totalBudget !== 0 ? (
            <ProgressChart
              data={data}
              width={Dimensions.get("window").width * 0.95}
              height={160}
              strokeWidth={20}
              radius={50}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{ marginTop: 0 }}
            />
          ) : (
            <View
              style={{
                width: "95%",
                borderRadius: 6,
                height: 160,
                backgroundColor: "pink",
                opacity: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No data available</Text>
              <Text>Enter data to get started :)</Text>
            </View>
          )}
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
              {totalBudget === 0
                ? "Set a budget to get started"
                : "You have already spent " +
                  Math.floor(ratio * 100) +
                  "% of monthly budget! "}
            </Text>
            <Divider />
            <Text
              style={{ backgroundColor: "pink", opacity: 0.5, marginTop: 5 }}
            >
              {totalBudget === 0 ? "" : TotalBudget(totalExpense, totalBudget)}
            </Text>
          </View>
        </View>

        <Divider />

        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            width: "95%",
          }}
        >
          <View style={{ flex: 0.8 }}>
            <BudgetList />
          </View>
          <View style={{ flex: 0.2, marginTop: 5 }}>
            <Button
              style={{
                alignItems: "center",
                backgroundColor: "#DDDDDD",
              }}
              onPress={() => {
                navigation.navigate("AddingBudget");
              }}
              uppercase={false}
              labelStyle={{ fontFamily: "Poppins_400Regular" }}
              color="black"
              icon="plus"
            >
              <Text>Add a Budget</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeArea>
  );
};
