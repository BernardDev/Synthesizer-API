import './Header.scss';
import React from 'react';
import {Jumbotron} from 'react-bootstrap';

function Header() {
  return (
    <Jumbotron>
      <div className='header-img'>
        <h1 className='title'>Hello, world!</h1>
        <p className='slogan'>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
      </div>
    </Jumbotron>
  );
}

export default Header;
