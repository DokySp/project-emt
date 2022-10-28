import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header(): JSX.Element {
  return <>

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>

        <Nav>
          <Container fluid={true}>
            <Link to={"/"} className="navbar-brand">
              <img src="/images/thumnail2.png" alt="" width="30" height="30" className="d-inline-block align-text-top me-2 rounded" />
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
              <NavDropdown.Item href="#action/3.1">수강중인 강좌보기</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">나의 정보</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">로그아웃</NavDropdown.Item>
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


  </>;
}


export default Header