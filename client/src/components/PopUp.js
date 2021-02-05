import './PopUp.scss';
import React, {useState} from 'react';
import {Toast} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function PopUp() {
  const [toastToggle, setToastToggle] = useState(true);
  const toggleShowToast = () => setToastToggle(!toastToggle);

  return (
    <Toast className='' show={toastToggle} onClose={toggleShowToast}>
      <Toast.Header>
        <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
        <strong className='mr-auto'>Do you not have a API key yet?</strong>
      </Toast.Header>

      <Toast.Body>
        Get your API key sent to you at{' '}
        <NavLink to='/Authorization'>authorization</NavLink>
      </Toast.Body>
    </Toast>
  );
}

export default PopUp;
