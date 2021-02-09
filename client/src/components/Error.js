import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Error({message = 'Error, plz try refreshing'}) {
  console.log(message, 'hallo');
  return (
    <div>
      <Alert variant='danger'>{message}</Alert>
    </div>
  );
}

export default Error;
