import { PropsWithChildren } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { dummyLogo1, dummyThumnail3 } from "../../../constants/dummy/dummy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSignout } from "../../../store/session.slice";
import Routing from "../../routing.path";

interface HeaderProps { }

const Header = ({ children }: PropsWithChildren<HeaderProps>) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state: RootState) => state.session)
  const sessionUser = useSelector((state: RootState) => state.sessionUser)

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

            <Nav className="me-auto" />

            <Nav>
              <Nav.Link className="me-2" onClick={() => navigate(Routing.Course.List.path)}>모든 강좌</Nav.Link>
              {(session.isSignin) && <Nav.Link className="me-3" onClick={() => navigate(Routing.Course.List.ByIdx.path(1))}>수강중인 강좌</Nav.Link>}

              {/* 로그인 유무에 따라 사용자 정보 표출 */}
              {!(session.isSignin) && <Nav.Link onClick={() => navigate(Routing.Signin.path)}>로그인</Nav.Link>}
              {(session.isSignin) && (
                <NavDropdown title={
                  <span>
                    <img className="rounded-circle" alt="" src={sessionUser.data.img} width="30px" />
                    <span className="ms-2 me-0 fw-bold">
                      {sessionUser.data.nickname}
                    </span>
                  </span>
                } id="collasible-nav-dropdown" className="dropdown-menu-end">
                  <NavDropdown.Item onClick={() => navigate(Routing.User.path)}>나의 정보보기</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => { dispatch(setSignout()); navigate(Routing.Root.path) }}>로그아웃</NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
}


export default Header