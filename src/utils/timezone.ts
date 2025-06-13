import moment from "moment-timezone";

export const isValidTimezone = (tz: string): boolean => {
  return moment.tz.zone(tz) !== null;
};

export const toUTC = (date: Date, timezone: string): string => {
  return moment.tz(date, timezone).utc().toISOString();
};

export const fromUTC = (date: Date, timezone: string): string => {
  return moment.utc(date).tz(timezone).toISOString();
};
