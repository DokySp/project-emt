
import { useNavigate } from "react-router-dom"
import Routing from "../../routing.path"
import { CourseInterface } from "../../../schemas/interfaces"

const CourseItem = (props: { value: CourseInterface }) => {

  const navigate = useNavigate()

  const disabled = props.value.is_active ? undefined : { color: "grey" }

  return (
    <div onClick={() => { navigate(Routing.Course.ByIdx.path(props.value.idx)) }}>
      <div>
        <img src={props.value.img} alt={props.value.name} width="100%" className="rounded" />
        <h4 className="mt-3" style={disabled}>{props.value.name}</h4>
        <div className="mb-1 text-muted" style={disabled}><span>{props.value.sub_name ?? ""}</span> | <span>{props.value.created_by_name ?? "미정"}</span></div>
        <p className="card-text mb-auto" style={disabled}>{props.value.description ?? ""}</p>
      </div>
    </div>
  )
}

export default CourseItem