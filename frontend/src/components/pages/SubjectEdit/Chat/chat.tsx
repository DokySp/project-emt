


// TODO: react-query로 실시간 반영하도록 제작

import { Col, Row } from "react-bootstrap"
import { ChatDataInterface, SendFrom } from "../../../../schemas/interfaces"
import TimeFormat from "../../../../utils/time.format"


interface ChatProps {
  chatData: Array<ChatDataInterface>
}

const Chat = (props: ChatProps) => {

  return (
    <>
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "15px" }}>

        {
          props.chatData.map((item, idx) => {

            switch (item.sendFrom) {
              case SendFrom.TRAINEE:
                return (
                  <Row>
                    <Col>
                      <button type="button" className="btn btn-secondary" style={{ margin: "0 0 5px", backgroundColor: "#999", textAlign: "left" }} >{item.message}</button>
                      <span style={{ fontSize: "12px", verticalAlign: "-5px", marginLeft: "10px" }}>{item.time.toString().substring(0, 24)}</span>
                    </Col>
                    <Col />
                  </Row>
                )
              case SendFrom.TRAINER:
                return (
                  <Row>
                    <Col />
                    <Col style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "12px", verticalAlign: "-5px", marginRight: "10px" }}>{TimeFormat.formatted(item.time)}</span>
                      <button type="button" className="btn btn-secondary" style={{ margin: "0 0 5px", backgroundColor: "#5B40F2", textAlign: "left" }} >{item.message}</button>
                    </Col>
                  </Row>
                )
              default:
                return null
            }
          })
        }

        {props.chatData.length === 0 && (
          <div>의견이 없습니다</div>
        )}

      </div>
    </>
  )
}

export default Chat


