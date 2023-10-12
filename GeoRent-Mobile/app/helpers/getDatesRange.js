export function getDatesRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const range = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    range.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return range;
}
