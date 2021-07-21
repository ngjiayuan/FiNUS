import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SmallIcons } from "./SmallIcons";
import DialogInput from "react-native-dialog-input";
import { RecordsContext } from "../service/data/records.context";

export const BudgetSelect = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const { editBudget } = useContext(RecordsContext);
  const add = (inputText) => {
    editBudget(
      parseInt(inputText, 10),
      item.category,
      parseInt(inputText, 10) !== 0
    );
    setVisible(false);
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          height: 40,
          marginTop: 20,
        }}
      >
        <View>
          <SmallIcons
            name={item.category.name}
            color={item.category.color}
            onPress={null}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            height: 40,
            borderColor: "orange",
            borderWidth: 1,
            borderRadius: 10,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              height: 40,
              borderColor: "orange",
              borderWidth: 1,
              borderRadius: 10,
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                justifyContent: "center",
                flex: 1,
              }}
            >
              {item.category.catName} budget: {item.amount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DialogInput
        isDialogVisible={visible}
        title={"budget for " + item.category.catName + ":"}
        cancelText="Clear"
        closeDialog={() => {
          editBudget(parseInt(0, 10), item.category, false);
          setVisible(false);
        }}
        submitInput={(inputText) => {
          inputText ? add(inputText) : alert("input a valid value");
        }}
        textInputProps={{ keyboardType: "numeric" }}
      />
    </View>
  );
};
