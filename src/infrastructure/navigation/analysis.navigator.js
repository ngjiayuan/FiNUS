import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Summary } from "../../features/analysis/summary/summary";
import { Income } from "../../features/analysis/income/income";
import { Expense } from "../../features/analysis/expense/expense";
import { BudgetNavigator } from "./budget.navigator";
import { ExpenseCat } from "../../utils/ExpenseCat";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Budget: "calculator",
  Spending: "chart-ppf",
  Income: "chart-bell-curve-cumulative",
  Summary: "chart-pie",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    ),
  };
};

export const AnalysisNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "orange",
        activeBackgroundColor: "white",
        safeAreaInsets: {
          bottom: 0,
        },
      }}
    >
      <Tab.Screen name="Budget" component={BudgetNavigator} />
      <Tab.Screen name="Spending" component={Expense} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator>
  );
};
