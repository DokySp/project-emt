import { PropsWithChildren, ReactElement, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { ClassInterface, ClassUpdateInterface, CourseInterface } from "../../../schemas/interfaces"
import { deleteFile, fetchClassFile } from "../../../services/file.service"
import { getClass, updateClass } from "../../../services/class.service"
import FileItem from "../../common/FileItem/file.item"
import TimeFormat from "../../../utils/time.format"
import Routing from "../../routing.path"
import { Button, Col, Container, FormControl, ListGroup, Row } from "react-bootstrap"
import { getUserCourse } from "../../../services/user.service"


interface LectureEditProps { }

interface ClassInputForm {
  vimeo_url: string,
  name: string,
  content: string,
  due_date: string,
  files: FileList,
}


const LectureEditPage = ({ children }: PropsWithChildren<LectureEditProps>) => {

  let isCreateNotEdit: boolean = false

  const navigate = useNavigate()
  const params = useParams()
  const [classData, setClassData] = useState<ClassInterface>({} as ClassInterface)
  const [courseData, setCourseData] = useState<CourseInterface>({} as CourseInterface)
  const [fileList, setFileList] = useState<Array<ReactElement>>()
  const [isFileChanged, setIsFileChanged] = useState<boolean>(false)


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClassInputForm>();



  const onSaveHandler = async (data: ClassInputForm) => {

    let dueDate
    if (courseData.is_due_date_implicit) {
      dueDate = new Date(data.due_date)
    } else {
      dueDate = new Date("1970-" + data.due_date)
    }

    await updateClass({
      idx: classData.idx!,
      vimeo_url: data.vimeo_url,
      name: data.name,
      content: data.content,
      due_date: dueDate,
    })
    navigate(Routing.Course.Edit.ByIdx.path(classData.course_idx))
  }

  const onFileHandler = async (data: ClassInputForm) => {
    const formData = new FormData();
    const file = data.files[0]

    // 폼 데이터 생성
    // 파일은 (key, file, name) 형식
    formData.append('file', file, file.name);
    await fetchClassFile({ idx: classData.idx!, formData })

    setIsFileChanged(isFileChanged === true ? false : true)
  };

  const onFileRemove = (props: { idx: number }) => {
    deleteFile({ idx: props.idx }).then(() => {
      setIsFileChanged(isFileChanged === true ? false : true)
    })
  }


  // 수업 정보 가져옴
  useEffect(() => {
    getClass({ idx: Number(params.var) }).then((res: ClassInterface) => {
      setClassData(res)
    }).catch((error) => {
      // 통신 에러
    })
  }, [isFileChanged])

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

    if (classData.due_date) {
      const list: Array<ReactElement> = [];

      classData.files!.map((item) => {
        list.push(
          (<FileItem file={item} onDeleteClick={() => onFileRemove({ idx: item.idx })} />)
        )
      })
      setFileList(list)
    }

    setValue("vimeo_url", classData.vimeo_url ?? "")
    setValue("name", classData.name ?? "")
    setValue("content", classData.content ?? "")

    if (courseData.is_due_date_implicit) {
      setValue("due_date", TimeFormat.inputFormat(classData.due_date ?? new Date(Date.now())))
    } else {
      setValue("due_date", TimeFormat.inputFormatRelative(classData.due_date ?? new Date(Date.now())))
    }

  }, [classData])


  return (
    <>
      <Container>

        <form onSubmit={handleSubmit(onSaveHandler)}>

          <Row className="p-4">

            <Col sm className="mt-5">
              <h2>강의 {isCreateNotEdit ? "생성하기" : "수정하기"}</h2>
            </Col>
            <Col sm className="mt-5">
              <Button variant="primary" type="submit" className="me-1">
                {isCreateNotEdit ? "생성하기" : "수정하기"}
              </Button>
              <Button variant="secondary" onClick={() => navigate(Routing.Course.Edit.ByIdx.path(classData.course_idx))} >
                뒤로가기
              </Button>
            </Col>

            <div style={{ height: "50px" }} />

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">강의 제목</label>
              <input className="form-control" {...register("name", { required: true })} />
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">
                마감 시간 {courseData && courseData.is_due_date_implicit ? "(0000-)" : ""}00-00 00:00:00 형식으로 입력
              </label>
              <input className="form-control" {...register("due_date", { required: true })} />
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">Vimeo 링크 (없다면 공란)</label>
              <input className="form-control" {...register("vimeo_url", { required: true })} />
              <div id="emailHelp" className="form-text">Zoom, Webex, Google Meet는 향후 지원 예정</div>
            </div>

            <div className="mb-3">
              <label form="exampleInputEmail1" className="form-label">강의 설명 (마크다운으로 작성)</label>
              <textarea className="form-control" {...register("content", { required: true })} rows={0} style={{ height: "300px" }} />
            </div>
          </Row>

        </form>



        <form onSubmit={handleSubmit(onFileHandler)}>

          <Row className="mt-5">
            <Col sm>
              <FormControl type="file" required={false} {...register("files")} />
            </Col>
            <Col sm={2} >
              <Button type="submit" variant="primary" style={{ width: "100%" }}>
                업로드
              </Button>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <ListGroup>
              {fileList && fileList.map((item) => item)}
            </ListGroup>
          </Row>

        </form>



      </Container>
    </>
  )
}

export default LectureEditPage