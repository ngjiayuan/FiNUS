import { monthlyData } from "../../../../components/MonthlyData";
import { combineCatData } from "../../../../components/CombineCatData";
import { yearMonthDecrement } from "../../../../components/HalfYearData";

export const ExpenseHelper = (records, endingMonth) => {
  const result = [];

  function compare(a, b) {
    return b.amount - a.amount;
  }

  const temp = combineCatData(monthlyData(endingMonth, true, records)).sort(
    compare
  );
  const holder = temp.length <= 2 ? temp : temp.slice(0, 3);

  const label = holder.map((ele) => ele.name);

  result.push(label.length);
  result.push(label);

  var data = [];

  for (var j = 0; j < label.length; j++) {
    const dataHolder = [];
    for (var i = 0; i < 3; i++) {
      const tempHolder = combineCatData(
        monthlyData(yearMonthDecrement(endingMonth, i), true, records)
      );
      const amt =
        tempHolder.filter((ele) => ele.name === label[j]).length === 0
          ? 0
          : tempHolder.filter((ele) => ele.name === label[j])[0].amount;
      dataHolder.unshift(amt);
    }
    data.push(dataHolder);
  }

  result.push(data);

  return result;
};
