import { PropsWithChildren, useState } from "react"
import { Container, Nav, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import SubContext from "./subjectContext"
import SubStatus from "./Status/subjectStatus"



interface SubjectEditProps { }

const SubjectEditPage = ({ children }: PropsWithChildren<SubjectEditProps>) => {

  let isCreateNotEdit: boolean = false

  const enum TabStatus {
    CONTEXT,
    STATUS,
  }

  let [tabStatus, setTabStatus] = useState<TabStatus>(TabStatus.STATUS)


  return (
    <>
      <Container>
        <Row className="p-4">

          <Nav variant="pills" defaultActiveKey={tabStatus}>

            <Nav.Item>
              <Nav.Link onClick={() => setTabStatus(TabStatus.STATUS)} eventKey={TabStatus.STATUS} disabled={isCreateNotEdit} >제출 현황</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={() => setTabStatus(TabStatus.CONTEXT)} eventKey={TabStatus.CONTEXT}>과제 내용</Nav.Link>
            </Nav.Item>

          </Nav>

          {tabStatus === TabStatus.CONTEXT && <SubContext isCreateNotEdit={isCreateNotEdit} />}
          {tabStatus === TabStatus.STATUS && <SubStatus />}


        </Row>
      </Container>
    </>
  )
}

export default SubjectEditPage