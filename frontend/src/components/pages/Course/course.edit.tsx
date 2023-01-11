import { useNavigate, useParams } from "react-router-dom";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import CourseItem, { ListItemInterface, ListItemType } from "./course.list.item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { CourseDetailInterface, CourseInterface } from "../../../schemas/interfaces";
import { deactivateCourse, deleteCourse, getCourseDetail, updateCourse } from "../../../services/course.service";
import Routing from "../../routing.path";
import { Button, Col, Container, Form, FormControl, ListGroup, ListGroupItem, Row, ToggleButton } from "react-bootstrap";
import { addUserCourse, deleteUserCourse, getUserCourse } from "../../../services/user.service";
import jwtDecode from "jwt-decode";
import { TokenInterface } from "../../../utils/token.manager";
import TimeFormat from "../../../utils/time.format";
import { asyncSubscribesFetch } from "../../../store/subscribes.slice";
import { createSubject, deleteSubject } from "../../../services/subject.service";
import { createClass, deleteClass } from "../../../services/class.service";
import { useForm } from "react-hook-form";
import { fetchImageFile } from "../../../services/file.service";
import { API_URL } from "../../../constants/url";


interface CourseProps { }

interface CourseInputForm {
  sub_name: string,
  description: string,
  name: string,
  imgfiles: FileList,
}



