export const FormattedDate = () => {
  var date = new Date().getDate();
  const formattedDate = date < 10 ? "0" + date : date;
  var month = new Date().getMonth() + 1;
  const formattedMonth = month < 10 ? "0" + month : month;
  var year = new Date().getFullYear();

  return formattedDate + "-" + formattedMonth + "-" + year;
};
