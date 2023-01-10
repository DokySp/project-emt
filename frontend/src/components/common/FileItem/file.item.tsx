import { Button, Col, Container, ListGroupItem, Row } from "react-bootstrap";
import { MouseEventHandler } from "react";
import { downloadFile } from "../../../services/file.service";
import { FileInterface } from "../../../schemas/interfaces";


export interface FileItemInterface {
  file: FileInterface
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>,
}


const FileItem = (props: FileItemInterface) => {

  return (
    <ListGroupItem className="d-flex align-items-start">

      <Container>
        <Row>
          <Col sm={6}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{props.file.name}</div>
              <span style={{ color: "#AAA" }}>{`${Math.floor(props.file.size / 1024)} KB  |  `}</span>
              <span style={{ color: "#BBB" }}>{props.file.type}</span>
            </div>
          </Col>

          <Col sm />
          <Col sm className="mt-1" style={{ textAlign: "right" }}>
            <Button type="button" className="me-1" variant="primary" onClick={() => {
              downloadFile({ file: props.file })
            }}>
              다운로드
            </Button>
            {props.onDeleteClick && (
              <Button type="button" variant="danger" onClick={props.onDeleteClick}>
                삭제
              </Button>
            )}

          </Col>
        </Row>
      </Container>
    </ListGroupItem>

  )
}

export default FileItem