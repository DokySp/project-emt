import CircularProgress from "../../../common/CircularProgress/circularProgress"
import { Col, Container, Row } from "react-bootstrap"
import { SubjectInterface, SubmitInterface, SubmitStatus, UserInterface } from "../../../../schemas/interfaces"
import ListItem from "./list.item"
import Routing from "../../../routing.path"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSubmitBySubjectAll } from "../../../../services/submit.service"
import { getCourseUser } from "../../../../services/course.service"
import { getSubject } from "../../../../services/subject.service"



// TODO: react-query로 실시간 반영하도록 제작



const SubjectStatus = (props: {}) => {

  const navigate = useNavigate()
  const param = useParams()
  const [submitListData, setSubmitListData] = useState<Array<SubmitInterface>>([] as Array<SubmitInterface>)

  const [userList, setUserList] = useState<Array<UserInterface>>([] as Array<UserInterface>)
  const [grantedCount, setGrantedCount] = useState<number>(-1)
  const [submittedCount, setSubmittedCount] = useState<number>(-1)



  // 수업 정보 가져옴
  useEffect(() => {
    getSubmitBySubjectAll({ idx: Number(param.var) }).then((res: Array<SubmitInterface>) => {
      setSubmitListData(res)
    }).catch((error) => {
      // 통신 에러
    })
  }, [])

  // 정보 가져온 이후 작업
  useEffect(() => {

    getSubject({ idx: Number(param.var) }).then((result: SubjectInterface) => {
      getCourseUser({ idx: result.course_idx! }).then((result) => {
        // 수강자 정보 가져오기
        setUserList(result)

        // 통계 작성
        const grantedList: Array<number> = []
        const submittedList: Array<number> = []
        submitListData.map((item) => {
          if (item.status === SubmitStatus.GRANTED) {
            grantedList.push(item.user_idx!)
          }
          if (item.status === SubmitStatus.SUBMITTED) {
            submittedList.push(item.user_idx!)
          }
        })

        let grantedUserCount = 0
        let submittedUserCount = 0
        result.map((user) => {
          if (grantedList.includes(user.idx!)) {
            grantedUserCount += 1
          }
          if (submittedList.includes(user.idx!)) {
            submittedUserCount += 1
          }
        })
        setGrantedCount(grantedUserCount)
        setSubmittedCount(submittedUserCount)
      })
    })

  }, [submitListData])



  return (
    <>
      <h2 className="mt-5">과제제출 현황</h2>

      <div style={{ height: "50px" }} />

      <Container>
        <Row>
          <Col sm={8}>

            <Row>
              <Col sm>
                <h5>전체 수강생</h5>
                <h3>{userList.length}명</h3>
              </Col>
              <Col sm></Col>
            </Row>

            <div style={{ height: "25px" }} />

            <Row>
              <Col sm>
                <h5>제출완료</h5>
                <h3>{submittedCount}명</h3>
              </Col>
              <Col sm>
                <h5>평가완료</h5>
                <h3>{grantedCount}명</h3>
              </Col>
              <Col sm>
                <h5>미완료</h5>
                <h3>{userList.length - grantedCount}명</h3>
              </Col>
            </Row>

          </Col>
          <Col sm={4} style={{ textAlign: "right" }}>
            <CircularProgress size={175} strokeWidth={30} percentage={grantedCount / userList.length * 100} color={"#5B40F2"} />
          </Col>
        </Row>
      </Container>

      <div style={{ height: "50px" }} />

      <div className="row p-4">
        <ol className="list-group">
          {submitListData.map((item) => <ListItem submit={item} />)}
        </ol>
      </div>

      <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary" style={{ margin: "50px 0 0" }}>
        뒤로가기
      </button>
    </>
  )
}

export default SubjectStatus