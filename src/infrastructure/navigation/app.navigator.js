import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RecordsContextProvider } from "../../service/data/records.context";
import { HomeNavigator } from "./home.navigator";
import { LinksScreen } from "../../features/links/links.screen";
import { AnalysisScreen } from "../../features/analysis/analysis.screen";
import { SettingScreen } from "../../features/setting/setting";
import { SetterButton } from "../../features/home/components/adding.components";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home-outline",
  Links: "link-outline",
  Analysis: "pie-chart-outline",
  Setting: "settings-outline",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export function AppNavigator() {
  return (
    <RecordsContextProvider>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        tabBarOptions={{
          activeTintColor: "white",
          activeBackgroundColor: "grey",
        }}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Links" component={LinksScreen} />
        <Tab.Screen name="Analysis" component={AnalysisScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </RecordsContextProvider>
  );
}
