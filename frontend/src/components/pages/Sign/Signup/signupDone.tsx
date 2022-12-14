


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

          <h1 className="mt-5" style={{ fontSize: "64px" }}>π</h1>
          <h1 className="mt-1 fw-bold">κ³μ  μ μ²­μ΄ μλ£λμμ΄μ!</h1>

          <div className="mt-2 fs-5 fw-semibold">κ΄μ§λΌκ° νμλμ κ³μ μ νμΈμ€μ΄μμ.</div>
          <div className="mt-0 fs-5 fw-semibold">νμΈμ΄ λλλλλ‘ λ°λ‘ μλΉμ€λ₯Ό μ¬μ©νμ€ μ μμ΄μ.</div>
          <div className="mt-0 fs-5 fw-semibold">κ·Έλ¬λ μ‘°κΈλ§ κΈ°λ€λ €μ£ΌμΈμ π</div>

          <Container>
            <Row>
              <Col>
                <button onClick={() => navigate(Routing.Root.path)} type="button" className="btn btn-primary mt-4" style={{ backgroundColor: "#5B40F2" }}>μ νΈ λλ¬λ³΄κΈ°</button>
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