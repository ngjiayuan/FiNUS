import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { add } from "react-native-reanimated";

const AddButton = styled(RoundedButton)`
  background-color: ${(props) => props.theme.colors.brand.pink1};
`;

const Data = [
  {
    date: "20th May",
    amount: 520,
    id: "5",
  },
];

const Item = ({ date, amount }) => (
  <View>
    <Text>
      {date}:{amount}
    </Text>
  </View>
);

export const AccountPage = ({ navigation, records }) => {
  const renderItem = ({ item }) => (
    <Item date={item.date} amount={item.amount} />
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "green",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <RoundedButton
            size={200}
            title="+"
            onPress={() => navigation.navigate("AddingPage")}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>Monthly Income: </Text>
          <Text
            style={{ flex: 1, justifyContent: "flex-end", textAlign: "right" }}
          >
            Monthly Expenses:{" "}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "orange",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
