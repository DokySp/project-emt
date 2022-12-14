import { ReactElement, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { CourseInterface, SubjectInterface } from "../../../schemas/interfaces"
import { getSubject, updateSubject } from "../../../services/subject.service"
import Routing from "../../routing.path"
import { deleteFile, fetchSubjectFile } from "../../../services/file.service"
import { getUserCourse } from "../../../services/user.service"
import FileItem from "../../common/FileItem/file.item"
import TimeFormat from "../../../utils/time.format"
import { Button, Col, FormControl, ListGroup, Row } from "react-bootstrap"



interface SubjectContextProps {
  isCreateNotEdit: boolean,
}

interface SubjectInputForm {
  vimeo_url: string,
  name: string,
  content: string,
  due_date: string,
  files: FileList,
}



const SubjectContext = (props: SubjectContextProps) => {

  const navigate = useNavigate()
  const params = useParams()
  const [subjectData, setSubjectData] = useState<SubjectInterface>({} as SubjectInterface)
  const [courseData, setCourseData] = useState<CourseInterface>({} as CourseInterface)
  const [fileList, setFileList] = useState<Array<ReactElement>>()
  const [isFileChanged, setIsFileChanged] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubjectInputForm>();



  const onSaveHandler = async (data: SubjectInputForm) => {
    let dueDate
    if (courseData.is_due_date_implicit) {
      dueDate = new Date(data.due_date)
    } else {
      dueDate = new Date("1970-" + data.due_date)
    }

    await updateSubject({
      idx: subjectData.idx!,
      vimeo_url: data.vimeo_url,
      name: data.name,
      content: data.content,
      due_date: dueDate,
    })
    navigate(Routing.Course.Edit.ByIdx.path(subjectData.course_idx))
  }

  const onFileHandler = async (data: SubjectInputForm) => {
    const formData = new FormData();
    const file = data.files[0]

    // ??? ????????? ??????
    // ????????? (key, file, name) ??????
    formData.append('file', file, file.name);
    await fetchSubjectFile({ idx: subjectData.idx!, formData })

    setIsFileChanged(isFileChanged === true ? false : true)
  };

  const onFileRemove = (props: { idx: number }) => {
    deleteFile({ idx: props.idx }).then(() => {
      setIsFileChanged(isFileChanged === true ? false : true)
    })
  }



  // ?????? ?????? ?????????
  useEffect(() => {
    getSubject({ idx: Number(params.var) }).then((res: SubjectInterface) => {
      setSubjectData(res)
    }).catch((error) => {
      // ?????? ??????
    })
  }, [isFileChanged])

  // ?????? ?????? ?????????
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



  // ?????? ????????? ?????? ??????
  useEffect(() => {

    if (subjectData.due_date) {
      const list: Array<ReactElement> = [];

      subjectData.files!.map((item) => {
        list.push(
          (<FileItem file={item} onDeleteClick={() => onFileRemove({ idx: item.idx })} />)
        )
      })
      setFileList(list)
    }

    setValue("vimeo_url", subjectData.vimeo_url ?? "")
    setValue("name", subjectData.name ?? "")
    setValue("content", subjectData.content ?? "")

    if (courseData.is_due_date_implicit) {
      setValue("due_date", TimeFormat.inputFormat(subjectData.due_date ?? new Date(Date.now())))
    } else {
      setValue("due_date", TimeFormat.inputFormatRelative(subjectData.due_date ?? new Date(Date.now())))
    }

  }, [subjectData])



  return (
    <>
      <form onSubmit={handleSubmit(onSaveHandler)}>

        <Row className="p-4">

          <Col sm className="mt-5">
            <h2>?????? {props.isCreateNotEdit ? "????????????" : "????????????"}</h2>
          </Col>
          <Col sm className="mt-5">
            <Button variant="primary" type="submit" className="me-1">
              {props.isCreateNotEdit ? "????????????" : "????????????"}
            </Button>
            <Button variant="secondary" onClick={() => navigate(Routing.Course.Edit.ByIdx.path(subjectData.course_idx))} >
              ????????????
            </Button>
          </Col>

          <div style={{ height: "50px" }} />

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">?????? ??????</label>
            <input className="form-control" {...register("name", { required: true })} />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">
              ?????? ?????? {courseData && courseData.is_due_date_implicit ? "(0000-)" : ""}00-00 00:00:00 ???????????? ??????
            </label>
            <input className="form-control" {...register("due_date", { required: true })} />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">Vimeo ?????? (????????? ??????)</label>
            <input className="form-control" {...register("vimeo_url", { required: true })} />
            <div id="emailHelp" className="form-text">YouTube??? ?????? ?????? ??????</div>
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">?????? ?????? (?????????????????? ??????)</label>
            <textarea className="form-control" {...register("content", { required: true })} rows={0} style={{ height: "300px" }} />
          </div>

          <div className="mb-3">
            <label form="exampleInputEmail1" className="form-label">?????? ?????? ???, ??????????????? ?????? ?????? (?????? ??????)</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={0} style={{ height: "75px" }} disabled />
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
              ?????????
            </Button>
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <ListGroup>
            {fileList && fileList.map((item) => item)}
          </ListGroup>
        </Row>
      </form>
    </>
  )
}

export default SubjectContext