import { Button, Col, Container, ListGroupItem, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Routing from "../../routing.path";
import TimeFormat from "../../../utils/time.format";


export interface ListItemInterface {
  title: string,
  dueDate: Date,
  idx: number,
  type: ListItemType,
  sectionIdx: number,
  disabled: boolean,
  isDueDateImplicit: boolean,
  startedDate: Date,
}

export const enum ListItemType {
  LECTURE,
  SUBJECT,
  SECTION,
}

const CourseItem = (props: ListItemInterface) => {

  const navigate = useNavigate()

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
                  <div className="fw-bold">{props.title}</div>
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
                {props.type === ListItemType.LECTURE && (
                  <Button disabled={props.disabled} type="button" variant="primary" onClick={() => navigate(Routing.Lecture.ByIdx.path(props.idx))}>
                    강의듣기
                  </Button>
                )}
                {props.type === ListItemType.SUBJECT && (
                  <Button disabled={props.disabled} type="button" variant="secondary" onClick={() => navigate(Routing.Subject.ByIdx.path(props.idx))}>
                    과제
                  </Button>
                )}
              </Col>
            </Row>

          </Container>

        </ListGroupItem>
      }
    </div >
  )
}

export default CourseItem