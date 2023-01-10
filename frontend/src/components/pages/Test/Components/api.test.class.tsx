import { Button, Col, FormControl, Row } from "react-bootstrap"
import { useState } from "react"
import { createClass, deleteClass, getClass, updateClass } from "../../../../services/class.service"


const Class = () => {

  const [classIdx, setClassIdx] = useState<number>(0)

  return (
    <>
      <h3 className="mb-3 mt-5">/api/classes</h3>


      <Row className="mb-2">

        <Col sm={2}>
          <span>classIdx</span>
          <FormControl value={classIdx} onChange={(event) => {
            setClassIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getClass({ idx: classIdx })
            console.log(result)
          }} >CLASS GET ({classIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await createClass({
              name: "Test",
              course_idx: 1,
              section_idx: 1,
              order_idx: 5,
              due_date: new Date("2023-01-15 10:00:00"),
            })
            console.log(result)
          }} >CLASS POST</Button>

          <Button className="me-1" onClick={async () => {
            const result = await updateClass({
              idx: classIdx,
              name: "Test Modified",
              course_idx: 1,
              section_idx: 1,
              order_idx: 7,
              due_date: new Date("2023-01-30 10:00:00")
            })
            console.log(result)
          }} >CLASS UPDATE ({classIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteClass({ idx: classIdx })
            console.log(result)
          }} >CLASS DELETE ({classIdx})</Button>

        </Col>
      </Row>

    </>
  )
}

export default Class