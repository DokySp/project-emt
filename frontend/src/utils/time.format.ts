// import utc from "dayjs/plugin/utc"
// import timezone from "dayjs/plugin/timezone"
import dayjs from "dayjs"

const timezoneOffset = (target: Date) => (target).getTimezoneOffset() * 60 * 1000

const getImplicitTimezoneDate = (target: Date): Date => {
  return new Date(target.getTime() + timezoneOffset(target))
}

// const sendToServer = (target: Date): Date => {
//   return new Date(target.getTime() - timezoneOffset(target))
// }

const dueDateFormatted = (date: Date): string => dayjs(date).format("YY년 M월 D일 HH:mm:ss 까지")

const dueDateRelative = (props: {started: Date, due: Date}): Date => {
  return new Date((props.started.getTime() + props.due.getTime()))
}

const startedDate = (date: Date): string => dayjs(date).format("YY년 M월 D일 H:mm:ss 부터 듣는 중")

const periodDate = (date: Date): string => {
  const target: Date = TimeFormat.getImplicitTimezoneDate(date)
  return `${Math.floor((date.getTime()) / (1000 * 60 * 60 * 24)) + "일"} ${dayjs(target).format("H시간 m분")}`
}

const periodTime = (date: Date): string => {
  const times = Math.floor((date.getTime()) / (1000 * 60 * 60))
  const minutes = Math.floor((date.getTime()) / (1000 * 60) - (times * 60))
  return `${times + "시간"} ${minutes + "분"}`
}

const inputFormat = (date: Date): string => dayjs(date).format("YYYY-MM-DD HH:mm:ss")
const inputFormatRelative = (date: Date): string => dayjs(date).format("MM-DD HH:mm:ss")

const formatted = (date: Date): string => dayjs(date).format("YYYY년 M월 D일 H:mm:ss")

const TimeFormat = {
  dueDateFormatted,
  dueDateRelative,
  getImplicitTimezoneDate,
  startedDate,
  periodDate,
  periodTime,
  inputFormat,
  inputFormatRelative,
  formatted,
}

export default TimeFormat