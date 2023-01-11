import ReactMarkdown from "react-markdown"
import { fakeChatData, fakeMarkdownTextSmall } from "../../../../constants/dummy/dummy"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap"
import Chat from "../Chat/chat"
import { ChatDataInterface, SendFrom, SubjectInterface, SubmitInterface, SubmitStatus } from "../../../../schemas/interfaces"
import { ReactElement, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { useForm } from "react-hook-form"
import { getSubmit, updateSubmit } from "../../../../services/submit.service"
import FileItem from "../../../common/FileItem/file.item"
import { getSubject } from "../../../../services/subject.service"
import Routing from "../../../routing.path"



interface SubjectEvaluationProps {
  // navigate: NavigateFunction,
}

interface SubmitInputForm {
  // status: SubmitStatus,
  score: number,
  // comments: string,
  // return_time: Date,
  // submitted_time: Date,
  files: FileList,
}


const SubjectEvaluationPage = (props: SubjectEvaluationProps) => {

  const navigate = useNavigate()
  const params = useParams()
  const [submitData, setSubmitData] = useState<SubmitInterface>({} as SubmitInterface)
  const [subjectData, setSubjectData] = useState<SubjectInterface>({} as SubjectInterface)
  const [fileList, setFileList] = useState<Array<ReactElement>>()
  const [isChatChanged, setIsChatChanged] = useState<boolean>(false)
  const [comments, setComments] = useState<Array<ChatDataInterface>>([])
  const [commentForm, setCommentForm] = useState<string>("")

  const userSession = useSelector((state: RootState) => state.sessionUser)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmitInputForm>();



  // 과제 정보 가져옴
  useEffect(() => {
    getSubmit({ idx: Number(params.var) }).then((res: SubmitInterface) => {
      setSubmitData(res)
      setComments(res.comments ?? [])
    }).catch((error) => {
      // 통신 에러
    })
  }, [isChatChanged])

  // 정보 가져온 이후 작업
  useEffect(() => {

    // 과제 정보 가져오기
    getSubject({ idx: submitData.subjects_idx! }).then((result) => {
      setSubjectData(result)

      // 파일 정보 추가
      if (submitData.files) {
        const list: Array<ReactElement> = [];

        submitData.files!.map((item) => {
          list.push(
            (<FileItem file={item} />)
          )
        })
        setFileList(list)
      }

      // 폼 데이터 추가
      setValue("score", submitData.score ?? 0)
    })
  }, [submitData])


  const onReturnSubmit = handleSubmit(async (data) => {
    await updateSubmit({
      idx: submitData.idx!,
      score: data.score,
      status: SubmitStatus.RETURNED
    })
    navigate(Routing.Subject.Edit.ByIdx.path(subjectData.idx))
  })

  const onGrantedSubmit = handleSubmit(async (data) => {
    await updateSubmit({
      idx: submitData.idx!,
      score: data.score,
      status: SubmitStatus.GRANTED
    })
    navigate(Routing.Subject.Edit.ByIdx.path(subjectData.idx))
  })

  const onChatDataSubmit = async () => {
    console.log(commentForm)
    comments.push({
      sendFrom: SendFrom.TRAINER,
      time: new Date(Date.now()),
      message: commentForm,
    })

    await updateSubmit({
      idx: submitData.idx!,
      comments: comments
    })

    setCommentForm("")
  }


  return (
    <>
      {/* onSubmit={handleSubmit(onSubmitHandler)} */}
      <form >
        <Container>
          <div className="row p-4">

            {submitData.user && <h2 className="mt-5">{subjectData.name} - {submitData.user!.nickname + ""}</h2>}


            <div style={{ height: "50px" }} />

            <div className="mb-3">
              <h4 className="mt-4">학생이 제출한 과제</h4>
              <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "15px" }}>
                <ReactMarkdown children={submitData.report!}></ReactMarkdown>
              </div>
            </div>

            <h4 className="mt-4">첨부파일</h4>
            <Row className="mt-1 mb-5">
              {fileList && (
                <ListGroup>
                  {fileList && fileList.map((item) => item)}
                </ListGroup>
              )}
              {fileList?.length === 0 && (
                <div>첨부파일이 없습니다.</div>
              )}
              {!fileList && (
                <div>에러</div>
              )}
            </Row>

            <div className="mb-3">
              <h4 className="mt-4">평가 점수 (100점 만점 기준 입력)</h4>
              <input className="form-control" {...register("score", { required: false })} />
            </div>

            <div className="mb-3">
              <h4 className="mt-4">의견 달기</h4>
              <Chat chatData={comments} />
            </div>

            <Container>
              <Row>
                <Col sm>
                  <div className="mb-3">
                    <input className="form-control" value={commentForm} onChange={(e) => setCommentForm(e.target.value)} />
                  </div>
                </Col>
                <Col sm="auto">
                  <Button variant="primary" style={{ width: "100%" }} onClick={onChatDataSubmit}>
                    의견 달기
                  </Button>
                </Col>
              </Row>
            </Container>


            <div style={{ height: "50px" }} />


            <Container>
              <Row>
                <Col sm>
                  <Button onClick={onReturnSubmit} variant="danger" className="ms-auto me-auto" style={{ width: "100%", marginTop: "10px", backgroundColor: "#ED5F14" }}>
                    {submitData.status === SubmitStatus.GRANTED && "채점 취소 & 돌려주기"}
                    {submitData.status !== SubmitStatus.GRANTED && "돌려주기"}
                  </Button>
                </Col>
                {submitData.status !== SubmitStatus.GRANTED && (
                  <Col sm>
                    <Button onClick={onGrantedSubmit} variant="primary" style={{ width: "100%", marginTop: "10px" }}>
                      채점완료
                    </Button>
                  </Col>
                )}

              </Row>
            </Container>

            <Col sm>
              <Button variant="secondary" style={{ width: "100%", marginTop: "20px" }} onClick={() => navigate(Routing.Subject.Edit.ByIdx.path(subjectData.idx))}>
                뒤로가기
              </Button>
            </Col>

          </div>
        </Container>
      </form>
    </>
  )
}



export default SubjectEvaluationPage