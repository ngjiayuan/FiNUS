export const combineCatData = (data) => {
  var holder = data;
  const result = [];
  while (holder.length) {
    const pop = holder.shift();
    const newAmount =
      pop.amount +
      (holder.filter((ele) => ele.name === pop.name).map((item) => item.amount)
        .length
        ? holder
            .filter((ele) => ele.name === pop.name)
            .map((item) => item.amount)
            .reduce((sum, amt) => parseInt(sum, 10) + parseInt(amt, 10))
        : 0);
    holder = holder.filter((ele) => ele.name !== pop.name);
    const newItem = {
      amount: newAmount,
      color: pop.color,
      legendFontColor: pop.legendFontColor,
      lendFontSize: pop.lendFontSize,
      name: pop.name,
    };
    result.push(newItem);
  }
  return result;
};
