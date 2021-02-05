import './UrlExplorer.scss';
import React, {useState} from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import exampleJson from '../exampleJson.json';
import axios from 'axios';

let jsonParsed = JSON.stringify(exampleJson, null, 4);

const BASE_URL = process.env.REACT_APP_API_URL;

function UrlExplorer() {
  const [data, setData] = useState({});
  const [urlParams, setUrlParams] = useState({
    storedKey: localStorage.getItem('apiKey') ?? '',
    route: '',
    query: '',
    url: `${BASE_URL}/api`,
  });
  const {storedKey, route, query, url} = urlParams;

  function buildUrl(urlParams) {
    const {route, storedKey, query} = urlParams;
    return `${BASE_URL}/api${route}?key=${storedKey}${query}`;
  }

  function handleInput(e) {
    const newParams = {...urlParams, [e.target.name]: e.target.value};
    setUrlParams({...newParams, url: buildUrl(newParams)});
  }

  console.log('url', url);

  function handleStoreKeySave(e) {
    e.preventDefault();
    localStorage.setItem('apiKey', storedKey);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}`);
      console.log('RESPONSE:', response);
      setData(response.data);
    } catch (error) {
      console.log('ERROR', error.response);
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Your API key:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Paste your API key...'
            name='storedKey'
            onChange={handleInput}
            value={storedKey}
          />
          <Button
            className='btn-block'
            variant='primary'
            onClick={handleStoreKeySave}
          >
            Save
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='inlineFormInputGroup' srOnly>
            API Url
          </Form.Label>
          <Form.Control type='text' value={url} readOnly></Form.Control>
          <Button className='submitUrl btn-block' onClick={fetchData}>
            Submit
          </Button>
        </Form.Group>
        <Form.Group>
          <Col>
            <Form.Label>Route</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type='text'
              name='route'
              placeholder='/synths...'
              onChange={handleInput}
              value={route}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Col>
            <Form.Label>Query</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type='text'
              name='query'
              placeholder='yearProduced=1980...'
              onChange={handleInput}
              value={query}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>JSON</Form.Label>
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
