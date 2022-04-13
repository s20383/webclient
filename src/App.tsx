import { useDarkModeManager } from "./hooks/useDarkMode";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./components/content/auth/Login";
import Register from "./components/content/auth/Register";
import ForgotPassword from "./components/content/auth/ForgotPassword";
import { CookieConsent } from "./components/CookieConsent";

import { handleLogout } from "./helpers/authHelper";

export default function App() {
  const darkMode = useDarkModeManager();

  return (
    <BrowserRouter>
      <Navbar bg={`custom-${darkMode.isDark ? "dark" : "light"}`} variant={darkMode.isDark ? "dark" : "light"} expand="lg">
        <Container>
          <Navbar.Brand>GARY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Strona tymczasowa</Nav.Link>
            <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
            <Nav.Link as={Link} to="/register">Rejestracja</Nav.Link>
            <Nav.Link onClick={handleLogout}>Wyloguj</Nav.Link>
            <Nav.Link onClick={darkMode.toggle}>Zmień motyw</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/iforgor" element={<ForgotPassword />} />
      </Routes>
      <CookieConsent debug />
    </BrowserRouter>
  );
}
