import './Navigation.scss';
import '../utility.scss';

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';
import logo from '../images/909.png';

function Navigation() {
  return (
    <div className='navigation-bg'>
      <div className='wrapper'>
        <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
          <Navbar.Brand as={NavLink} to='/' exact>
            <img
              alt=''
              src={logo}
              width='40'
              height='40'
              className='d-inline-block align-center'
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={NavLink} to='/' exact>
                Home
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
      </div>
    </div>
  );
}

export default Navigation;
