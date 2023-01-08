import { useNavigate, useParams } from "react-router-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import { fakeDetailCourse } from "../../../constants/dummy/sampleCourse";
import CourseItem, { ListItemInterface, ListItemType } from "./course.item";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CourseDetailInterface, ClassInterface, SubjectInterface, CourseInterface } from "../../../schemas/interfaces";
import { getCourseDetail } from "../../../services/course.service";
import Routing from "../../routing.path";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { addUserCourse, deleteUserCourse, getUserCourse } from "../../../services/user.service";
import jwtDecode from "jwt-decode";
import { TokenInterface } from "../../../utils/token.manager";



interface CourseProps { }

const CoursePage = ({ children }: PropsWithChildren<CourseProps>) => {


  let [courseItems, setCourseItems] = useState<Array<ListItemInterface>>([])
  const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({} as CourseDetailInterface)
  const [subscribes, setSubscribes] = useState<Array<number>>([])
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  const [isLoadCourse, setIsLoadCourse] = useState<boolean>(false)
  const [isLoadSuccess, setIsLoadSuccess] = useState<boolean>(false)

  const session = useSelector((state: RootState) => state.session)
  const params = useParams()
  const navigate = useNavigate()


  // 수강중인 수업인지 확인
  useEffect(() => {
    getUserCourse().then((res: Array<CourseInterface>) => {

      const tmp: Array<number> = []
      res.map((item) => {
        tmp.push(item.idx ?? -1)
      })
      setSubscribes([...tmp])
    }).catch((error) => {
      // 수강한 강의 없거나
      // 통신 에러
    })

  }, [isSubscribed])


  useEffect(() => {
    const idx: number = Number(params.var)
    setIsSubscribed(subscribes.includes(idx))
  }, [subscribes])


  // 코스 세부정보
  useEffect(() => {

    if (params.var === undefined) {
      navigate(Routing.Root.path)
    } else {

      setIsLoadCourse(true)
      getCourseDetail({ idx: Number(params.var) }).then((res: CourseDetailInterface) => {
        setCourseDetail(res)
        setIsLoadCourse(false)

        const tmp: Array<ListItemInterface> = []

        courseDetail.classes.map((item) => {
          return tmp.push({
            title: item.name,
            dueDate: new Date(item.watch_time),
            idx: item.idx,
            type: ListItemType.LECTURE,
            sectionIdx: item.section_idx!,
            disabled: !isSubscribed,
            isDueDateImplicit: courseDetail.is_due_date_implicit!,
            startedDate: courseDetail.started_date!,
          })
        })

        courseDetail.subjects.map((item) => {
          return tmp.push({
            title: item.name,
            dueDate: new Date(item.due_date),
            idx: item.idx,
            type: ListItemType.SUBJECT,
            sectionIdx: item.section_idx!,
            disabled: !isSubscribed,
            isDueDateImplicit: courseDetail.is_due_date_implicit!,
            startedDate: courseDetail.started_date!,
          })
        })

        // 정렬 후 섹션 추가
        tmp.sort((a, b) => {
          if (a.sectionIdx > b.sectionIdx) return 1
          if (a.sectionIdx < b.sectionIdx) return -1
          return 0
        })

        let prevSectionIdx = -Infinity
        for (let i = 0; i < tmp.length; i++) {
          if (prevSectionIdx < tmp[i].sectionIdx) {
            tmp.splice(i, 0, {
              title: "",
              dueDate: new Date(),
              idx: -1,
              type: ListItemType.SECTION,
              sectionIdx: tmp[i].sectionIdx,
              disabled: !isSubscribed,
              isDueDateImplicit: courseDetail.is_due_date_implicit!,
              startedDate: courseDetail.started_date!,
            })
            prevSectionIdx = tmp[i].sectionIdx
          }
        }

        setCourseItems(tmp)




      }).catch(() => {
        setIsLoadCourse(false)
        setIsLoadSuccess(true)
      })

    }

    return () => {
      setCourseDetail({} as CourseDetailInterface)
      setIsLoadCourse(false)
    }
  }, [isLoadSuccess, isSubscribed])




  return <>
    <Container>

      <div className="row p-4 mt-5">
        <div className="col-sm-4" >
          <img className="img-fluid rounded" alt={courseDetail.name} src={courseDetail.img} width="100%" />
        </div>

        <div className="col-sm-8 pt-1 align-self-center" >
          {/* <strong className="d-inline-block mt-2 text-primary">World</strong> */}
          <h3 className="mb-0">{courseDetail.name}</h3>
          <div className="mb-1 text-muted">{courseDetail.created_by_name}</div>
          <p className="card-text mb-auto">{courseDetail.description}</p>

          {!isSubscribed && <Button variant="primary mt-3" onClick={async () => {
            addUserCourse({ idx: Number(params.var) })
            await setTimeout(() => { }, 1000)
            navigate(Routing.Course.List.ByIdx.path(jwtDecode<TokenInterface>(session.token).idx))
          }}>
            수강하기
          </Button>}
          {isSubscribed && <Button variant="primary mt-3" onClick={async () => {
            deleteUserCourse({ idx: Number(params.var) })
            await setTimeout(() => { }, 1000)
            navigate(Routing.Course.List.path)
          }}>수강 취소하기</Button>}

        </div>
      </div>

      <Row className="p-4">
        <ListGroup>
          {courseItems.map((item, idx) => {
            return <CourseItem
              title={item.title}
              dueDate={item.dueDate}
              idx={item.idx}
              type={item.type}
              sectionIdx={item.sectionIdx}
              disabled={item.disabled}
              isDueDateImplicit={item.isDueDateImplicit}
              startedDate={item.startedDate}
            />
          })}
        </ListGroup>
      </Row>

      {(isLoadCourse) && <Row style={{ textAlign: "center" }}><Col className='m-5 p-5'>로딩중</Col></Row>}

    </Container>
  </>;
}



export default CoursePage