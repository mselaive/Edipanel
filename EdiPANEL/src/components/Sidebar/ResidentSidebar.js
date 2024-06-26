/* Barra cuando se usa en modo tablet o celular */
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {routes2, routes_admin, routes3} from '../../routes.js';
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const ResidentSidebar = (props) => {
  const { t, i18n } = useTranslation("global");
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)


  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    
    // Borra el token del almacenamiento local
    localStorage.removeItem('token');
    
    // Redirige al usuario a /auth
    navigate('/auth');
  };


  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar


  const createLinks2 = (routes3) => {
    return routes3.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} />
            {t(prop.name)}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: "/residentpanel",
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: "/residentpanel",
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem onClick={() => {
                    const currentLanguage = i18n.language;
                    if (currentLanguage === 'en') {
                        i18n.changeLanguage('es');
                    } else {
                        i18n.changeLanguage('en');
                    }
                }}>{t("navbar.lenguage")}</DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{t("sidebar.message")}</h6>
              </DropdownItem>
              <DropdownItem href="#pablo" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>{t("sidebar.logout")}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">{t('sidebar.residentpanel')}</h6> 

          <hr className="my-3" />

          {/* Navigation */}
          <Nav navbar>{createLinks2(routes3)}</Nav>
          
        </Collapse>
      </Container>
    </Navbar>
  );
};

ResidentSidebar.defaultProps = {
  routes: [{}],
};

ResidentSidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default ResidentSidebar;
