import { Link } from "react-router-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import { fakeDetailCourse } from "../../../utils/dummy/sampleCourse";



const courseData = fakeDetailCourse



interface ListItemInterface {
  title: string,
  dueDate: Date,
  idx: number,
  type: ListItemType,
}

const enum ListItemType {
  LECTURE,
  SUBJECT,
}

const ListItem = (props: PropsWithChildren<ListItemInterface>) => {


  let href: string = "/"
  switch (props.type) {
    case ListItemType.LECTURE: href += "lecture/"; break;
    case ListItemType.SUBJECT: href += "subject/"; break;
  }
  href += props.idx



  return (
    <div className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        {`${props.dueDate.toString()}까지`}
        <div className="fw-bold">{props.title}</div>
      </div>

      <div className="mt-1">
        <Link to={href}>
          {props.type === ListItemType.LECTURE && (
            <button type="button" className="btn btn-primary">
              강의듣기
            </button>
          )}
          {props.type === ListItemType.SUBJECT && (
            <button type="button" className="btn btn-secondary">
              과제
            </button>
          )}
        </Link>
      </div>

    </div>
  )
}





interface CourseProps { }

const CoursePage = ({ children }: PropsWithChildren<CourseProps>) => {


  let [courseLabels, setCourseLabels] = useState<Array<ListItemInterface>>([])

  useEffect(() => {

    const tmp: Array<ListItemInterface> = []

    courseData.classes.map((item) => {
      return tmp.push({
        title: item.name,
        dueDate: item.due_date,
        idx: item.idx,
        type: ListItemType.LECTURE,
      })
    })
    courseData.subjects.map((item) => {
      return tmp.push({
        title: item.name,
        dueDate: item.due_date,
        idx: item.idx,
        type: ListItemType.SUBJECT,
      })
    })

    // TODO: 일단 이름 순으로 수업/과제 정렬
    tmp.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    })

    setCourseLabels(tmp)

    console.log(courseLabels)

  }, [])


  return <>
    <div className="container">

      <div className="row p-4">
        <div className="col-sm-4" >
          <img className="img-fluid rounded" alt={courseData.name} src={courseData.img} width="100%" />
        </div>

        <div className="col-sm-8 pt-1 align-self-center" >
          {/* <strong className="d-inline-block mt-2 text-primary">World</strong> */}
          <h3 className="mb-0">{courseData.name}</h3>
          {/* <div className="mb-1 text-muted">유재식, 김도균</div> */}
          {/* <p className="card-text mb-auto">프로그래밍의 기초, C언어를 배우고 컴퓨터를 구체적으로 이해해봅니다.</p> */}
          <button type="button" className="btn btn-primary mt-3">수강하기</button>
        </div>
      </div>


      <div className="row p-4">
        <ol className="list-group">

          {/* <br /><br /><h3>Chapter 1. 인공지능 알아보기</h3><br /> */}

          {
            courseLabels.map((item, idx) => {
              return <ListItem title={item.title} dueDate={item.dueDate} idx={item.idx} type={item.type} />
            })
          }

        </ol>
      </div>

    </div>
  </>;
}



export default CoursePage