import TimeFormat from "../../../utils/time.format"


const DueDateIndicator = (props: { isImplicit: boolean, dueDate: Date, startedDate?: Date }) => {

  return (
    <>
      <h5 style={{ color: "orange" }} className="mb-0">
        제출기한: {(() => {
          if (props.isImplicit) {
            return TimeFormat.dueDateFormatted(props.dueDate)
          } else {
            if (props.startedDate !== undefined && props.dueDate !== undefined) {
              const dueDate = TimeFormat.dueDateRelative({ started: props.startedDate, due: props.dueDate })
              return TimeFormat.dueDateFormatted(dueDate)
            } else {
              return "로딩중"
            }
          }
        })()}
      </h5>
    </>
  )
}

export default DueDateIndicator