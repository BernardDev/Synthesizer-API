import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Loading({message = 'Loading'}) {
  return (
    <div>
      <Alert variant='warning'>{message}</Alert>
    </div>
  );
}

export default Loading;
