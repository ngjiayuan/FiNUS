import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RoundedButton } from "./src/components/RoundedButton";

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
export default function App() {
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
            style={{
              color: "black",
              alignItems: "center",
              alignContent: "center",
            }}
            size={200}
            title="+"
            onPress={() => null}
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
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
