function getFirstDayOfWeek(date) {
  const dayOfWeek = date.getDay(); // Lấy ngày trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Tính toán sự chênh lệch để lấy ngày đầu tiên của tuần
  return new Date(date.setDate(diff));
}

// Hàm để lấy danh sách các ngày trong tuần
export const getDaysOfWeek = (date) => {
  const firstDay = getFirstDayOfWeek(date);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(firstDay);
    nextDay.setDate(firstDay.getDate() + i);
    days.push(nextDay);
  }
  return days;
}

export const getMonthNameFromDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
  }

export const getDayNameFromDate = (date) => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    const dayIndex = date.getDay();
    const dayName = dayNames[dayIndex];
    return dayName.slice(0, 3).toUpperCase(); // chỉ lấy 3 chữ đầu và viết hoa
  }