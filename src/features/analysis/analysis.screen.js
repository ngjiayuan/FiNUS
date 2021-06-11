import React, { useContext } from "react";
import { SafeAreaView, Text, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { AnalysisNavigator } from "../../infrastructure/navigation/analysis.navigator";

export function AnalysisScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <AnalysisNavigator />
      </View>
    </SafeAreaView>
  );
}
