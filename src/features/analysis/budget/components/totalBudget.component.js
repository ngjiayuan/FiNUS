export const TotalBudget = (expense, budget) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var date = new Date().getDate();
  var month = new Date().getMonth();
  const daily = budget / days[month];
  const average = daily * date;
  const diff = expense - average;
  return diff === 0
    ? "you are spending perfectly in accordance to the budget! keep it up!"
    : diff > 0
    ? "you are spending " +
      Math.floor((diff / average) * 100) +
      "% above your average budget! please be more mindful with your spending!"
    : "you are spending " +
      Math.floor((-diff / average) * 100) +
      "% below your average budget! keep it up for more savings for this month!";
};
