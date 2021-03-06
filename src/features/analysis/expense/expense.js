import React, { useContext, useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  HalfYearData,
  yearMonthDecrement,
} from "../../../components/HalfYearData";
import { YearMonth } from "../../../components/YearMonth";
import { RecordsContext } from "../../../service/data/records.context";
import Slider from "@react-native-community/slider";
import { monthlyData } from "../../../components/MonthlyData";
import { SafeArea } from "../../../components/SafeArea";
import { combineCatData } from "../../../components/CombineCatData";
import { ExpenseHelper } from "./components/expense.component";
import { HeaderView, HeaderText } from "../../../components/HeaderComponent";
import { Spacer } from "../../../components/Spacer";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export const Expense = () => {
  const { records } = useContext(RecordsContext);

  const [endingMonth, setEndingMonth] = useState(YearMonth());
  const holder = monthlyData(endingMonth, true, records);
  const data = combineCatData(holder);
  const compareData = ExpenseHelper(records, endingMonth);

  return (
    <SafeArea>
      <HeaderView>
        <HeaderText>Expense Analysis</HeaderText>
      </HeaderView>
      <View style={{ alignItems: "center" }}>
        {data.length ? (
          <PieChart
            data={data}
            width={Dimensions.get("window").width * 0.95}
            height={220}
            chartConfig={chartConfig}
            accessor={"amount"}
            backgroundColor={"transparent"}
          />
        ) : (
          <View
            style={{
              width: "95%",
              borderRadius: 6,
              height: 220,
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
        <Spacer />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
          }}
        >
          Expense Breakdown for {endingMonth}
        </Text>
        <Slider
          style={{
            width: 400,
            height: 40,
          }}
          minimumValue={
            records.length
              ? Math.min(...records.map((x) => x.yearMonth))
              : YearMonth()
          }
          maximumValue={YearMonth()}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="red"
          step={1}
          value={YearMonth()}
          onValueChange={(sliderValue) => setEndingMonth(sliderValue)}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
          }}
        >
          Analysis of top {compareData[0] ? compareData[0] + " " : ""}spending
          categories
        </Text>
        <Spacer />
        {data.length ? (
          <StackedBarChart
            data={{
              labels: compareData[1],
              legend: [
                yearMonthDecrement(endingMonth, 2),
                yearMonthDecrement(endingMonth, 1),
                endingMonth,
              ],
              data: compareData[2],
              barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
            }}
            width={Dimensions.get("window").width * 0.95}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 6 }}
          />
        ) : (
          <View
            style={{
              width: "95%",
              borderRadius: 6,
              height: 220,
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
      </View>
    </SafeArea>
  );
};
