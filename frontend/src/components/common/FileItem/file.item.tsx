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
          <Col sm>
            <span className="fs-6 fw-bold">📁 </span>
            <span className="fs-6 fw-bold">{props.file.name}</span>
          </Col>
          <Col sm={2}>
            <div className="fs-6 fw-normal">{props.file.type}</div>
          </Col>
          <Col sm={1} >
            <div className="fs-6 fw-normal">{`${Math.floor(props.file.size / 1024)} KB`}</div>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <Button type="button" variant="primary" onClick={() => {
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