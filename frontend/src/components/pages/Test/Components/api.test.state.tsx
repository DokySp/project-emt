import { useState } from "react"
import { Button, Col, FormControl, Row } from "react-bootstrap"
import { CourseDetailInterface, CourseInterface } from "../../../../schemas/interfaces"


const ObjectState = () => {

  const [test, setTest] = useState({ age: 12, name: "kim" })
  const [test2, setTest2] = useState(12)

  return (
    <>
      <h3 className="mb-3 mt-5">Object State Change Test</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <Button className="me-1" onClick={async () => {
            // setTest2(test2 + 10)
            // console.log(test2)

            const tmp = { ...test }
            tmp.age += 10
            setTest(tmp)
            console.log(tmp)

          }} >ADD NEW K-V</Button>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col sm={2}>
          <div>{test.age}</div>
          <div>{test.name}</div>
          <div>{test2}</div>
        </Col>
      </Row>
    </>
  )
}

export default ObjectState