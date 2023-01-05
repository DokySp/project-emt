import { PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import { fakeMarkdownTextSmall } from "../../../../constants/dummy/dummy"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


interface SignupTermProps { }

const SignupTermPage = ({ children }: PropsWithChildren<SignupTermProps>) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <div className="row p-4">

          <div className="fs-1 fw-bold mt-5">회원가입</div>

          <div className="mt-4">
            <div className="fs-4 fw-bold mb-1">이용약관</div>
            <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "15px", overflow: "scroll", height: "300px" }}>
              <ReactMarkdown children={fakeMarkdownTextSmall}></ReactMarkdown>
            </div>
          </div>

          <div className="mt-4">
            <div className="fs-4 fw-bold mb-1">개인정보보호방침</div>
            <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "15px", overflow: "scroll", height: "300px" }}>
              <ReactMarkdown children={fakeMarkdownTextSmall}></ReactMarkdown>
            </div>
          </div>

          <Container className="mt-4" style={{ textAlign: "center" }}>
            <Row>
              <Col>
                <button onClick={() => navigate("/signup/form")} type="button" className="btn btn-primary mt-3" style={{ backgroundColor: "#5B40F2" }}>내용을 전부 읽었고, 위 사항에 전부 동의합니다</button>
              </Col>
            </Row>
          </Container>

        </div>
      </div>

    </>
  )
}

export default SignupTermPage