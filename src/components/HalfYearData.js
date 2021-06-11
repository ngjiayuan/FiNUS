import { YearMonth } from "./YearMonth";
export const HalfYearData = (records, isExpense) => {
  const result = [];
  var year = new Date().getFullYear();
  const yearMonthDecrement = (yearMonth, num) => {
    return parseInt(yearMonth.toString().slice(4)) > num
      ? yearMonth - num
      : (year - 1) * 100 + 12 + (yearMonth - year * 100 - num);
  };
  const currentSum = (yearMonth) => {
    const res = records.filter(
      (object) =>
        object.yearMonth === yearMonth && object.isExpense === isExpense
    );
    return res.length === 0
      ? 0
      : res
          .map((object) => object.amount)
          .reduce((sum, object) => parseInt(sum) + parseInt(object));
  };
  var i;
  for (i = 0; i < 6; i++) {
    result.unshift(currentSum(yearMonthDecrement(YearMonth(), i)));
  }
  return result;
};
