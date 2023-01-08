import { Button, Col, FormControl, Row } from "react-bootstrap"


const Subject = () => {

  return (
    <>
      <h3 className="mb-3 mt-5">/api/subjects</h3>

      <Row className="mb-2">

        <Col sm={2}>
          <span>classIdx</span>
          <FormControl value={""} onChange={(event) => {
            // setClassIdx(Number(event.target.value))
          }} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Button className="me-1" onClick={async () => {
            // const result = await updateClass({
            //   idx: classIdx,
            //   due_date: new Date(1000 * 60 * 60 * 24 * 5)
            // })
            // console.log(result)
          }} >CLASS PATCH ({""})</Button>
        </Col>
      </Row>
    </>
  )

}

export default Subject