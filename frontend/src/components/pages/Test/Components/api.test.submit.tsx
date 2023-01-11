import { useState } from "react"
import { Button, Col, FormControl, Row } from "react-bootstrap"
import { createSubmit, deleteSubmit, getSubmit, getSubmitBySubject, getSubmitBySubjectAll, updateSubmit } from "../../../../services/submit.service"
import { ChatDataInterface, SendFrom, SubmitStatus } from "../../../../schemas/interfaces"


const Submit = () => {

  const [submitIdx, setSubmitIdx] = useState(0)
  const [userIdx, setUserIdx] = useState(0)
  const [subjectIdx, setSubjectIdx] = useState(0)

  return (
    <>
      <h3 className="mb-3 mt-5">/api/submit</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <span>submitIdx</span>
          <FormControl value={submitIdx} onChange={(event) => {
            setSubmitIdx(Number(event.target.value))
          }} />
        </Col>
        <Col sm={2}>
          <span>userIdx</span>
          <FormControl value={userIdx} onChange={(event) => {
            setUserIdx(Number(event.target.value))
          }} />
        </Col>
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
            const result = await getSubmit({ idx: submitIdx })
            console.log(result)
          }} >SUBMIT GET ({submitIdx})</Button>
          <Button className="me-1" onClick={async () => {
            const result = await createSubmit({
              subjects_idx: subjectIdx,
              user_idx: userIdx,
              status: SubmitStatus.RETURNED,
              score: 10,
              report: "asdf",
              comments: [] as Array<ChatDataInterface>,
            })
            console.log(result)
          }} >SUBMIT POST (subject: {subjectIdx} / user: {userIdx})</Button>
          <Button className="me-1" onClick={async () => {
            const result = await updateSubmit({
              idx: submitIdx,
              status: SubmitStatus.GRANTED,
              score: 50,
              comments: [
                {
                  sendFrom: SendFrom.TRAINEE,
                  time: new Date(Date.now()),
                  message: "test",
                },
                {
                  sendFrom: SendFrom.TRAINER,
                  time: new Date(Date.now()),
                  message: "test 222",
                },
              ]
            })
            console.log(result)
          }} >SUBMIT PATCH ({submitIdx})</Button>
          <Button className="me-1" onClick={async () => {
            const result = await deleteSubmit({ idx: submitIdx })
            console.log(result)
          }} >SUBMIT DELETE ({submitIdx})</Button>

        </Col>
      </Row>
      <Row className="mb-2">
        <Col>

          <Button className="me-1" onClick={async () => {
            const result = await getSubmitBySubject({ idx: subjectIdx })
            console.log(result)
          }} >SUBMIT BY SUBJECT GET ({subjectIdx})</Button>
          <Button className="me-1" onClick={async () => {
            const result = await getSubmitBySubjectAll({ idx: subjectIdx })
            console.log(result)
          }} >SUBMIT BY SUBJECT GET ALL ({subjectIdx})</Button>

        </Col>
      </Row>

    </>
  )

}

export default Submit