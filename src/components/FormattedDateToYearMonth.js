export const FormattedDateToYearMonth = (formattedDate) => {
  const dateArr = formattedDate.split("-");
  return parseInt(dateArr[1], 10) + 100 * parseInt(dateArr[2], 10);
};
