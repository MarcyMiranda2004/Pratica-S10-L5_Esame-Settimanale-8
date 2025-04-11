import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import '../style/style.css';
import '../style/navbar.css';
import logo from '../assets/meteo_logo.png';

const NavbarComponent = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="bg-m-secondary mx-3 p-0 d-flex justify-content-between align-items-center">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="meteo_logo" className="w-100" style={{ height: '100px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbarToggle" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Link
              to="/"
              className={`nav-link text-white fs-5 ${isActive('/') ? 'border-3 border-bottom border-warning' : ''}`}>
              Home
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/service"
              className={`nav-link text-white fs-5 ${isActive('/service') ? 'border-3 border-bottom border-warning' : ''}`}>
              Servizi
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/articles"
              className={`nav-link text-white fs-5 ${isActive('/articles') ? 'border-3 border-bottom border-warning' : ''}`}>
              Articoli
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/community"
              className={`nav-link text-white fs-5 ${isActive('/community') ? 'border-3 border-bottom border-warning' : ''}`}>
              Community
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
