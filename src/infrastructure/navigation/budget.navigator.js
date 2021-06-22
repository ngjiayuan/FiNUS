import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Budget } from "../../features/analysis/budget/budget";
import { AddingBudget } from "../../features/analysis/budget/AddingBudget";

const BudgetStack = createStackNavigator();

export function BudgetNavigator() {
  return (
    <>
      <BudgetStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <BudgetStack.Screen name="Budget" component={Budget} />
        <BudgetStack.Screen name="AddingBudget" component={AddingBudget} />
      </BudgetStack.Navigator>
    </>
  );
}
