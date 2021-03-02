import './PopUp.scss';

import React, {useState, useContext} from 'react';
import Toast from 'react-bootstrap/Toast';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function PopUp() {
  const authInfo = useContext(AuthContext);

  const [toastToggle, setToastToggle] = useState(true);
  const toggleShowToast = () => setToastToggle(!toastToggle);

  return (
    <div>
      {authInfo.apiKey ? (
        ''
      ) : (
        <Toast className='' show={toastToggle} onClose={toggleShowToast}>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded mr-2'
              alt=''
            />
            <strong className='mr-auto'>Do you not have a API key yet?</strong>
          </Toast.Header>

          <Toast.Body>
            Get your API key sent to you at{' '}
            <NavLink to='/Authorization'>authorization</NavLink>
          </Toast.Body>
        </Toast>
      )}
    </div>
  );
}

export default PopUp;
