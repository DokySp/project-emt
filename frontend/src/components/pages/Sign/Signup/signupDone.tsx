


import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Routing from "../../../routing.path"

const SignupDone = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <div className="row p-4">

          <div style={{ height: "50px" }}></div>

          <h1 className="mt-5" style={{ fontSize: "64px" }}>🎉</h1>
          <h1 className="mt-1 fw-bold">계정 신청이 완료되었어요!</h1>

          <div className="mt-2 fs-5 fw-semibold">관지라가 회원님의 계정을 확인중이에요.</div>
          <div className="mt-0 fs-5 fw-semibold">확인이 끝나는대로 바로 서비스를 사용하실 수 있어요.</div>
          <div className="mt-0 fs-5 fw-semibold">그러니 조금만 기다려주세요 😃</div>

          <Container>
            <Row>
              <Col>
                <button onClick={() => navigate(Routing.Root.path)} type="button" className="btn btn-primary mt-4" style={{ backgroundColor: "#5B40F2" }}>엠트 둘러보기</button>
              </Col>
            </Row>
          </Container>


          <div style={{ height: "125px" }}></div>

        </div>
      </div>
    </>
  )
}

export default SignupDone