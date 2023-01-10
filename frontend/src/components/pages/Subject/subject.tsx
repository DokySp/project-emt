import ReactMarkdown from "react-markdown"

import { PropsWithChildren, useEffect, useState } from "react";
import { dummyVimeoUrl, fakeMarkdownText } from "../../../constants/dummy/dummy";
import { useNavigate, useParams } from "react-router-dom";
import VimeoViewer from "../../common/VimeoViewer/vimeoViewer";
import { CourseInterface, SubjectInterface } from "../../../schemas/interfaces";
import { getSubject } from "../../../services/subject.service";
import { getUserCourse } from "../../../services/user.service";
import TimeFormat from "../../../utils/time.format";
import { Button, Col, Container, Row } from "react-bootstrap";
import DueDateIndicator from "../../common/DueDateIndicator/duedate.indicator";




const SubjectPage = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [subjectData, setSubjectData] = useState<SubjectInterface>({} as SubjectInterface)
  const [courseData, setCourseData] = useState<CourseInterface>({} as CourseInterface)
  const [isVimeoUrlExist, setIsVimeoUrlExist] = useState<boolean>(false)

  // 수업 정보 가져옴
  useEffect(() => {
    getSubject({ idx: Number(params.var) }).then((res: SubjectInterface) => {
      setSubjectData(res)
    }).catch((error) => {
      // 통신 에러
    })

  }, [])

  // 코스 정보 가져옴
  useEffect(() => {
    getUserCourse().then((res: Array<CourseInterface>) => {
      res.map((item: CourseInterface) => {
        if (item.idx === subjectData.course_idx) {
          setCourseData(item)
          return
        }
      })
    })
  }, [subjectData])

  // 정보 가져온 이후 작업
  useEffect(() => {
    setIsVimeoUrlExist(!(subjectData.vimeo_url === undefined || subjectData.vimeo_url === null))

    // 수강기간 유효기간 확인
    if (subjectData.due_date && courseData.started_date) {
      let diff: number = 0
      let dueDate: string = ""
      if (courseData.is_due_date_implicit) {
        dueDate = TimeFormat.dueDateFormatted(subjectData.due_date)
        diff = subjectData.due_date.getTime() - new Date(Date.now()).getTime()
      } else {
        const relativeDueDate = (TimeFormat.dueDateRelative({ started: courseData.started_date!, due: subjectData.due_date! }))
        dueDate = TimeFormat.dueDateFormatted(relativeDueDate)
        diff = relativeDueDate.getTime() - new Date(Date.now()).getTime()
      }

      if (diff < 0) {
        window.alert(`제출 기한이 지났습니다.\n${dueDate} 제출`)
        navigate(-1)
      }
    }

  }, [courseData, subjectData])



  return (
    <>

      <div className="container">
        <div className="row p-4">

          {isVimeoUrlExist && <VimeoViewer url={dummyVimeoUrl} />}
          {!isVimeoUrlExist && <div style={{ height: "75px" }} />}

          <h2 className="mt-4">{subjectData.name}</h2>
          <DueDateIndicator isImplicit={courseData.is_due_date_implicit!} dueDate={subjectData.due_date!} startedDate={courseData.started_date} />
          <div className="mt" style={{ padding: "50px 10px 100px" }}>
            <ReactMarkdown children={subjectData.content ?? "내용 없음"}></ReactMarkdown>
          </div>


          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div className="mb-5">TODO: 파일 리스트</div>


          <hr />


          <h3 className="mt-5">과제 제출하기</h3>


          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">내용 작성하기</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "300px" }} />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>

          <Container className="mb-3">

            <Row>
              <Col>
                <label form="exampleInputEmail1" className="form-label">파일 첨부</label>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <input className="form-control" type="file" id="formFile" />
              </Col>
              <Col sm={2} >
                <Button type="button" variant="primary" style={{ width: "100%" }}>
                  업로드
                </Button>
              </Col>
            </Row>




          </Container>

          <Container className="mb-3">
            <div>TODO: 파일 리스트</div>
            <div>TODO: 파일 리스트</div>
            <div>TODO: 파일 리스트</div>
          </Container>

          <button type="button" className="btn btn-primary" style={{ margin: "50px 0 0" }} >
            제출하기
          </button>
          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "10px 0 0" }}>
            뒤로가기
          </button>

        </div>
      </div>

    </>
  )
}

export default SubjectPage