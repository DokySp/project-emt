import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap"
import { addUserCourse, addUserDivision, createUser, deleteUser, deleteUserCourse, deleteUserDivision, getUser, getUserCourse, getUserDivision, updateUser } from "../../../services/user.service"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ApiTestPage = () => {

  const navigate = useNavigate()

  const [userIdx, setUserIdx] = useState(0)
  const [userDivisionIdx, setUserDivisionIdx] = useState(0)
  const [userCourseIdx, setUserCourseIdx] = useState(0)


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
          }} >DELETE PATCH ({userIdx})</Button>

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
      </Row>

      <Row className="mb-1">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getUser({ idx: userIdx })
            console.log(result)
          }} >USER GET ({userIdx})</Button>

        </Col>
      </Row>

    </Container>
  )
}


export default ApiTestPage