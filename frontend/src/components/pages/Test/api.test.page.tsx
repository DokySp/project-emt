import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ApiTest } from "./Components/api.test.root"




const ApiTestPage = () => {

  const navigate = useNavigate()




  return (
    <Container>

      <h3 className="mb-3 mt-5">API TEST</h3>
      <Button variant="secondary" onClick={() => navigate(-1)}>BACK</Button>

      <ApiTest.Token />

      <hr className="mt-5" />

      <ApiTest.Submit />

      <hr className="mt-5" />

      <ApiTest.CourseDate />
      <ApiTest.Course />
      <ApiTest.Class />
      <ApiTest.Subject />

      <ApiTest.User />
      <ApiTest.File />

      <ApiTest.ObjectState />


    </Container>
  )
}


export default ApiTestPage