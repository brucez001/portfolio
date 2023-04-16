import React from "react";

import "./Navbar.scss";
import { images } from "../../constants";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavbarComp = () => {

    
    return (


        <Navbar collapseOnSelect className="app__navbar" sticky="top" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className="app__navbar-logo">
                    <img src={images.logo} alt="logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav"  className='app__navbar-links'>
                    <Nav>
                        <Nav.Link className="nav-link active-link" href="#home">
                            Home
                            <div className="underline"></div>
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#about">
                            About
                            <div className="underline"></div>
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#skills">
                            Skills
                            <div className="underline"></div>
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#projects">
                            Projects
                            <div className="underline"></div>
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#contact">
                            Contact
                            <div className="underline"></div>
                        </Nav.Link>
                        {/* <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                English
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Chinese
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    );
};

export default NavbarComp;
