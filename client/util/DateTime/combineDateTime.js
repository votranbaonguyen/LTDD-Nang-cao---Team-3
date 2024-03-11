export const combineDateTime = (date, dateTime) => {
  // Date 1: Ngày tháng năm đúng, thời gian không đúng
  const date1 = date;

  // Date 2: Ngày tháng năm không đúng, thời gian đúng
  const date2 = dateTime;
  // Lấy ngày, tháng, năm từ Date 1
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  // Lấy giờ, phút, giây từ Date 2
  const hours2 = date2.getHours();
  const minutes2 = date2.getMinutes();
  const seconds2 = date2.getSeconds();

  // Tạo Date mới bằng cách kết hợp ngày, tháng, năm từ Date 1 và giờ, phút, giây từ Date 2
  const combinedDate = new Date(
    year1,
    month1,
    day1,
    hours2,
    minutes2,
    seconds2
  );
  return combinedDate
};
