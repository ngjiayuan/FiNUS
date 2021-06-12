import randomColor from "randomcolor";
import { ExpenseCat } from "../utils/ExpenseCat";
import { IncomeCat } from "../utils/IncomeCat";

export const monthlyData = (yearMonth, isExpense, records) => {
  //var randomColor = require("randomcolor");
  const res = records.filter(
    (object) => object.yearMonth === yearMonth && object.isExpense === isExpense
  );
  return res.map(function (item) {
    return {
      name: item.category,
      amount: parseInt(item.amount, 10),
      color: isExpense
        ? ExpenseCat.find((ele) => ele.catName === item.category).color
        : IncomeCat.find((ele) => ele.catName === item.category).color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    };
  });
};
