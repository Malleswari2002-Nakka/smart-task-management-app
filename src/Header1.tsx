import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <h1>
              <strong>Admin Dashboard</strong>
            </h1>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {/* {/* <Nav.Link as={Link} to="/tasks" className="nav-link">
              Tasks
            </Nav.Link> */}
            <Nav.Link as={Link} to="/register" className="nav-link">
              create users
            </Nav.Link>
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
