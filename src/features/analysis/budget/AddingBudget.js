import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { BudgetSelect } from "../../../components/BudgetSelect";
import { RecordsContext } from "../../../service/data/records.context";

export const AddingBudget = ({ navigation }) => {
  const { budget, clearBudget } = useContext(RecordsContext);

  const renderItem = ({ item }) => {
    return <BudgetSelect item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.93 }}>
        <FlatList
          data={budget}
          renderItem={renderItem}
          keyExtractor={(item) => item.category.catName}
        />
      </View>

      <View style={{ flex: 0.07, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
