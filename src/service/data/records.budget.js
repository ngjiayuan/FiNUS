import { ExpenseCat } from "../../utils/ExpenseCat";

export const InitialBudgetList = ExpenseCat.map(function (item) {
  return {
    amount: 0,
    category: item,
    ifSelected: false,
  };
});
