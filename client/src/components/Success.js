import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Success({message = 'View the JSON below!'}) {
  return (
    <div>
      <Alert variant='success'>{message}</Alert>
    </div>
  );
}

export default Success;
