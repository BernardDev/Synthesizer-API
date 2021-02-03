import './UrlExplorer.scss';
import React, {useState, useEffect} from 'react';
import {Form, Col, InputGroup, Button, FormControl} from 'react-bootstrap';
import exampleJson from '../exampleJson.json';
import axios from 'axios';

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

const baseUrl = process.env.REACT_APP_API_URL;
console.log('process.env', process.env);

// synths?key=

const key = 'BV0B0QX-X8Y4JEK-GYZRXSZ-7NKSKP6';

function UrlExplorer() {
  const [data, setData] = useState({hits: []});
  const [url, setUrl] = useState('bla');

  console.log('url', url);

  // console.log('data', data);

  // change it to read from the input field instead of hardcoded path
  // useEffect(() => {
  const fetchData = async () => {
    console.log('ÚRL', url);
    try {
      const response = await axios.get(`${baseUrl}/api/${url}?key=${key}`);
      console.log('RESPONSE:', response);
      setData(response.data);
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  // fetchData();
  // }, [url]);
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
              <FormControl
                id='inputURLexample'
                placeholder='synths'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs='auto column2'>
            <Button className='submitUrl' onClick={fetchData}>
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
