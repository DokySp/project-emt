import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Routing from "../../routing.path"


const ErrorRoutingPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <div className="row p-5">

          <div style={{ height: "50px" }}></div>

          <h1 className="mt-5" style={{ fontSize: "64px" }}>☠️</h1>
          <h1 className="mt-1 fw-bold">Unknown Route</h1>

          <div className="mt-2 fs-5 fw-semibold">This is the error message for developers</div>
          <div className="mt-0 fs-5 fw-semibold">Please check routing path in the <b>App.tsx</b> file.</div>

          <Container>
            <Row>
              <Col>
                <button onClick={() => navigate(Routing.Root.path)} type="button" className="btn btn-primary mt-3" style={{ backgroundColor: "#5B40F2" }}>되돌아가기</button>
              </Col>
            </Row>
          </Container>


          <div style={{ height: "125px" }}></div>

        </div>
      </div>
    </>
  )
}

export default ErrorRoutingPage