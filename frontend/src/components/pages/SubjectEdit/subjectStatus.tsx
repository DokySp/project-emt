import { Link, NavigateFunction } from "react-router-dom"
import CircularProgress from "../../common/CircularProgress/circularProgress"
import { Col, Container, Row } from "react-bootstrap"


const enum SubmitStatus {
  NO_SUBMITTED,
  PENDING,
  SUBMITTED,
}

interface ListItemInterface {
  submitStatus: SubmitStatus,
  name: string,
  idx: number,
  lastMessage: string,
}

const ListItem = (props: ListItemInterface) => {

  return (
    <div className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-5 mt-2 mb-2">
        {props.submitStatus === SubmitStatus.NO_SUBMITTED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#ED5F14" }}>미제출</div>}
        {props.submitStatus === SubmitStatus.PENDING && <div className="fs-6 fw-normal fw-bold" style={{ color: "#5B40F2" }}>제출함</div>}
        {props.submitStatus === SubmitStatus.SUBMITTED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#AAA" }}>채점 완료</div>}
        <div className="fs-5 fw-bold">{props.name}</div>
      </div>

      <div className="me-auto mt-auto mb-auto">
        <div className="fs-6 fw-normal">{props.lastMessage}</div>
      </div>

      <div className="mt-auto mb-auto">
        <Link to={`/subject/eval/${props.idx}`}>
          {true && (
            <button type="button" className="btn btn-primary">
              과제보기
            </button>
          )}
        </Link>
      </div>

    </div>
  )
}





// TODO: react-query로 실시간 반영하도록 제작

interface SubjectStatusProps {
  navigate: NavigateFunction,
}


const SubjectStatus = (props: SubjectStatusProps) => {

  return (
    <>
      <h2 className="mt-5">과제제출 현황</h2>

      <div style={{ height: "50px" }} />

      <Container>
        <Row>
          <Col sm={8}>

            <Row>
              <Col sm>
                <h5>전체 수강생</h5>
                <h3>25명</h3>
              </Col>
              <Col sm></Col>
            </Row>

            <div style={{ height: "25px" }} />

            <Row>
              <Col sm>
                <h5>제출완료</h5>
                <h3>10명</h3>
              </Col>
              <Col sm>
                <h5>미완료</h5>
                <h3>15명</h3>
              </Col>
            </Row>

          </Col>
          <Col sm={4} style={{ textAlign: "right" }}>
            <CircularProgress size={175} strokeWidth={30} percentage={40} color={"#5B40F2"} />
          </Col>
        </Row>
      </Container>

      <div style={{ height: "50px" }} />

      <div className="row p-4">
        <ol className="list-group">
          <ListItem submitStatus={SubmitStatus.SUBMITTED} name={"홍길동"} idx={0} lastMessage={"잘했어요!!"} />
          <ListItem submitStatus={SubmitStatus.PENDING} name={"김길동"} idx={0} lastMessage={""} />
          <ListItem submitStatus={SubmitStatus.PENDING} name={"강철수"} idx={0} lastMessage={"과제 수정해서 다시 제출했습니다"} />
          <ListItem submitStatus={SubmitStatus.NO_SUBMITTED} name={"김선우"} idx={0} lastMessage={""} />
        </ol>
      </div>

      <button onClick={() => props.navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "50px 0 0" }}>
        뒤로가기
      </button>
    </>
  )
}

export default SubjectStatus