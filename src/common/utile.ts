import dayjs from "dayjs";

export function get_time(): Date {
  return dayjs().toDate()
}