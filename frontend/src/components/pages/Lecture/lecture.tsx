import ReactMarkdown from "react-markdown"

import { useNavigate, useParams } from "react-router-dom"
import VimeoViewer from "../../common/VimeoViewer/vimeoViewer"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { ReactElement, useEffect, useState } from "react"
import { getClass, updateClass } from "../../../services/class.service"
import { ClassInterface, CourseInterface } from "../../../schemas/interfaces"
import TimeFormat from "../../../utils/time.format"
import { getUserCourse } from "../../../services/user.service"
import DueDateIndicator from "../../common/DueDateIndicator/duedate.indicator"
import { ListGroup, Row } from "react-bootstrap"
import FileItem from "../../common/FileItem/file.item"


const LecturePage = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [classData, setClassData] = useState<ClassInterface>({} as ClassInterface)
  const [courseData, setCourseData] = useState<CourseInterface>({} as CourseInterface)
  const [isVimeoUrlExist, setIsVimeoUrlExist] = useState<boolean>(false)
  const [fileList, setFileList] = useState<Array<ReactElement>>()

  // // TODO: 수강시간 기록 / 업데이트
  // const [watchedMinute, setWatchedMinute] = useState(0)

  // 수업 정보 가져옴
  useEffect(() => {
    getClass({ idx: Number(params.var) }).then((res: ClassInterface) => {
      setClassData(res)
    }).catch((error) => {
      // 통신 에러
    })
  }, [])

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


  // 정보 가져온 이후 작업
  useEffect(() => {
    setIsVimeoUrlExist(!(classData.vimeo_url === undefined || classData.vimeo_url === null))

    // 수강기간 유효기간 확인
    if (classData.due_date && courseData.started_date) {
      let diff: number = 0
      let dueDate: string = ""
      if (courseData.is_due_date_implicit) {
        dueDate = TimeFormat.dueDateFormatted(classData.due_date)
        diff = classData.due_date.getTime() - new Date(Date.now()).getTime()
      } else {
        const relativeDueDate = (TimeFormat.dueDateRelative({ started: courseData.started_date!, due: classData.due_date! }))
        dueDate = TimeFormat.dueDateFormatted(relativeDueDate)
        diff = relativeDueDate.getTime() - new Date(Date.now()).getTime()
      }

      if (diff < 0) {
        window.alert(`수강 기간이 지났습니다.\n${dueDate} 수강 가능`)
        navigate(-1)
      }
    }

    // 파일 리스트 업데이트
    if (classData.files) {
      const list: Array<ReactElement> = [];

      classData.files!.map((item) => {
        list.push(
          (<FileItem file={item} />)
        )
      })
      setFileList(list)
    }

  }, [classData, courseData])


  // // TODO: 수강시간 기록 / 업데이트
  // useEffect(() => {
  //   const watchtimeCounter = setTimeout(() => {
  //     setWatchedMinute(watchedMinute + 1)

  //     if (classData.idx && classData.watch_time) {
  //       const totalWatchTime = watchedMinute * (1 * 60 * 1000)
  //       const totalWatchtimeDate = new Date(classData.watch_time.getTime() + totalWatchTime)
  //       console.log(totalWatchtimeDate)
  //       updateClass({ idx: classData.idx, watch_time: totalWatchtimeDate })
  //     }

  //   }, 60 * 1000)
  //   return () => {
  //     clearTimeout(watchtimeCounter)
  //   }
  // }, [watchedMinute])



  return (
    <>
      <div className="container">
        <div className="row p-4">

          {isVimeoUrlExist && <VimeoViewer url={classData.vimeo_url!} />}
          {!isVimeoUrlExist && <div style={{ height: "75px" }} />}


          <h2 className="mt-4">{classData.name}</h2>
          <DueDateIndicator isImplicit={courseData.is_due_date_implicit!} dueDate={classData.due_date!} startedDate={courseData.started_date} />
          {/* <div className="text-muted mt-0">
            수강시간: {classData.watch_time && TimeFormat.periodTime(new Date(classData.watch_time.getTime() + watchedMinute * (1 * 60 * 1000)))}
          </div> */}

          <div className="mt" style={{ padding: "50px 10px 100px" }}>
            <ReactMarkdown children={classData.content ?? "내용 없음."}></ReactMarkdown>
          </div>

          <h4 className="mt-4">파일 목록</h4>
          <Row className="mt-1 mb-5">
            <ListGroup>
              {fileList && fileList.map((item) => item)}
            </ListGroup>
          </Row>

          <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary">
            뒤로가기
          </button>

        </div>
      </div>
    </>
  )
}



export default LecturePage