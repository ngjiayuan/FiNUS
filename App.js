import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { Text } from "react-native";
import { BottomNavigation } from 'react-native-paper';
import { AccountPage } from "./src/features/AccountPage";

const AccountRoute = () => <AccountPage />;

const SalesRoute = () => <Text>Sales</Text>;

const AnalysisRoute = () => <Text>Analysis</Text>;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "account", title: "Account", icon: "account" },
    { key: "sales", title: "Sales", icon: "shopping" },
    { key: "analysis", title: "Analysis", icon: "chart-arc" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    account: AccountRoute,
    sales: SalesRoute,
    analysis: AnalysisRoute,
  });

  return (
    <BottomNavigation
      shifting={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}