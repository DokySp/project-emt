import { Button, Col, Container, FormControl, Row } from "react-bootstrap"
import { addUserCourse, addUserDivision, createUser, deleteUser, deleteUserCourse, deleteUserDivision, getUser, getUserCourse, getUserDivision, updateUser } from "../../../services/user.service"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCourse, deleteCourse, getCourse, getCourseDetail, getCourseRecommend, getCourseUser, updateCourse } from "../../../services/course.service"
import { dummyThumnail1 } from "../../../constants/dummy/dummy"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import TokenManager from "../../../utils/token.manager"

const ApiTestPage = () => {

  const navigate = useNavigate()

  const [userIdx, setUserIdx] = useState(0)
  const [userDivisionIdx, setUserDivisionIdx] = useState(0)
  const [userCourseIdx, setUserCourseIdx] = useState(0)

  const [courseIdx, setCourseIdx] = useState(0)

  const [dateValue, setDateValue] = useState<string>("")
  const [dateValueN, setDateValueN] = useState<number>(0)

  const session = useSelector((state: RootState) => state.session)


  return (
    <Container>

      <h3 className="mb-3 mt-5">API TEST</h3>
      <Button variant="secondary" onClick={() => navigate(-1)}>BACK</Button>

      <h3 className="mb-3 mt-5">/api/user</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <span>userIdx</span>
          <FormControl value={userIdx} onChange={(event) => {
            setUserIdx(Number(event.target.value))
          }} />
        </Col>
        <Col sm={2}>
          <span>userDivisionIdx</span>
          <FormControl value={userDivisionIdx} onChange={(event) => {
            setUserDivisionIdx(Number(event.target.value))
          }} />
        </Col>
        <Col sm={2}>
          <span>userCourseIdx</span>
          <FormControl value={userCourseIdx} onChange={(event) => {
            setUserCourseIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>

      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getUser({ idx: userIdx })
            console.log(result)
          }} >USER GET ({userIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await createUser({
              email: "asdf4",
              last_name: "asdf",
              first_name: "asdf",
              nickname: "asdf",
              img: "asdf",
              pw: "asdf",
              level: 0,
            })
            console.log(result)
          }} >USER POST</Button>

          <Button className="me-1" onClick={async () => {
            const result = await updateUser({
              img: "444",
            })
            console.log(result)
          }} >USER PATCH</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteUser({ idx: userIdx })
            console.log(result)
          }} >USER DELETE ({userIdx})</Button>

        </Col>
      </Row>
      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getUserDivision()
            console.log(result)
          }} >USER DIVISION GET</Button>

          <Button className="me-1" onClick={async () => {
            const result = await addUserDivision({ idx: userDivisionIdx })
            console.log(result)
          }} >USER DIVISION ADD ({userDivisionIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteUserDivision({ idx: userDivisionIdx })
            console.log(result)
          }} >USER DIVISION DELETE ({userDivisionIdx})</Button>

        </Col>
      </Row>
      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getUserCourse()
            console.log(result)
          }} >USER COURSE GET</Button>

          <Button className="me-1" onClick={async () => {
            const result = await addUserCourse({ idx: userCourseIdx })
            console.log(result)
          }} >USER COURSE ADD ({userCourseIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteUserCourse({ idx: userCourseIdx })
            console.log(result)
          }} >USER COURSE DELETE ({userCourseIdx})</Button>

        </Col>
      </Row>


      {/* // */}



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
              name: "Test Course",
              is_enroll_granted: true,
              is_due_date_implicit: true
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



      {/* // */}



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
      </Row>

      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getCourseDetail({ idx: 0 })
            console.log(result)
          }} >COURSE GET (ALL)</Button>

        </Col>
      </Row>



      {/* // */}



      <h3 className="mb-3 mt-5">Token Data</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <span>token.isSignin</span>
          <div>{session.isSignin + ""}</div>
        </Col>
        <Col sm={2}>
          <span>token iat</span>
          {session.token && <div>{dayjs(TokenManager.getPayload(session.token).iat).format("YYYY-MM-DD HH:mm:ss") + ""}</div>}
        </Col>
        <Col sm={2}>
          <span>token exp</span>
          {session.token && <div>{dayjs(TokenManager.getPayload(session.token).exp).format("YYYY-MM-DD HH:mm:ss") + ""}</div>}
        </Col>
      </Row>

      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getCourseDetail({ idx: 0 })
            console.log(result)
          }} >COURSE GET (ALL)</Button>

        </Col>
      </Row>

    </Container>
  )
}


export default ApiTestPage