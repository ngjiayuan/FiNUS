import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SmallIcons } from "./SmallIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DialogInput from "react-native-dialog-input";
import { RecordsContext } from "../service/data/records.context";
import { parse } from "react-native-svg";

export const BudgetSelect = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const [isChecked, setChecked] = useState(item.ifSelected);
  const { editBudget } = useContext(RecordsContext);

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
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            height: 40,
            width: 40,
            marginLeft: 20,
          }}
        >
          <BouncyCheckbox
            onPress={() => {
              if (isChecked) {
                setChecked(!isChecked);
                editBudget("0", item.category, false);
              } else {
                setVisible(!visible);
                setChecked(!isChecked);
              }
            }}
            isChecked={isChecked}
          />
        </View>
      </View>
      <DialogInput
        isDialogVisible={visible}
        title={"budget for " + item.category.catName + ":"}
        initValueTextInput={parseInt(item.amount, 10)}
        closeDialog={() => {
          setVisible(false);
        }}
        submitInput={(inputText) => {
          editBudget(
            parseInt(inputText, 10),
            item.category,
            parseInt(inputText, 10) !== 0
          );
          setVisible(false);
        }}
        textInputProps={{ keyboardType: "numeric" }}
      />
    </View>
  );
};