const CourseEditPage = ({ children }: PropsWithChildren<CourseProps>) => {


  let [courseItems, setCourseItems] = useState<Array<ListItemInterface>>([])
  const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({} as CourseDetailInterface)

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [startedDate, setStartedDate] = useState<Date>(new Date(1000))

  const [isLoadCourse, setIsLoadCourse] = useState<boolean>(false)
  const [isLoadSuccess, setIsLoadSuccess] = useState<boolean>(false)
  const [isEnrollGranted, setIsEnrollGranted] = useState<boolean>(false)

  const session = useSelector((state: RootState) => state.session)
  const subscribes = useSelector((state: RootState) => state.subscribes)
  const userSession = useSelector((state: RootState) => state.sessionUser)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseInputForm>();



  const onSave = handleSubmit(async (data) => {

    const formData = new FormData()
    formData.append('file', data.imgfiles[0], data.imgfiles[0].name);
    const result = await fetchImageFile({ formData: formData })

    await updateCourse({
      idx: courseDetail.idx!,
      is_enroll_granted: isEnrollGranted,
      img: `${API_URL}/api/file/${result.uuid}`,
      ...data
    })

    navigate(Routing.Course.ByIdx.path(courseDetail.idx))
  })

  const onCourseDelete = async () => {
    const isDelete = window.confirm("정말 강좌를 삭제하시겠습니까?")

    if (isDelete) {
      await deactivateCourse({ idx: courseDetail.idx! })
      navigate(Routing.Course.List.path)
    }
  }

  const onCreateClass = async (props: { sectionIdx: number }) => {

    const newCourseItems = [...courseItems]
    let sectionCount = 0
    let sectionItemIdx = -Infinity

    newCourseItems.map((item, i) => {
      if (item.sectionIdx === props.sectionIdx) {
        if (sectionItemIdx === -Infinity) {
          sectionItemIdx = i
        }
        sectionCount++
      }
    })

    const newOrder = newCourseItems[sectionCount + sectionItemIdx - 1].orderIdx + 1
    const newIndex = sectionItemIdx + sectionCount

    const newClass = await createClass({
      course_idx: courseDetail.idx!,
      section_idx: props.sectionIdx,
      order_idx: newOrder,
      name: "새로운 강의",
      due_date: new Date(Date.now())
    })

    newCourseItems.splice((newIndex), 0, {
      title: newClass.name!,
      idx: newClass.idx!,
      type: ListItemType.LECTURE,
      sectionIdx: newClass.section_idx!,
      orderIdx: newClass.order_idx!,
      disabled: false,
      dueDate: newClass.due_date!,
      isDueDateImplicit: courseDetail.is_due_date_implicit!,
      startedDate: startedDate,
      onModifyClick: () => navigate(Routing.Lecture.Edit.ByIdx.path(newClass.idx)),
      onDeleteClick: () => { onDeleleClass({ idx: newClass.idx! }) },
    })

    setCourseItems(newCourseItems)
  }


  const onCreateSubject = async (props: { sectionIdx: number }) => {
    const newCourseItems = [...courseItems]
    let sectionCount = 0
    let sectionItemIdx = -Infinity

    newCourseItems.map((item, i) => {
      if (item.sectionIdx === props.sectionIdx) {
        if (sectionItemIdx === -Infinity) {
          sectionItemIdx = i
        }
        sectionCount++
      }
    })

    const newOrder = newCourseItems[sectionCount + sectionItemIdx - 1].orderIdx + 1
    const newIndex = sectionItemIdx + sectionCount

    const newSubject = await createSubject({
      course_idx: courseDetail.idx!,
      section_idx: props.sectionIdx,
      order_idx: newOrder,
      name: "새로운 과제",
      due_date: new Date(Date.now())
    })

    newCourseItems.splice((newIndex), 0, {
      title: newSubject.name!,
      idx: newSubject.idx!,
      type: ListItemType.SUBJECT,
      sectionIdx: newSubject.section_idx!,
      orderIdx: newSubject.order_idx!,
      disabled: false,
      dueDate: newSubject.due_date!,
      isDueDateImplicit: courseDetail.is_due_date_implicit!,
      startedDate: startedDate,
      onModifyClick: () => navigate(Routing.Subject.Edit.ByIdx.path(newSubject.idx)),

      onDeleteClick: () => { onDeleteSubject({ idx: newSubject.idx! }) },
    })

    setCourseItems(newCourseItems)
  }


  const onDeleteSubject = async (props: { idx: number }) => {
    const isDelete = window.confirm(`정말 삭제하시겠습니까?`)

    if (isDelete) {
      await deleteSubject({ idx: props.idx })
      navigate(Routing.Course.ByIdx.path(courseDetail.idx))
    }
  }
  const onDeleleClass = async (props: { idx: number }) => {
    const isDelete = window.confirm(`정말 삭제하시겠습니까?`)

    if (isDelete) {
      await deleteClass({ idx: props.idx })
      navigate(Routing.Course.ByIdx.path(courseDetail.idx))
    }
  }


  const onDeleteSection = (props: { sectionIdx: number }) => {

    const newCourseItems = [...courseItems]
    let sectionCount = 0
    let sectionItemIdx = -Infinity

    newCourseItems.map((item, i) => {
      if (item.sectionIdx === props.sectionIdx) {
        if (sectionItemIdx === -Infinity) {
          sectionItemIdx = i
        }
        sectionCount++
      }
    })

    if (sectionCount <= 1) {
      newCourseItems.splice(sectionItemIdx, 1)
      setCourseItems(newCourseItems)
    } else {
      window.alert("먼저 섹션 내 강의와 과제를 모두 삭제해주세요")
    }
  }


  const onCreateSection = () => {

    let maxSectionIdx = 0
    if (courseItems.length !== 0) {
      maxSectionIdx = courseItems[courseItems.length - 1].sectionIdx
    }

    const newCourseItems = [...courseItems]
    newCourseItems.push({
      title: "",
      idx: -1,
      type: ListItemType.SECTION,
      sectionIdx: maxSectionIdx + 1,
      orderIdx: -1,
      //
      disabled: !isSubscribed,
      dueDate: new Date(),
      isDueDateImplicit: courseDetail.is_due_date_implicit!,
      startedDate: startedDate,
    })

    setCourseItems(newCourseItems)
  }



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
        courseDetail.classes.map((item, i) => {
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
            onModifyClick: () => navigate(Routing.Lecture.Edit.ByIdx.path(item.idx)),
            onDeleteClick: () => { onDeleleClass({ idx: item.idx! }) },
          })
        })

        // Subject
        courseDetail.subjects.map((item, i) => {
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
            onModifyClick: () => navigate(Routing.Subject.Edit.ByIdx.path(item.idx)),
            onDeleteClick: () => { onDeleteSubject({ idx: item.idx! }) },
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
            prevSectionIdx = tmp[i].sectionIdx
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

          }
        }
        setCourseItems(tmp)

        // 폼 설정
        setValue("name", courseDetail.name ?? "")
        setValue("sub_name", courseDetail.sub_name ?? "")
        setValue("description", courseDetail.description ?? "")
        setIsEnrollGranted(courseDetail.is_enroll_granted ?? true)

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

      <Form noValidate onSubmit={onSave}>
        <div className="row p-4 mt-5">

          <div className="col-sm-4" >
            <img className="img-fluid rounded" alt={courseDetail.name} src={courseDetail.img} width="100%" />
            <Row>
              <Col sm>
                <FormControl type="file" required={false} {...register("imgfiles")} />
              </Col>
            </Row>
          </div>


          <div className="col-sm-8 pt-1 align-self-center" >

            {/* <strong className="d-inline-block mt-2 text-primary">World</strong> */}
            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">분류</label>
              <input className="form-control" {...register("sub_name", { required: true })} />
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">코스 이름</label>
              <input className="form-control" {...register("name", { required: true })} />
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">설명</label>
              <input className="form-control" {...register("description", { required: true })} />
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">생성자: </label>
              <label form="exampleInputEmail1" className="form-label">{courseDetail.created_by_name}</label>
            </div>

            <Button variant={isEnrollGranted ? "primary" : "secondary"} onClick={() => {
              setIsEnrollGranted(isEnrollGranted ? false : true)
            }}>
              {isEnrollGranted ? "OPEN" : "CLOSE"}
            </Button>

            <p className="mb-4"></p>

            <Row>
              <Col>
                <Button className="me-1" variant="primary" type="submit">저장</Button>
                <Button className="me-1" variant="danger" onClick={onCourseDelete}>삭제</Button>
                <Button variant="secondary" onClick={() => navigate(Routing.Course.ByIdx.path(courseDetail.idx))}>뒤로가기</Button>
              </Col>
            </Row>

          </div>

        </div>
      </Form>


      <Row className="p-4">
        <ListGroup>
          {courseItems.map((item, idx) => {

            if (item.type === ListItemType.SECTION) {
              return (
                <ListGroupItem className="d-flex align-items-end mt-5">
                  <Container>
                    <Row>
                      <Col >
                        <Button variant="primary" className="me-1" onClick={() => onCreateClass({ sectionIdx: item.sectionIdx })}>강의 추가</Button>
                        <Button variant="secondary" className="me-1" onClick={() => onCreateSubject({ sectionIdx: item.sectionIdx })}>과제 추가</Button>
                        <Button variant="danger" className="me-1" onClick={() => onDeleteSection({ sectionIdx: item.sectionIdx })}>섹션 삭제</Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroupItem>
              )
            }

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
              isModify={true}
              onButtonClick={item.onButtonClick}
              onDeleteClick={item.onDeleteClick}
              onModifyClick={item.onModifyClick}
            />
          })}


          <Row style={{ textAlign: "center" }}>
            <Col className='m-1 p-5'>
              <Button variant="primary" onClick={onCreateSection}>섹션 추가</Button>
            </Col>
          </Row>

        </ListGroup>
      </Row>

      {(isLoadCourse) && <Row style={{ textAlign: "center" }}><Col className='m-5 p-5'>로딩중</Col></Row>}

    </Container>
  </>;
}



export default CourseEditPage