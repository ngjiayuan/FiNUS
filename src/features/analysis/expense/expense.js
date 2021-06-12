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

  return (
    <View style={{ alignItems: "center" }}>
      <Text>Monthly Income Analysis</Text>
      <PieChart
        data={monthlyData(endingMonth, true, records)}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
      />
      <Text style={{ textAlign: "center" }}>
        Expense BreakDown for {endingMonth}
      </Text>
      <Slider
        style={{
          width: 400,
          height: 40,
        }}
        minimumValue={Math.min(...records.map((x) => x.yearMonth))}
        maximumValue={YearMonth()}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="red"
        step={1}
        value={YearMonth()}
        onValueChange={(sliderValue) => setEndingMonth(sliderValue)}
      />
    </View>
  );
};
