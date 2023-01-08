import ReactMarkdown from "react-markdown"

import { dummyVimeoUrl, fakeMarkdownText } from "../../../constants/dummy/dummy"
import { useNavigate, useParams } from "react-router-dom"
import VimeoViewer from "../../common/VimeoViewer/vimeoViewer"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { useEffect, useState } from "react"
import { getClass } from "../../../services/class.service"
import { ClassInterface, CourseInterface } from "../../../schemas/interfaces"
import TimeFormat from "../../../utils/time.format"
import { getUserCourse } from "../../../services/user.service"


const LecturePage = () => {

  const session = useSelector((state: RootState) => state.session)
  const subscribes = useSelector((state: RootState) => state.subscribes)
  const params = useParams()
  const navigate = useNavigate()

  const [classData, setClassData] = useState<ClassInterface>({} as ClassInterface)
  const [courseData, setCourseData] = useState<CourseInterface>({} as CourseInterface)
  const [isVimeoUrlExist, setIsVimeoUrlExist] = useState<boolean>(false)

  // 수업 정보 가져옴
  useEffect(() => {
    getClass({ idx: Number(params.var) }).then((res: ClassInterface) => {
      setClassData(res)
    }).catch((error) => {
      // 통신 에러
    })

  }, [])
  useEffect(() => {
    setIsVimeoUrlExist(!(classData.vimeo_url === undefined || classData.vimeo_url === null))
  }, [classData])


  // 코스 정보 가져옴
  useEffect(() => {

    getUserCourse().then((res: Array<CourseInterface>) => {
      res.map((item: CourseInterface) => {
        if (item.idx === classData.course_idx) {
          setCourseData(item)
          return
        }
      })
    })
  }, [classData])



  return (
    <>
      <div className="container">
        <div className="row p-4">

          {isVimeoUrlExist && <VimeoViewer url={classData.vimeo_url!} />}
          {!isVimeoUrlExist && <div style={{ height: "75px" }} />}

          <h2 className="mt-4">{classData.name}</h2>
          <h5 style={{ color: "orange" }} className="mb-0">
            제출기한: {(() => {
              if (courseData.is_due_date_implicit) {
                return TimeFormat.dueDateImplicit(classData.due_date!)
              } else {
                if (courseData.started_date !== undefined && classData.due_date !== undefined) {
                  return TimeFormat.dueDateRelative({ started: courseData.started_date!, due: classData.due_date! })
                } else {
                  return "로딩중"
                }
              }
            })()}
          </h5>
          <div className="text-muted mt-0">
            수강시간: {(classData.watch_time !== undefined) && TimeFormat.periodTime(classData.watch_time!)}
          </div>

          <div className="mt" style={{ padding: "50px 10px 100px" }}>
            <ReactMarkdown children={classData.content ?? "내용 없음."}></ReactMarkdown>
          </div>

          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div>TODO: 파일 리스트</div>
          <div className="mb-5">TODO: 파일 리스트</div>

          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary">
            뒤로가기
          </button>

        </div>
      </div>
    </>
  )
}



export default LecturePage