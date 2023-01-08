import { Button, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Routing from "../../routing.path";
import timeFormat from "../../../utils/time.format";
import dayjs from "dayjs";


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
    <>
      {(props.type === ListItemType.SECTION) &&
        <h4 className="mt-5 mb-2 ms-1">
          {props.title}
        </h4>
      }

      {(props.type === ListItemType.LECTURE || props.type === ListItemType.SUBJECT) &&
        <ListGroupItem className="d-flex justify-content-between align-items-start">

          <div className="ms-2 me-auto">
            {/* {props.isDueDateImplicit && `${timeFormat.dueDateImplicit(props.dueDate)} 까지`} */}
            {(props.isDueDateImplicit) && `${timeFormat.dueDateRelative({ started: props.startedDate, due: props.dueDate })} 까지`}
            <div className="fw-bold">{props.title}</div>
          </div>

          <div className="mt-1">

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

          </div>

        </ListGroupItem>
      }
    </>
  )
}

export default CourseItem