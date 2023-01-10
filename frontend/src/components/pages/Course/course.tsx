import { useNavigate, useParams } from "react-router-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import CourseItem, { ListItemInterface, ListItemType } from "./course.list.item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { CourseDetailInterface, CourseInterface } from "../../../schemas/interfaces";
import { getCourseDetail } from "../../../services/course.service";
import Routing from "../../routing.path";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { addUserCourse, deleteUserCourse, getUserCourse } from "../../../services/user.service";
import jwtDecode from "jwt-decode";
import { TokenInterface } from "../../../utils/token.manager";
import TimeFormat from "../../../utils/time.format";
import { asyncSubscribesFetch } from "../../../store/subscribes.slice";



interface CourseProps { }

const CoursePage = ({ children }: PropsWithChildren<CourseProps>) => {


  let [courseItems, setCourseItems] = useState<Array<ListItemInterface>>([])
  const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({} as CourseDetailInterface)

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [startedDate, setStartedDate] = useState<Date>(new Date(1000))

  const [isLoadCourse, setIsLoadCourse] = useState<boolean>(false)
  const [isLoadSuccess, setIsLoadSuccess] = useState<boolean>(false)

  const session = useSelector((state: RootState) => state.session)
  const subscribes = useSelector((state: RootState) => state.subscribes)
  const userSession = useSelector((state: RootState) => state.sessionUser)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()


  // 수강중인 수업인지 확인
  useEffect(() => {
    subscribes.list.map(item => {
      if (item.classIdx === Number(params.var)) {
        setIsSubscribed(true)
        setStartedDate(item.startedDate)
        return
      }
    })
  }, [isSubscribed])


  // 수강신청/취소
  const onSubscribe = async () => {
    await addUserCourse({ idx: Number(params.var) })
    await dispatch(asyncSubscribesFetch())
    await setTimeout(() => { }, 1000)
    navigate(Routing.Course.List.ByIdx.path(jwtDecode<TokenInterface>(session.token).idx))
  }

  const onUnsubscribe = async () => {
    await deleteUserCourse({ idx: Number(params.var) })
    await dispatch(asyncSubscribesFetch())
    await setTimeout(() => { }, 1000)
    navigate(Routing.Course.List.path)
  }

  const onEdit = async () => {
    navigate(Routing.Course.Edit.ByIdx.path(courseDetail.idx))
  }


  // 코스 세부정보
  useEffect(() => {

    if (params.var === undefined) {
      navigate(Routing.Root.path)
    } else {

      setIsLoadCourse(true)
      getCourseDetail({ idx: Number(params.var) }).then((res: CourseDetailInterface) => {

        const tmp: Array<ListItemInterface> = []

        // 비활성화 상태인 경우
        if (courseDetail.is_active !== undefined && !courseDetail.is_active) {
          window.alert("비활성화 강좌입니다.")
          navigate(-1)
          return
        }

        setCourseDetail(res)
        setIsLoadCourse(false)

        // Class
        courseDetail.classes.map((item) => {
          return tmp.push({
            title: item.name!,
            idx: item.idx!,
            type: ListItemType.LECTURE,
            sectionIdx: item.section_idx!,
            orderIdx: item.order_idx!,
            disabled: !isSubscribed,
            dueDate: new Date(item.due_date!),
            isDueDateImplicit: courseDetail.is_due_date_implicit!,
            startedDate: startedDate,
            onButtonClick: () => navigate(Routing.Lecture.ByIdx.path(item.idx)),
          })
        })

        // Subject
        courseDetail.subjects.map((item) => {
          return tmp.push({
            title: item.name ?? "제목 없음",
            idx: item.idx!,
            type: ListItemType.SUBJECT,
            sectionIdx: item.section_idx!,
            orderIdx: item.order_idx!,
            disabled: !isSubscribed,
            dueDate: new Date(item.due_date!),
            isDueDateImplicit: courseDetail.is_due_date_implicit!,
            startedDate: startedDate,
            onButtonClick: () => navigate(Routing.Subject.ByIdx.path(item.idx)),
          })
        })

        // 정렬
        tmp.sort((a, b) => {
          if (a.sectionIdx > b.sectionIdx) return 1
          if (a.sectionIdx < b.sectionIdx) return -1
          return 0
        })

        // 섹션 추가
        let prevSectionIdx = -Infinity
        for (let i = 0; i < tmp.length; i++) {
          if (prevSectionIdx < tmp[i].sectionIdx) {
            tmp.splice(i, 0, {
              title: "",
              idx: -1,
              type: ListItemType.SECTION,
              sectionIdx: tmp[i].sectionIdx,
              orderIdx: -1,
              disabled: !isSubscribed,
              dueDate: new Date(),
              isDueDateImplicit: courseDetail.is_due_date_implicit!,
              startedDate: startedDate,
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
          <strong className="d-inline-block mt-2 text-primary">{courseDetail.sub_name}</strong>
          <h3 className="mb-0">{courseDetail.name}</h3>
          <div className="mb-3 text-muted">{courseDetail.created_by_name}</div>
          <p className="card-text mb-auto">{courseDetail.description}</p>
          {isSubscribed && <p className="card-text" style={{ color: "grey", fontSize: "0.8rem" }}>{TimeFormat.startedDate(startedDate)}</p>}
          <p className="mb-4"></p>

          {(() => {

            if (userSession.data.level! < 2 && userSession.data.idx === courseDetail.created_by) {
              return <Button variant="primary" onClick={onEdit}>수정하기</Button>
            }

            if (session.isSignin && !isSubscribed) {
              return <Button variant="primary" onClick={onSubscribe}>수강하기</Button>
            }
            else if (isSubscribed) {
              return <Button variant="primary" onClick={onUnsubscribe}>수강 취소하기</Button>
            }

            return null

          })()}

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
              orderIdx={item.orderIdx}
              disabled={item.disabled}
              isDueDateImplicit={item.isDueDateImplicit}
              startedDate={item.startedDate}
              onButtonClick={item.onButtonClick}
              onDeleteClick={item.onDeleteClick}
              onModifyClick={item.onModifyClick}
            />
          })}
        </ListGroup>
      </Row>

      {(isLoadCourse) && <Row style={{ textAlign: "center" }}><Col className='m-5 p-5'>로딩중</Col></Row>}

    </Container>
  </>;
}



export default CoursePage