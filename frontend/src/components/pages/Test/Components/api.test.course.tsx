import { Button, Col, FormControl, Row } from "react-bootstrap"
import { useState } from "react"
import { createCourse, deleteCourse, getCourse, getCourseDetail, getCourseRecommend, getCourseUser, updateCourse } from "../../../../services/course.service"
import { dummyThumnail1 } from "../../../../constants/dummy/dummy"

const Course = () => {

  const [courseIdx, setCourseIdx] = useState(0)

  return (
    <>
      <h3 className="mb-3 mt-5">/api/course</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <span>courseIdx</span>
          <FormControl value={courseIdx} onChange={(event) => {
            setCourseIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>

      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getCourse()
            console.log(result)
          }} >COURSE GET (ALL)</Button>

          <Button className="me-1" onClick={async () => {
            const result = await getCourse({ idx: courseIdx })
            console.log(result)
          }} >COURSE GET ({courseIdx})</Button>

        </Col>
      </Row>



      <Row className="mb-1">
        <Col>
          <Button className="me-1" onClick={async () => {
            const result = await getCourseRecommend()
            console.log(result)
          }} >COURSE RECOMMEND GET</Button>

          <Button className="me-1" onClick={async () => {
            const result = await getCourseDetail({ idx: courseIdx })
            console.log(result)
          }} >COURSE DETAIL GET ({courseIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await getCourseUser({ idx: courseIdx })
            console.log(result)
          }} >COURSE USER GET ({courseIdx})</Button>
        </Col>
      </Row>



      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await createCourse({
              img: dummyThumnail1,
              name: "파이썬 강좌",
              sub_name: "Python",
              description: "파이썬 기본 문법과 활용방안을 알아봅니다",
              is_enroll_granted: true,
              is_due_date_implicit: true,
              created_by: 2,
            })
            console.log(result)
          }} >COURSE POST</Button>

          <Button className="me-1" onClick={async () => {
            const result = await updateCourse({
              idx: courseIdx,
              // name: "Test Course Modified",
              // img: "url modified",
              img: dummyThumnail1,
            })
            console.log(result)
          }} >COURSE PATCH</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteCourse({ idx: courseIdx })
            console.log(result)
          }} >COURSE DELETE ({courseIdx})</Button>

        </Col>
      </Row>

    </>
  )
}

export default Course