import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const JAPAN_TIMEZONE = "Asia/Tokyo";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault(JAPAN_TIMEZONE);

export interface JstYearMonth {
  date: Date;
  year: string;
  month: string;
}

export const getCurrentDayjs = (CURRENT_DATE: string): dayjs.Dayjs => {
  if (!CURRENT_DATE) {
    return dayjs();
  }
  const currentDate = dayjs(CURRENT_DATE, "YYYY-MM-DD");
  if (!currentDate.isValid()) {
    const inputErrorMsg = `error`;
    throw new Error(inputErrorMsg);
  }
  // Return converted date object: https://day.js.org/docs/en/timezone/converting-to-zone
  return currentDate.tz(JAPAN_TIMEZONE, true);
};

const createMonthInJst = (date: Date, offset: number): JstYearMonth => {
  const dayjsWithJstDate = dayjs(date).tz(JAPAN_TIMEZONE).startOf("month");
  const dayjsWithJstDateAndOffset = dayjsWithJstDate.month(
    dayjsWithJstDate.month() + offset
  );
  return {
    date: dayjsWithJstDateAndOffset.toDate(),
    year: dayjsWithJstDate.tz(JAPAN_TIMEZONE, true).format("YYYY"),
    month: dayjsWithJstDate.tz(JAPAN_TIMEZONE, true).format("MM"),
  };
};

export const getThreeMonthsAgoInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, -3);
};

export const getTwoMonthsAgoInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, -2);
};

export const getPreviousMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, -1);
};

export const getMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, 0);
};

export const getNextMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, 1);
};
