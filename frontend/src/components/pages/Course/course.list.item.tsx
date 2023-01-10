import { Button, Col, Container, ListGroupItem, Row } from "react-bootstrap";
import TimeFormat from "../../../utils/time.format";
import { MouseEventHandler } from "react";


export interface ListItemInterface {
  title: string,
  dueDate: Date,
  idx: number,
  type: ListItemType,
  sectionIdx: number,
  orderIdx: number,
  disabled: boolean,
  isDueDateImplicit: boolean,
  startedDate: Date,
  isModify?: boolean,
  onModifyClick?: MouseEventHandler<HTMLButtonElement>
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>
  onButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export const enum ListItemType {
  LECTURE,
  SUBJECT,
  SECTION,
}

const CourseItem = (props: ListItemInterface) => {

  return (
    <div>
      {(props.type === ListItemType.SECTION) &&
        <h4 className="mt-5 mb-2 ms-1">
          {props.title}
        </h4>
      }

      {(props.type === ListItemType.LECTURE || props.type === ListItemType.SUBJECT) &&
        <ListGroupItem className="d-flex align-items-start">

          <Container>
            <Row>

              <Col sm={6}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold"> {props.title}</div>
                  {!props.disabled && (
                    <div style={{ fontSize: "0.8rem", color: "grey" }}>
                      {(props.isDueDateImplicit) && `${TimeFormat.dueDateFormatted(props.dueDate)}`}
                      {(!props.isDueDateImplicit) && `${TimeFormat.dueDateFormatted(TimeFormat.dueDateRelative({ started: props.startedDate, due: props.dueDate }))}`}
                    </div>
                  )}
                </div>
              </Col>

              <Col sm />
              <Col sm className="mt-1" style={{ textAlign: "right" }}>
                {(() => {
                  if (props.isModify) {
                    return (
                      <>
                        <Button disabled={props.disabled} type="button" variant="primary" className="me-1" onClick={props.onModifyClick}>
                          {props.type === ListItemType.LECTURE && "강의 수정"}
                          {props.type === ListItemType.SUBJECT && "과제 수정 & 제출 검사"}
                        </Button>
                        <Button disabled={props.disabled} type="button" variant="danger" onClick={props.onDeleteClick}>
                          삭제
                        </Button>
                      </>
                    )
                  } else {
                    return (
                      <Button disabled={props.disabled} type="button" variant="primary" onClick={props.onButtonClick}>
                        {props.type === ListItemType.LECTURE && "강의듣기"}
                        {props.type === ListItemType.SUBJECT && "과제"}
                      </Button>
                    )
                  }
                })()}
              </Col>
            </Row>

          </Container>

        </ListGroupItem>
      }
    </div >
  )
}

export default CourseItem