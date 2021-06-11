import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Summary } from "../../features/analysis/summary/summary";

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

const Budget = () => {
  return <Text>Budget Holder</Text>;
};
const Spending = () => {
  return <Text>Spending Holder</Text>;
};
const Income = () => {
  return <Text>Income Holder</Text>;
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
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Spending" component={Spending} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator>
  );
};
