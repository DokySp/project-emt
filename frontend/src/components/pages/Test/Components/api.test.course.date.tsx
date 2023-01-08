import { Button, Col, FormControl, Row } from "react-bootstrap"
import { getUserCourse } from "../../../../services/user.service"
import { useState } from "react"
import dayjs from "dayjs"
import TimeFormat from "../../../../utils/time.format"
import { getCourseDetail } from "../../../../services/course.service"


const CourseDate = () => {

  const [targetCourseIdx, setTargetCourseIdx] = useState(0)
  const [courseStartedDate, setCourseStartedDate] = useState<Date | undefined>(undefined)
  const [targetClassIdx, setTargetClassIdx] = useState(0)
  const [targetClassDueDate, setTargetClassDueDate] = useState<Date | undefined>(undefined)

  //

  const [className, setClassName] = useState("none")

  const [isTargetImplicit, setIsTargetImplicit] = useState<boolean | undefined>(false)
  const [targetRemain, setTargetRemain] = useState<Date>(new Date())
  const [compareDate, setCompareDate] = useState<Date>(new Date())
  const [relDueDate, setRelDueDate] = useState<Date>(new Date())

  const [dateValue, setDateValue] = useState<string>("")
  const [dateValueN, setDateValueN] = useState<number>(0)

  return (
    <>

      <h3 className="mb-3 mt-5">/api/course Date Test</h3>

      <Row className="mb-2">
        <Col sm={3}>
          <span>dateValue</span>
          <FormControl value={dateValue} onChange={(event) => {
            setDateValue(event.target.value)
          }} />
          <div className="fw-bold">
            {dayjs(new Date(dateValue)).format("YYYY-MM-DD HH:mm:ss Z") + ""}
          </div>
        </Col>
        <Col sm={3}>
          <span>dateValueNumber</span>
          <FormControl value={dateValueN} onChange={(event) => {
            setDateValueN(Number(event.target.value))
          }} />
          <div className="fw-bold">
            {dayjs(new Date(dateValueN)).format("YYYY-MM-DD HH:mm:ss Z") + ""}
          </div>
        </Col>
        <Col sm={2}>
          <span>targetUserCourseIdx</span>
          <FormControl value={targetCourseIdx} onChange={(event) => {
            setTargetCourseIdx(Number(event.target.value))
          }} />
        </Col>
        <Col sm={2}>
          <span>targetClassIdx</span>
          <FormControl value={targetClassIdx} onChange={(event) => {
            setTargetClassIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>

      <Row className="mb-1">
        <Col>
          <Button className="me-1" onClick={async () => {

            const result = await getUserCourse()
            setCourseStartedDate(result[targetCourseIdx].started_date)
            setIsTargetImplicit(result[targetCourseIdx].is_due_date_implicit)

            let tcIdx = result[targetCourseIdx].idx!
            const resultDetail = await getCourseDetail({ idx: tcIdx })

            setTargetClassDueDate(resultDetail.classes[targetClassIdx].due_date)
            setClassName(`[${result[targetCourseIdx].name}] ${resultDetail.classes[targetClassIdx].name}`)

            // 비교할 시간
            setCompareDate(new Date(Date.now()))
            // setCompareDate(new Date("2023-01-31 00:00:00"))
            // setCompareDate(new Date("2021-01-18 19:00:00"))

            // 남은 시간 계산
            if (isTargetImplicit) {
              // 절대 시간
              setTargetRemain(new Date(targetClassDueDate!.getTime() - compareDate.getTime()))
            } else {
              // 상대 시간 (수강일로부터) < (시작일+기한) - 현재시간 > (+9 된 시간 -> 빼주기)
              // 남은 일수 구할 때에는 반대로 9시간 다시 더해서 계산해야 함
              setTargetRemain(
                TimeFormat.getImplicitTimezoneDate(
                  new Date((courseStartedDate!.getTime() + targetClassDueDate!.getTime()) - compareDate.getTime())
                )
              )
              // 기한일
              setRelDueDate(new Date((courseStartedDate!.getTime() + targetClassDueDate!.getTime())))
              // setTargetRemain(targetClassDueDate!)
              // console.log(targetClassDueDate!.getTime())
            }

          }} >USER COURSE GET ({targetCourseIdx}/{targetClassIdx})</Button>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col sm={8}>
          <div><span className="fw-bold">compare date:</span> {dayjs(compareDate).format("YYYY-MM-DD HH:mm:ss (Z)")}</div>
          <div><span className="fw-bold">course Started Date:</span> {dayjs(courseStartedDate).format("YYYY-MM-DD HH:mm:ss (Z)")}</div>
          <div><span className="fw-bold">target Class Due Date:</span> {dayjs(targetClassDueDate).format("YYYY-MM-DD HH:mm:ss (Z)")}</div>
          ⎯⎯⎯
          <div><span className="fw-bold">class name:</span> {className}</div>
          <div><span className="fw-bold">is implicit:</span> {isTargetImplicit + ""}</div>
          <div><span className="fw-bold">relative due date:</span> {dayjs(relDueDate).format("YYYY-MM-DD HH:mm:ss (Z)")}</div>
          <div><span className="fw-bold">remain due date:</span> {dayjs(targetRemain).format("YYYY-MM-DD HH:mm:ss (Z)")}</div>
          <div><span className="fw-bold">remain due date:</span> {Math.floor((targetRemain.getTime() + (1000 * 60 * 60 * 9)) / (1000 * 60 * 60 * 24)) + "일"} {dayjs(targetRemain).format("H시간 m분 남음")}</div>
        </Col>
      </Row>
    </>
  )
}

export default CourseDate