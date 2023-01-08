import { Button, Col, FormControl, Row } from "react-bootstrap"
import { useState } from "react"
import { updateClass } from "../../../../services/class.service"
import TimeFormat from "../../../../utils/time.format"


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
            const result = await updateClass({
              idx: classIdx,
              // due_date: TimeFormat.sendToServer(new Date("2023-01-10 00:00:00")),
              // due_date: (new Date(1000)),
              due_date: new Date(1000 * 60 * 60 * 24 * 20)
            })
            console.log(result)
          }} >CLASS PATCH ({classIdx})</Button>
        </Col>
      </Row>



    </>
  )
}

export default Class