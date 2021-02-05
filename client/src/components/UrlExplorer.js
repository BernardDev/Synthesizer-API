import './UrlExplorer.scss';
import React, {useState, useEffect} from 'react';
import {
  Form,
  Col,
  Row,
  InputGroup,
  Button,
  FormControl,
  Container,
} from 'react-bootstrap';
import exampleJson from '../exampleJson.json';
import axios from 'axios';

let jsonParsed = JSON.stringify(exampleJson, null, 4);

const BASE_URL = process.env.REACT_APP_API_URL;
// console.log('process.env', process.env);

// 'BV0B0QX-X8Y4JEK-GYZRXSZ-7NKSKP6'

function UrlExplorer() {
  const [storedKey, setStoredKey] = useState(localStorage.getItem('apiKey'));
  const [route, setRoute] = useState('');
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`${BASE_URL}/api`);
  const [data, setData] = useState({});

  // console.log('storedKey', storedKey);

  function handleStoreKey(e) {
    e.preventDefault();
    setStoredKey(e.target.value);
    setUrl(`${BASE_URL}/api${route}?key=${e.target.value}${query}`);
  }

  function handleRoute(e) {
    setRoute(e.target.value);
    setUrl(`${BASE_URL}/api${e.target.value}?key=${storedKey}${query}`);
  }

  function handleQuery(e) {
    setQuery(e.target.value);
    setUrl(`${BASE_URL}/api${route}?key=${storedKey}${e.target.value}`);
  }
  console.log('url', url);

  function handleStoreKeySave(e) {
    e.preventDefault();
    localStorage.setItem('apiKey', storedKey);
  }

  // ${BASE_URL}/api${route}?${query}key=${storedKey}

  // api key x
  // route
  // query

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}`);
      console.log('RESPONSE:', response);
      setData(response.data);
    } catch (error) {
      console.log('ERROR', error);
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
            onChange={handleStoreKey}
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
          <Form.Control
            type='text'
            placeholder='Paste your API key...'
            value={url}
            readOnly
          ></Form.Control>
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
              placeholder='/synths...'
              onChange={handleRoute}
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
              placeholder='yearProduced=1980...'
              onChange={handleQuery}
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
