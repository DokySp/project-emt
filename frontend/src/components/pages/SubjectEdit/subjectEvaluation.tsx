import ReactMarkdown from "react-markdown"
import { fakeChatData, fakeMarkdownTextSmall } from "../../../constants/dummy/dummy"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import Chat from "./Chat/chat"





interface ListItemInterface {
  filename: string,
  mimetype: string,
  size: number,
  uuid: string,
}

const ListItem = (props: ListItemInterface) => {

  return (
    <div className="list-group-item d-flex justify-content-between align-items-start">

      <Container>
        <Row>
          <Col sm>
            <span className="fs-6 fw-bold">📁 </span>
            <span className="fs-6 fw-bold">{props.filename}</span>
          </Col>
          <Col sm={2}>
            <div className="fs-6 fw-normal">{props.mimetype}</div>
          </Col>
          <Col sm={1} >
            <div className="fs-6 fw-normal">{`${props.size}KB`}</div>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <Link to={`/api/file/${props.uuid}`}>
              {true && (
                <button type="button" className="btn btn-primary">
                  다운로드
                </button>
              )}
            </Link>
          </Col>
        </Row>
      </Container>

    </div>
  )
}








interface SubjectEvaluationProps {
  // navigate: NavigateFunction,
}


const SubjectEvaluationPage = (props: SubjectEvaluationProps) => {

  return (
    <>

      <div className="container">
        <div className="row p-4">

          <h2 className="mt-5">과제이름 - 홍길동</h2>

          <div style={{ height: "50px" }} />

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">학생이 제출한 과제</label>
            <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "15px" }}>
              <ReactMarkdown children={fakeMarkdownTextSmall}></ReactMarkdown>
            </div>
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">첨부파일</label>

            <div className="row ms-0">
              <ol className="list-group">
                <ListItem filename={"스크린샷 2022-09-14 오후 1.28.21"} uuid={""} mimetype={"image/jpeg"} size={124} />
                <ListItem filename={"스크린샷 2022-12-16 오후 12.03.12"} uuid={""} mimetype={"image/png"} size={468} />
                <ListItem filename={"Soul Searching - Causmic"} uuid={""} mimetype={"audio/mpeg"} size={3582} />
              </ol>
            </div>

          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">평가 점수 (100점 만점 기준 입력)</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">의견 달기</label>
            <Chat chatData={fakeChatData} />
          </div>

          <Container>
            <Row>
              <Col sm>
                <div className="mb-3">
                  <input className="form-control" id="exampleFormControlTextarea1" />
                </div>
              </Col>
              <Col sm="auto">
                <button type="button" className="btn btn-primary" style={{ width: "100%" }}>
                  의견 달기
                </button>
              </Col>
            </Row>
          </Container>


          <div style={{ height: "50px" }} />


          <Container>
            <Row>
              <Col sm>
                <button type="button" className="btn btn-danger ms-auto me-auto" style={{ width: "100%", marginTop: "10px", backgroundColor: "#ED5F14" }}>
                  돌려주기
                </button>
              </Col>
              <Col sm>
                <button type="button" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                  채점완료
                </button>
              </Col>
            </Row>
          </Container>

          <Col sm>
            <button type="button" className="btn btn-secondary" style={{ width: "100%", marginTop: "20px" }}>
              뒤로가기
            </button>
          </Col>




        </div>
      </div>
    </>
  )
}



export default SubjectEvaluationPage