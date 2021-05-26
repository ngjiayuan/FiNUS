import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export function SmallIcons({ name, color = "black", onPress }) {
  return (
    <View style={styles.container}>
      <Icon
        name={name}
        type="material-community"
        size={40}
        color={color}
        onPress={() => onPress(name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
  },
});
