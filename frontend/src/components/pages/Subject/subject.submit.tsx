import { Button, Col, Container, FormControl, ListGroup, Row } from "react-bootstrap"
import Routing from "../../routing.path"
import { useNavigate, useParams } from "react-router-dom"
import { ChatDataInterface, SendFrom, SubjectInterface, SubmitInterface, SubmitStatus } from "../../../schemas/interfaces"
import { ReactElement, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { deleteFile, fetchSubmitFile } from "../../../services/file.service"
import { createSubmit, getSubmitBySubject, updateSubmit } from "../../../services/submit.service"
import FileItem from "../../common/FileItem/file.item"
import TimeFormat from "../../../utils/time.format"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import Chat from "../SubjectEdit/Chat/chat"



interface SubmitInputForm {
  // status: SubmitStatus,
  // score: number,
  report: string,
  // comments: string,
  // return_time: Date,
  // submitted_time: Date,
  files: FileList,
}


const SubjectSubmit = (props: { subject: SubjectInterface }) => {

  const navigate = useNavigate()
  const [submitData, setSubmitData] = useState<SubmitInterface>({} as SubmitInterface)
  const [fileList, setFileList] = useState<Array<ReactElement>>()
  const [isFileChanged, setIsFileChanged] = useState<boolean>(false)
  const userSession = useSelector((state: RootState) => state.sessionUser)
  const [comments, setComments] = useState<Array<ChatDataInterface>>([])
  const [commentForm, setCommentForm] = useState<string>("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmitInputForm>();


  const onSubmitCancel = handleSubmit(async () => {
    await updateSubmit({
      idx: submitData.idx!,
      status: SubmitStatus.NOT_SUBMITTED,
    })
    setIsFileChanged(isFileChanged === true ? false : true)
  })

  const onSubmit = handleSubmit(async (data: SubmitInputForm) => {

    await updateSubmit({
      idx: submitData.idx!,
      submitted_time: new Date(Date.now()),
      report: data.report,
      status: SubmitStatus.SUBMITTED,
    })

    setIsFileChanged(isFileChanged === true ? false : true)
    // navigate(Routing.Course.ByIdx.path(classData.course_idx))
  })
  const onFileHandler = handleSubmit(async (data: SubmitInputForm) => {

    const formData = new FormData();
    const file = data.files[0]

    // ??? ????????? ??????
    // ????????? (key, file, name) ??????
    formData.append('file', file, file.name);
    await fetchSubmitFile({ idx: submitData.idx!, formData })

    setIsFileChanged(isFileChanged === true ? false : true)
  })
  const onFileRemove = (props: { idx: number }) => {
    deleteFile({ idx: props.idx }).then(() => {
      setIsFileChanged(isFileChanged === true ? false : true)
    })
  }

  const onChatDataSubmit = async () => {
    console.log(commentForm)
    comments.push({
      sendFrom: SendFrom.TRAINEE,
      time: new Date(Date.now()),
      message: commentForm,
    })

    await updateSubmit({
      idx: submitData.idx!,
      comments: comments
    })

    setCommentForm("")
  }



  // ?????? ?????? ?????????
  useEffect(() => {
    getSubmitBySubject({ idx: Number(props.subject.idx) }).then((res: SubmitInterface) => {
      setSubmitData(res)
      setComments(res.comments ?? [])
    }).catch((error) => {
      // ????????? ?????? ?????? ?????? ?????? ??????
      createSubmit({
        subjects_idx: props.subject.idx!,
        user_idx: userSession.data.idx!,
        status: SubmitStatus.NOT_SUBMITTED,
      }).then(result => {
        setSubmitData(result)
      }).catch((error) => {
        // ?????? ??????
      })
    })
  }, [isFileChanged])

  // ?????? ????????? ?????? ??????
  useEffect(() => {

    // ?????? ?????? ??????
    if (submitData.files) {
      const list: Array<ReactElement> = [];

      submitData.files!.map((item) => {
        list.push(
          (<FileItem file={item} onDeleteClick={() => onFileRemove({ idx: item.idx })} />)
        )
      })
      setFileList(list)
    }

    // ??? ????????? ??????
    setValue("report", submitData.report ?? "")

  }, [submitData])





  return (
    <>

      <form>
        <Row>
          <Col sm className="mt-5">
            <h3>
              ?????? ????????????
              <span style={{ color: "orange" }}>
                {submitData.status === SubmitStatus.NOT_SUBMITTED && " (?????????)"}
                {submitData.status === SubmitStatus.RETURNED && " (?????????)"}
              </span>
              <span style={{ color: "green" }}>
                {submitData.status === SubmitStatus.SUBMITTED && " (?????????)"}
              </span>
              <span style={{ color: "blue" }}>
                {submitData.status === SubmitStatus.GRANTED && " (?????? ??????)"}
              </span>
            </h3>
          </Col>
        </Row>

        {(submitData.status === SubmitStatus.NOT_SUBMITTED || submitData.status === SubmitStatus.RETURNED) && (
          <>
            <div className="mb-3">
              <label className="form-label">?????? ???????????? (?????????????????? ??????)</label>
              <textarea className="form-control" {...register("report", { required: false })} rows={0} style={{ height: "300px" }} />
            </div>

            <Row className="mt-3">
              <Col>
                <label className="form-label">?????? ??????</label>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormControl type="file" required={false} {...register("files")} />
              </Col>
              <Col sm={2} >
                <Button onClick={onFileHandler} variant="primary" style={{ width: "100%" }}>
                  ?????????
                </Button>
              </Col>
            </Row>

            <Row className="mt-3 mb-3">
              <ListGroup>
                {fileList && fileList.map((item) => item)}
              </ListGroup>
            </Row>
          </>
        )}

        {(submitData.status === SubmitStatus.SUBMITTED) && (
          <div className="mb-3">
            <label className="form-label">????????? ?????????????????????.<br />?????????: {TimeFormat.formatted(submitData.submitted_time!)} </label>
          </div>
        )}

        {(submitData.status === SubmitStatus.GRANTED) && (
          <div className="mb-3">
            <label className="form-label">????????? ????????? ?????????????????????.<br />?????????: {TimeFormat.formatted(submitData.submitted_time!)} </label>
          </div>
        )}

        {(submitData.status !== SubmitStatus.NOT_SUBMITTED && submitData.status !== SubmitStatus.SUBMITTED) && (
          <>
            <div className="mb-3">
              <h4 className="mt-4">?????? ??????</h4>
              <Chat chatData={comments} />
            </div>

            {(submitData.status !== SubmitStatus.GRANTED) && (
              <Container>
                <Row>
                  <Col sm>
                    <div className="mb-3">
                      <input className="form-control" value={commentForm} onChange={(e) => setCommentForm(e.target.value)} />
                    </div>
                  </Col>
                  <Col sm="auto">
                    <Button variant="primary" style={{ width: "100%" }} onClick={onChatDataSubmit}>
                      ?????? ??????
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </>
        )}


        <Container style={{ textAlign: "center" }}>
          <Col sm className="mt-5 pt-1">

            {(submitData.status === SubmitStatus.NOT_SUBMITTED || submitData.status === SubmitStatus.RETURNED) && (
              <Button variant="primary" onClick={onSubmit} className="me-1">
                ????????????
              </Button>
            )}

            {(submitData.status === SubmitStatus.SUBMITTED) && (
              <Button variant="primary" onClick={onSubmitCancel} className="me-1">
                ?????? ????????????
              </Button>
            )}

            <Button variant="secondary" onClick={() => navigate(Routing.Course.ByIdx.path(props.subject.course_idx))} >
              ????????????
            </Button>
          </Col>
        </Container>

      </form>

    </>
  )
}

export default SubjectSubmit
