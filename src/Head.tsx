import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      const email = userData.email || "";

      const nameFromEmail = email.split("@")[0];

      setUserName(nameFromEmail || "Guest");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <Navbar bg={token ? "primary" : "dark"} data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="">
            {token ? "Dashboard" : "smartapp"}
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/tasks" className="nav-link">
                  Tasks
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/logout"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                  <FaUserCircle size={20} /> {userName}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link">
                  Signup
                </Nav.Link>
              </>
            )}
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
