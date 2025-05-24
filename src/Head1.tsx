import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <strong>Tasks</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/dashboard" className="nav-link">
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/logout" className="nav-link">
              Logout
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/signup" className="nav-link">
              Signup
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
