import './Navigation.scss';
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
      <Navbar.Brand as={NavLink} to='/' exact>
        Synthesizer API logo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link as={NavLink} to='/About'>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to='/Documentation'>
            Documentation
          </Nav.Link>
          <Nav.Link as={NavLink} to='/Authorization'>
            Authorization
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
