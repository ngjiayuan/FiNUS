export const YearMonth = () => {
  var month = new Date().getMonth() + 1;
  const formattedMonth = parseInt(month < 10 ? "0" + month : month, 10);
  var year = new Date().getFullYear();

  return formattedMonth + 100 * year;
};
