import { CSSProperties, PropsWithChildren } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface ErrorProps { }

const ErrorPage = ({ children }: PropsWithChildren<ErrorProps>) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <div className="row p-5">

          <div style={{ height: "50px" }}></div>

          <h1 className="mt-5" style={{ fontSize: "64px" }}>☠️</h1>
          <h1 className="mt-1 fw-bold">이런... 길을 잃으셨군요</h1>

          <div className="mt-2 fs-5 fw-semibold">가끔씩 잘못된 길에 다다를때가 있죠</div>
          <div className="mt-0 fs-5 fw-semibold">괜찮아요! 다시 시작하면 그만이니까요 🙌</div>

          <Container>
            <Row>
              <Col>
                <button onClick={() => navigate("/")} type="button" className="btn btn-primary mt-3" style={{ backgroundColor: "#5B40F2" }}>되돌아가기</button>
              </Col>
            </Row>
          </Container>


          <div style={{ height: "125px" }}></div>

        </div>
      </div>
    </>
  )
}

export default ErrorPage