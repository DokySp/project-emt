import { useNavigate } from "react-router-dom"
import { SubmitInterface, SubmitStatus } from "../../../../schemas/interfaces"
import TimeFormat from "../../../../utils/time.format"
import { Button } from "react-bootstrap"

interface ListItemInterface {
  submit: SubmitInterface
}

const ListItem = (props: ListItemInterface) => {

  const navigate = useNavigate()

  return (
    <div className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-5 mt-2 mb-2">
        {props.submit.status === SubmitStatus.NOT_SUBMITTED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#ED5F14" }}>미제출</div>}
        {props.submit.status === SubmitStatus.SUBMITTED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#5B40F2" }}>제출함</div>}
        {props.submit.status === SubmitStatus.RETURNED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#AAA" }}>반환됨</div>}
        {props.submit.status === SubmitStatus.GRANTED && <div className="fs-6 fw-normal fw-bold" style={{ color: "#AAA" }}>채점 완료</div>}
        <div className="fs-5 fw-bold">{props.submit.user!.nickname}</div>
      </div>

      <div className="me-auto mt-auto mb-auto">
        <div className="fs-6 fw-normal">last message</div>
        {props.submit.status === SubmitStatus.SUBMITTED && <div className="fs-6 fw-normal">{TimeFormat.formatted(props.submit.submitted_time!)}</div>}
        {props.submit.status === SubmitStatus.RETURNED && <div className="fs-6 fw-normal">{TimeFormat.formatted(props.submit.return_time!)}</div>}
        {props.submit.status === SubmitStatus.GRANTED && <div className="fs-6 fw-normal">{TimeFormat.formatted(props.submit.return_time!)}</div>}
      </div>

      <Button type="button" variant="primary" className="mt-auto mb-auto" onClick={() => { navigate(`/subject/eval/${props.submit.idx}`) }}>
        과제보기
      </Button>

    </div>
  )
}

export default ListItem