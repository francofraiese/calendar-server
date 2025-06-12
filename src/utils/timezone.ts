import moment from "moment-timezone";

export const isValidTimezone = (tz: string): boolean => {
  return moment.tz.zone(tz) !== null;
};
