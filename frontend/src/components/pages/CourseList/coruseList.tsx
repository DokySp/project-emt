import { ReactElement, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, Container, Row } from "react-bootstrap"
import { CourseInterface } from "../../../schemas/interfaces"
import { createCourse, getCourse } from "../../../services/course.service"
import CourseItem from "../../common/CourseItem/course.item"
import { addUserCourse, getUserCourse } from "../../../services/user.service"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import Routing from "../../routing.path";
import { dummyThumnail1 } from "../../../constants/dummy/dummy"



const CourseListPage = () => {

  const calculateItemCount = (width: number) => Math.ceil((width - 300) / 350)

  const [courseList, setCourseList] = useState<Array<CourseInterface>>([])
  const [isLoadCourse, setIsLoadCourse] = useState<boolean>(false)
  const [itemWidthCount, setItemWidthCount] = useState<number>(calculateItemCount(window.innerWidth))

  const session = useSelector((state: RootState) => state.session)
  const sessionUser = useSelector((state: RootState) => state.sessionUser)
  const params = useParams()
  const navigate = useNavigate()


  const onCreateCourse = async () => {

    const isImplicit = window.confirm("기한을 절대값으로 설정하시겠습니까?")

    const result = await createCourse({
      sub_name: "",
      description: "새로운 강좌입니다.",
      created_by: sessionUser.data.idx!,
      img: dummyThumnail1,
      name: "새로운 강좌",
      is_enroll_granted: true,
      is_due_date_implicit: isImplicit
    })

    await addUserCourse({ idx: result.idx! })

    navigate(Routing.Course.Edit.ByIdx.path(result.idx))
  }


  useEffect(() => {

    if (params.var === undefined) {
      setIsLoadCourse(true)
      getCourse().then((res) => {
        setCourseList([...res])
        setIsLoadCourse(false)
      }).catch(() => {
        setIsLoadCourse(false)
      })
    } else {

      if (!session.isSignin) {
        navigate(Routing.Root.path)
      } else {
        // 로그인 사용자 && param 있는 경우
        setIsLoadCourse(true)
        getUserCourse().then((res) => {
          setCourseList([...res])
          setIsLoadCourse(false)
        }).catch(() => {
          setIsLoadCourse(false)
        })
      }
    }

    return () => {
      setCourseList([])
    }
  }, [params.var])

  // 스크린 너비 반영
  const handleOnResize = () => {

    setItemWidthCount(calculateItemCount(window.innerWidth))
  }
  useEffect(() => {
    window.addEventListener('resize', handleOnResize)
    return () => {
      window.removeEventListener('resize', handleOnResize)
    }
  })

  return (
    <Container className='mb-5 mt-3'>

      {(params.var === undefined) && <h3 className="mb-3 mt-5">추천 강좌</h3>}
      {(params.var !== undefined) && <h3 className="mb-3 mt-5">나의 강좌</h3>}

      {(() => {
        const result: Array<ReactElement> = []

        const count = Math.trunc(courseList.length / itemWidthCount)
        for (let n = 0; n < count + 1; n++) {
          const itemCol: Array<ReactElement> = []
          for (let i = 0; i < itemWidthCount; i++) {
            const idx = n * itemWidthCount + i;
            itemCol.push(
              <Col className='md-4 p-4' key={idx} style={{ textAlign: "start" }}>
                {idx < courseList.length && <CourseItem value={courseList[idx]} />}
              </Col>
            )
          }
          result.push(
            <Row>
              {itemCol}
            </Row>
          )
        }

        return result
      })()}

      {(isLoadCourse && courseList.length === 0) && <Row style={{ textAlign: "center" }}><Col className='m-5 p-5'>로딩중</Col></Row>}
      {(!isLoadCourse && courseList.length === 0) && <Row style={{ textAlign: "center" }}><Col className='m-5 p-5'>수강중인 강좌가 없습니다</Col></Row>}

      <Row style={{ textAlign: "center" }}>
        <Col className='m-1 p-5'>
          <Button variant="primary" onClick={onCreateCourse}>새로운 강좌 생성</Button>
        </Col>
      </Row>

    </Container>
  )
}

export default CourseListPage