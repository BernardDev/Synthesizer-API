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
  const [storedKey, setStoredKey] = useState(
    localStorage.getItem('apiKey') ?? ''
  );
  const [route, setRoute] = useState('');
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`${BASE_URL}/api`);
  const [data, setData] = useState({});

  function handleStoreKey(e) {
    handleInput(setStoredKey, e.target.value, route, e.target.value, query);
  }

  function handleRoute(e) {
    handleInput(setRoute, e.target.value, e.target.value, storedKey, query);
  }

  function handleQuery(e) {
    handleInput(setQuery, e.target.value, route, storedKey, e.target.value);
  }

  function handleInput(setter, valueToUpdate, route, storedKey, query) {
    setter(valueToUpdate);
    setUrl(`${BASE_URL}/api${route}?key=${storedKey}${query}`);
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
