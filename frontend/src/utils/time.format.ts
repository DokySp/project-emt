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

const dueDateImplicit = (date: Date): string => dayjs(date).format("YY년 M월 D일 HH:mm:ss 까지")

const dueDateRelative = (props: {started: Date, due: Date}): string => {
  const period = new Date((props.started.getTime() + props.due.getTime()))
  return dayjs(period).format("YY년 M월 D일 HH:mm:ss 까지")
}

const startedDate = (date: Date): string => dayjs(date).format("YY년 M월 D일 H:mm:ss 부터 듣는 중")

const TimeFormat = {
  dueDateImplicit,
  dueDateRelative,
  getImplicitTimezoneDate,
  startedDate,
}

export default TimeFormat