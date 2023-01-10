import { Button, Col, FormControl, Row } from "react-bootstrap"
import { createSubject, deleteSubject, getSubject, updateSubject } from "../../../../services/subject.service"
import { useState } from "react"


const Subject = () => {

  const [subjectIdx, setSubjectIdx] = useState(-1)

  return (
    <>
      <h3 className="mb-3 mt-5">/api/subjects</h3>

      <Row className="mb-2">

        <Col sm={2}>
          <span>subjectIdx</span>
          <FormControl value={subjectIdx} onChange={(event) => {
            setSubjectIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Button className="me-1" onClick={async () => {
            const result = await getSubject({
              idx: subjectIdx,
            })
            console.log(result)
          }} >SUBJECT GET ({subjectIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await createSubject({
              name: "New Subject",
              course_idx: 1,
              section_idx: 2,
              order_idx: 10,
              due_date: new Date("2023-01-12 00:00:00")
            })
            console.log(result)
          }} >SUBJECT CREATE</Button>

          <Button className="me-1" onClick={async () => {
            const result = await updateSubject({
              idx: subjectIdx,
              due_date: new Date("2023-01-12 00:00:00")
            })
            console.log(result)
          }} >SUBJECT UPDATE ({subjectIdx})</Button>

          <Button className="me-1" onClick={async () => {
            const result = await deleteSubject({
              idx: subjectIdx,
            })
            console.log(result)
          }} >SUBJECT DELETE ({subjectIdx})</Button>
        </Col>

      </Row>
    </>
  )

}

export default Subject