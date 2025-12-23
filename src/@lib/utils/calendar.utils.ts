import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface DayData {
  day: number;
  weekDay: string;
}

export interface ISelectedDate {
  startDate: string;
  endDate: string;
}

export const generateCalendar = (
  year: number,
): { year: number; months: { month: number; title: string; days: DayData[] }[] } => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthsData: { month: number; title: string; days: DayData[] }[] = [];

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).date(1);
    const lastDayOfMonth = firstDayOfMonth.endOf('month');
    const daysInMonth: DayData[] = [];

    let currentDay = firstDayOfMonth;
    while (currentDay.isSame(lastDayOfMonth, 'day') || currentDay.isBefore(lastDayOfMonth, 'day')) {
      daysInMonth.push({
        day: Number(currentDay.format('D')),
        weekDay: currentDay.format('dddd'),
      });
      currentDay = currentDay.add(1, 'day');
    }

    const monthData = {
      month: month + 1,
      title: monthNames[month],
      days: daysInMonth,
    };

    monthsData.push(monthData);
  }

  return {
    year: year,
    months: monthsData,
  };
};

export function generateTimeSlotsWithMinute(
  slotStartHour: number,
  slotEndHour: number,
  slotDifference: number,
): { timeSlots: string[]; timeWithMinuteSlots: string[] } {
  const timeSlots = [];
  const timeWithMinuteSlots = [];

  for (let hour = slotStartHour; hour <= slotEndHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDifference) {
      // const ampm = hour < 12 ? 'AM' : 'PM';
      // const formattedHour = hour <= 12 ? hour : hour - 12;
      const formattedMinute = minute === 0 ? '00' : minute;
      const timeWithMinuteSlot = `${hour < 10 ? `0${hour}` : hour}:${formattedMinute}`;
      timeWithMinuteSlots.push(timeWithMinuteSlot);

      if (minute === 0) {
        const timeSlot = `${hour < 10 ? `0${hour}` : hour}:00`;
        timeSlots.push(timeSlot);
      }
    }
  }

  return { timeSlots, timeWithMinuteSlots };
}

export const getStartAndEndDate = (datesArray: ISelectedDate[]): ISelectedDate => {
  if (!datesArray || datesArray.length === 0) {
    return {
      startDate: null,
      endDate: null,
    };
  }

  // Convert date strings to Date objects
  const dateObjects = datesArray.map((time) => ({
    startDate: new Date(time.startDate),
    endDate: new Date(time.endDate),
  }));

  // Find the first start date and last end date
  const firstStartDate = new Date(Math.min(...dateObjects.map((time) => time.startDate.getTime())));
  const lastEndDate = new Date(Math.max(...dateObjects.map((time) => time.endDate.getTime())));

  // Format the results as needed
  const result = {
    startDate: firstStartDate.toISOString(),
    endDate: lastEndDate.toISOString(),
  };

  return result;
};

export function convertTimeFormat(time: string, hoursFormat: 12 | 24): string {
  if (hoursFormat === 12) {
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }

    const [hour, minute] = time.split(':');
    const parsedHour = parseInt(hour, 10);
    const ampm = parsedHour >= 12 ? 'PM' : 'AM';
    const formattedHour = parsedHour > 12 ? parsedHour - 12 : parsedHour;
    return `${formattedHour}:${minute} ${ampm}`;
  } else if (hoursFormat === 24) {
    // If the input time is in 12-hour format, convert it to 24-hour format
    const timeComponents = time.split(':');
    const hour = parseInt(timeComponents[0], 10);
    const minute = timeComponents[1];

    if (time.includes('PM') && hour !== 12) {
      // Convert PM time to 24-hour format (e.g., '3:30 PM' becomes '15:30')
      return `${hour + 12}:${minute}`;
    } else if (time.includes('AM') && hour === 12) {
      // Convert 12:xx AM to 24-hour format (e.g., '12:30 AM' becomes '00:30')
      return `00:${minute}`;
    } else {
      // Other AM times are already in 24-hour format, so return as is
      return `${hour}:${minute}`;
    }
  } else {
    throw new Error('Invalid hoursFormat. Use 12 or 24.');
  }
}

export function isDatesMinutesDifferentSame(
  difference = 30,
  selectedDate: ISelectedDate,
  startDate: string,
  endDate: string,
): boolean {
  if (!selectedDate?.startDate && !selectedDate?.endDate) return true;
  const selectedStartDate = new Date(selectedDate.startDate);
  const selectedEndDate = new Date(selectedDate.endDate);
  const inputStartDate = new Date(startDate);
  const inputEndDate = new Date(endDate);

  // Calculate the time difference in minutes
  const timeStartDifference = (selectedStartDate.getTime() - inputStartDate.getTime()) / (1000 * 60);
  const timeEndDifference = (inputEndDate.getTime() - selectedEndDate.getTime()) / (1000 * 60);

  // Check if startDate is 30 minutes before selectedDate.startDate
  // and endDate is 30 minutes after selectedDate.endDate
  return timeStartDifference === difference || timeEndDifference === difference;
}

export function areDatesSameAsSelected(selectedDate: ISelectedDate, startDate: string, endDate: string): boolean {
  return selectedDate.startDate === startDate || selectedDate.endDate === endDate;
}

export function getPreviousAndNextYears(prev = 5, next = 10) {
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from({ length: prev }, (_, index) => currentYear - prev + index);
  const nextYears = Array.from({ length: next }, (_, index) => currentYear + index + 1);

  return [...previousYears, currentYear, ...nextYears];
}

export function generateMonthArray() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthObjects = months.map((month, index) => ({
    title: month,
    serial: index + 1,
  }));

  return monthObjects;
}
