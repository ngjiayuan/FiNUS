import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { add } from "react-native-reanimated";
import { Button } from "react-native";

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

const Item = ({ date, amount, category, isExpense }) => (
  <View>
    <Text style={{ textAlign: isExpense ? "right" : "left" }}>
      {date} : {category} ${amount}
    </Text>
  </View>
);

export const AccountPage = ({ navigation, records, clear }) => {
  const renderItem = ({ item }) => (
    <Item
      date={item.date}
      amount={item.amount}
      category={item.category}
      isExpense={item.isExpense}
    />
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

        <Button title="clear" onPress={() => clear()} />

        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 0.5 }}>Income: </Text>
          <Text
            style={{
              flex: 0.5,
              justifyContent: "flex-end",
            }}
          >
            Expenses:{" "}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "orange",
          }}
        >
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.timeStamp}
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
