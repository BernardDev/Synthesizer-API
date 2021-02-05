import './Header.scss';
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

function Header() {
  return (
    <Jumbotron>
      <h1 className='title display-linebreak'>
        {'The RESTful Synthesizer API'}
      </h1>
      <p className='slogan'>
        Connecting you to your synth needs. Get data from over{' '}
        {<span>800 </span>}synthesizers!
      </p>
    </Jumbotron>
  );
}

export default Header;
