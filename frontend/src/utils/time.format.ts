// import utc from "dayjs/plugin/utc"
// import timezone from "dayjs/plugin/timezone"
import dayjs from "dayjs"

// const timezoneOffset = (target: Date) => (target).getTimezoneOffset() * 60 * 1000

// const getUTCTime = (target: Date) => {
//   return new Date(target.getTime() + timezoneOffset(target))
// }

const dueDateImplicit = (date: Date): string => dayjs(date).format("YY년 M월 D일 HH:mm:ss 까지")

const dueDateRelative = (props: {started: Date, due: Date}): string => {
  const period = new Date(dayjs(props.due).diff(props.started))
  console.log(props.due)
  return dayjs(period).format("YY년 M월 D일 HH:mm:ss 까지")
}

const TimeFormat = {
  dueDateImplicit,
  dueDateRelative,
}

export default TimeFormat