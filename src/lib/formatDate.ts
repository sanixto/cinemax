import DateData from "@/interfaces/dateData.interface";

export function getNextFormattedDays(startDate: Date, amount: number): DateData[] {
  const datesData: DateData[] = [];

  for (let i = 0; i < amount; i++) {
    const curDate: Date = new Date(startDate);
    curDate.setDate(startDate.getDate() + i);

    const dateAndMonth: string = curDate.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
    let dayOfWeek: string = curDate.toLocaleDateString('uk', { weekday: 'long' });

    datesData.push({ date: curDate, dateAndMonth, dayOfWeek });
  }
  return datesData;
}