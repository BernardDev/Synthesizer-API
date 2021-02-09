import './UrlExplorer.scss';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from './Success';
import useRequest from '../hooks/useRequest';

const BASE_URL = process.env.REACT_APP_API_URL;

function UrlExplorer() {
  const keyStore = useContext(AuthContext);
  // const [stateAlert, setStateAlert] = useState('visible');
  const [stateAlert, setStateAlert] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const [urlParams, setUrlParams] = useState({
    storedKey: localStorage.getItem('apiKey') ?? '',
    route: '',
    query: '',
    url: `${BASE_URL}/api`,
  });

  const [isFetching, setIsFetching] = useState(false);

  const {status, code, message, data} = useRequest(urlParams.url, isFetching);

  console.log('status', status);

  const {storedKey, route, query, url} = urlParams;

  useEffect(() => {
    if (status === 'error' || status === 'success') {
      setIsFetching(false);
    }
  }, [status]);

  // function handleFetch(urlParams) {
  //   const {status, code, message, data} = useRequest({urlParams});
  // }

  function buildUrl(urlParams) {
    const {route, storedKey, query} = urlParams;
    return `${BASE_URL}/api${route}?key=${storedKey}${query}`;
  }

  function handleInput(e) {
    const newParams = {...urlParams, [e.target.name]: e.target.value};
    // here
    // console.log('just input', e.target.value);
    // setApiKey(e.target.value);
    setUrlParams({...newParams, url: buildUrl(newParams)});
  }

  // console.log('url', url);

  function handleStoreKeySave(e) {
    e.preventDefault();
    // console.log('just input', e.target.value);
    keyStore.setApiKey(storedKey);
    // localStorage.setItem('apiKey', storedKey);
  }

  function handleSuggestion(suggestionParams) {
    const newParams = {...urlParams, ...suggestionParams};
    setUrlParams({
      ...newParams,
      url: buildUrl(newParams),
    });
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(`URL copied to clipboard: ${urlParams.url} `);
    setStateAlert(true);
  }

  useEffect(() => {
    if (stateAlert === true) {
      window.setTimeout(() => {
        setStateAlert(false);
      }, 4000);
    }
  }, [stateAlert]);

  console.log('data', data);

  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Form.Label>API key</Form.Label>
            </Row>
            <Row>
              <Form.Text className='text-inputs-urlExplorer'>
                Paste your API key in here. We will add this to your URL to
                search our database. It is also possible to save your key!
              </Form.Text>
            </Row>
            <Row>
              <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='Paste your API key...'
                  name='storedKey'
                  onChange={handleInput}
                  value={storedKey}
                />
                <Button
                  className=''
                  variant='primary'
                  onClick={handleStoreKeySave}
                >
                  Save
                </Button>
              </InputGroup>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Form.Label htmlFor='inlineFormInputGroup'>API Url</Form.Label>
            </Row>
            <Row>
              <Form.Text className='text-inputs-urlExplorer'>
                Build the URL you want to explore with the dedicated fields seen
                below and hit search to explore it. Want to explore the routes
                in browser? Just copy the URL to clipboard and do that instead.
              </Form.Text>
            </Row>
            <Row>
              <Form.Control
                ref={textAreaRef}
                type='text'
                value={url}
                readOnly
              ></Form.Control>
            </Row>
            <Row>
              <Col md={{offset: 3, span: 3}}>
                <Button
                  className='btn-block'
                  onClick={() => setIsFetching(true)}
                  disabled={isFetching}
                >
                  Search
                </Button>
              </Col>
              <Col md={{offset: 0, span: 3}}>
                <Button className='btn-block' onClick={copyToClipboard}>
                  Clipboard
                </Button>
              </Col>
            </Row>
            <Row className='row-alert alert-copy'>
              <Alert
                show={stateAlert}
                className='alert-success'
                variant='success'
              >
                {copySuccess}
              </Alert>
            </Row>
            <Row>
              <Col className='col-3'>
                <Form.Label>Route</Form.Label>
              </Col>
              <Col>
                <Form.Label>Query</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col className='col-3'>
                <Form.Control
                  type='text'
                  name='route'
                  placeholder='/synths...'
                  onChange={handleInput}
                  value={route}
                />
              </Col>
              <Col className=''>
                <Form.Control
                  type='text'
                  name='query'
                  placeholder='&yearProduced=1980...'
                  onChange={handleInput}
                  value={query}
                />
              </Col>
            </Row>
            <Row>
              <Col className='col-3'>
                <Form.Text className='text-inputs-urlExplorer'>
                  Try{' '}
                  {
                    <span
                      className='suggestion'
                      onClick={() => handleSuggestion({route: '/synths'})}
                    >
                      /synths
                    </span>
                  }{' '}
                  or
                  {
                    <span
                      className='suggestion'
                      onClick={() =>
                        handleSuggestion({query: '', route: '/manufacturers'})
                      }
                    >
                      /manufacturers
                    </span>
                  }
                  . To get a specific use the following format{' '}
                  {
                    <span
                      className='suggestion'
                      onClick={() =>
                        handleSuggestion({query: '', route: '/synths/1'})
                      }
                    >
                      /synths/1
                    </span>
                  }{' '}
                  or
                  {
                    <span
                      className='suggestion'
                      onClick={() =>
                        handleSuggestion({
                          query: '',
                          route: '/synths/Jupiter-8',
                        })
                      }
                    >
                      /synths/Jupiter-8
                    </span>
                  }
                  .
                </Form.Text>
              </Col>
              <Col>
                <Form.Text className='text-inputs-urlExplorer'>
                  You could use{' '}
                  <span
                    className='suggestion'
                    onClick={() =>
                      handleSuggestion({query: '&yearProduced=1980'})
                    }
                  >
                    &yearProduced=1980
                  </span>{' '}
                  to get synths produced in that year. Or get synths from a
                  manufacturer:{' '}
                  <span
                    className='suggestion'
                    onClick={() =>
                      handleSuggestion({query: '&manufacturer=Roland'})
                    }
                  >
                    &manufacturer=Roland
                  </span>
                  . You can also change default pagination options{' '}
                  <span
                    className='suggestion'
                    onClick={() =>
                      handleSuggestion({query: '&limit=20&offset=0'})
                    }
                  >
                    &limit=20&offset=0
                  </span>
                  . Chain queries together with '&'. For more API exploration,
                  read the doc's!
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>JSON</Form.Label>
            <Form.Text className='text-inputs-urlExplorer'>
              Consider exploring the JSON LINK in browser LINK to.
            </Form.Text>
            {status === 'loading' && <Loading message={message} />}
            {status === 'error' && <Error message={message} />}
            {status === 'success' && <Success message={message} />}
            <Row>
              <Form.Control
                as='textarea'
                id='textareaExample'
                rows='32'
                value={data != null || undefined ? data : message}
                readOnly
              />
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default UrlExplorer;
