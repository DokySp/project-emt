import { Button, Col, Container, FormControl, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import TokenManager from "../../../../utils/token.manager"
import dayjs from "dayjs"


const Token = () => {

  const session = useSelector((state: RootState) => state.session)

  return (
    <>
      <h3 className="mb-3 mt-5">Token Data</h3>

      <Row className="mb-2">
        <Col sm={2}>
          <span>token.isSignin</span>
          <div>{session.isSignin + ""}</div>
        </Col>
        <Col sm={2}>
          <span>token iat</span>
          {session.token && <div>{dayjs(TokenManager.getPayload(session.token).iat).format("YYYY-MM-DD HH:mm:ss") + ""}</div>}
        </Col>
        <Col sm={2}>
          <span>token exp</span>
          {session.token && <div>{dayjs(TokenManager.getPayload(session.token).exp).format("YYYY-MM-DD HH:mm:ss") + ""}</div>}
        </Col>
      </Row>
    </>
  )
}

export default Token