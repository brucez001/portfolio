import React from "react";

import "./Navbar.scss";
import { images } from "../../constants";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavbarComp = () => {
    return (
        // <nav className='app__navbar'>
        //     <div className='app__navbar-logo'>
        //         <img src={images.logo} alt="logo" />
        //     </div>
        //     <ul className='app__navbar-links'>
        //         {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
        //             <li className='app__flex p-text' key={`link-${item}`}>
        //                 <a href={`#${item}`}>{item}</a>
        //             </li>
        //         ))}
        //     </ul>
        //     {/* <div className="app__navbar-menu">

        //     </div> */}

        // </nav>

        <Navbar className="app__navbar" sticky="top" expand="lg">
            
                <Navbar.Brand href="#home" className="app__navbar-logo">
                    <img src={images.logo} alt="logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"  className='app__navbar-links'>
                    <Nav>
                        <Nav.Link className="nav-link" href="#home">
                            Home
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#about">
                            About
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#skills">
                            Skills
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#projects">
                            Projects
                        </Nav.Link>
                        <Nav.Link className="nav-link" href="#contact">
                            Contact
                        </Nav.Link>
                        <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                English
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Chinese
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
           
        </Navbar>
    );
};

export default NavbarComp;
