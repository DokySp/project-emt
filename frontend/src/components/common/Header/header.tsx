import { PropsWithChildren } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { dummyLogo1 } from "../../../constants/dummy/dummy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSignout } from "../../../store/session.slice";

interface HeaderProps { }

const Header = ({ children }: PropsWithChildren<HeaderProps>) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state: RootState) => state.session)

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>

          <Nav>
            <Container fluid={true}>
              <Link to={'/'} className="navbar-brand">
                <img src={dummyLogo1} alt="" width="30" className="d-inline-block align-text-top me-2 rounded" />
                Project Emt
              </Link>
            </Container>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link>모든 강좌보기</Nav.Link> */}
            </Nav>

            <Nav>
              <Nav.Link>모든 강좌보기</Nav.Link>
              <NavDropdown title={<span>메뉴</span>} id="collasible-nav-dropdown" className="dropdown-menu-end">
                <NavDropdown.Item>수강중인 강좌보기</NavDropdown.Item>
                <NavDropdown.Item>나의 정보</NavDropdown.Item>
                <NavDropdown.Divider />
                {(session.isSignin) && <NavDropdown.Item onClick={() => dispatch(setSignout())}>로그아웃</NavDropdown.Item>}
                {!(session.isSignin) && <NavDropdown.Item onClick={() => navigate("/signin")}>로그인</NavDropdown.Item>}
              </NavDropdown>
              {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
}


export default Header