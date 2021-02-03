import './UrlExplorer.scss';
import React from 'react';
import {Form, Col, InputGroup, Button, FormControl} from 'react-bootstrap';
import exampleJson from '../exampleJson.json';

let jsonParsed = JSON.stringify(exampleJson, null, 4);

// console.log('jsonParsed', jsonParsed);

// render: function() {
//     var json = this.getStateFromFlux().json;
//     return (
//       <div>
//         <JsonSubmitter onSubmit={this.onSubmit} />
//         { JSON.stringify(json, null, 2) }
//       </div>
//     );
//   },

function UrlExplorer() {
  return (
    <>
      <p>
        There will be text here explaining a tiny bit about the API. And also
        explaining what you can and can't do with the API eplorer below
      </p>
      <Form>
        <Form.Row className='groupURLexample d-flex justify-content-center align-items-center'>
          <Col xs='auto column1'>
            <Form.Label htmlFor='inlineFormInputGroup' srOnly>
              Username
            </Form.Label>
            <InputGroup className='d-flex align-items-center'>
              <InputGroup.Prepend>
                <InputGroup.Text className='staticURLexample'>
                  https://synthesizer-api.herokuapp.com/api/
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id='inputURLexample' placeholder='synths' />
            </InputGroup>
          </Col>
          <Col xs='auto column2'>
            <Button type='submit' className='submitUrl'>
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <Form>
        <Form.Group
          controlId='exampleForm.ControlTextarea1'
          className='resJSON'
        >
          <Form.Label></Form.Label>
          <Form.Control
            as='textarea'
            className='textareaExample'
            rows={8}
            value={jsonParsed}
            readOnly
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default UrlExplorer;
