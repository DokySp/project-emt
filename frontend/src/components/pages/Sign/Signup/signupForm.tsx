import { PropsWithChildren, useState } from "react"
import { Col, Container, Dropdown, Row } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"
import { dummyUser1 } from "../../../../utils/dummy/dummy"
import CustomDropdown from "./customDropdown"
import { fakeDivisionList } from "../../../../utils/dummy/sampleDivision"


const groupList = [
  ...fakeDivisionList
]

interface SignupFormProps { }

const SignupFormPage = ({ children }: PropsWithChildren<SignupFormProps>) => {

  const navigate = useNavigate()
  let [dropdownSelected, setDropdownSelected] = useState('')

  return (
    <>
      <div className="container">
        <div className="row p-4">

          <div className="fs-1 fw-bold mt-5">회원가입</div>

          <div className="mt-4">
            <label form="exampleInputEmail1" className="form-label">이메일*</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
          </div>

          <div className="mt-4">
            <label form="exampleInputEmail1" className="form-label">비밀번호*</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
          </div>

          <div className="mt-4">
            <label form="exampleInputEmail1" className="form-label">비밀번호 확인*</label>
            <input className="form-control" id="exampleFormControlTextarea1" />
          </div>

          <div className="mt-4">
            <label form="exampleInputEmail1" className="form-label">그룹</label>

            <table>
              <tr>
                <td>
                  <CustomDropdown data={groupList} onSelected={(e: React.ChangeEvent<HTMLInputElement>) => setDropdownSelected(e.target.textContent ?? "")} />
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  <div className="mt-0 fs-6 fw-semibold">{dropdownSelected}</div>
                </td>
              </tr>
            </table>

          </div>




          <div className="mt-4">
            <label form="exampleInputEmail1" className="form-label">프로필 사진</label>
            <div>
              <button style={{ border: "none", backgroundColor: "#0000" }}>
                <img alt="profileImage" src={dummyUser1} style={{ height: "200px", width: "200px", objectFit: "cover", borderRadius: "10px", border: "solid #ddd 1.5px" }} />
              </button>
            </div>
          </div>

          <Container className="mt-4" style={{ textAlign: "center" }}>
            <Row>
              <Col>
                <button onClick={() => navigate("/signup/done")} type="button" className="btn btn-primary mt-3" style={{ backgroundColor: "#5B40F2" }}>회원가입</button>

              </Col>
            </Row>
            <Row>
              <Col>
                <button onClick={() => navigate("/")} type="button" className="btn btn-secondary mt-1">그만하기</button>
              </Col>
            </Row>
          </Container>

        </div>
      </div >

    </>
  )
}

export default SignupFormPage



