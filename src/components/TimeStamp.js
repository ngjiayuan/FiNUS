export const TimeStamp = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();

  return String(year) + month + date + "." + hour + minute + second;
};
