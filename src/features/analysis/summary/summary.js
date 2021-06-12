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

export const Summary = () => {
  const { records } = useContext(RecordsContext);

  const [endingMonth, setEndingMonth] = useState(YearMonth());

  return (
    <View style={{ alignItems: "center" }}>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          datasets: [
            {
              data: HalfYearData(endingMonth, records, false),
              color: (opacity = 0.5) => `rgba(255,0,0,${opacity})`,
            },
            {
              data: HalfYearData(endingMonth, records, true),
              color: (opacity = 0.5) => `rgba(0,0,102, ${opacity})`,
            },
          ],
          legend: ["Income", "Expense"],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
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
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={{ textAlign: "center" }}>
        From {yearMonthDecrement(endingMonth, 5)} To {endingMonth}{" "}
      </Text>
      <Slider
        style={{
          width: 400,
          height: 40,
        }}
        minimumValue={Math.min(...records.map((x) => x.yearMonth))}
        maximumValue={YearMonth()}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={1}
        value={endingMonth}
        onValueChange={(sliderValue) => setEndingMonth(sliderValue)}
      />
    </View>
  );
};