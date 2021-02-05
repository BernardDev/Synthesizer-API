import './UrlExplorer.scss';
import React, {useState, useEffect, useRef} from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

function UrlExplorer() {
  // const [stateAlert, setStateAlert] = useState('visible');
  const [stateAlert, setStateAlert] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const [data, setData] = useState();
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
      let jsonParsed = JSON.stringify(response.data, null, 4);
      setData(jsonParsed);
    } catch (error) {
      console.log('ERROR', error.response);
    }
  };

  // event handlers on link
  // setRoute toggle /synths /manufacturers
  // setQuery toggle add/(remove)
  // setQuery = query + linkQuery

  function handleSuggestion(suggestionParams) {
    const newParams = {...urlParams, ...suggestionParams};
    setUrlParams({
      ...newParams,
      url: buildUrl(newParams),
    });

    // handleInput(e.target.value);
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(`${urlParams.url} copied to clipboard`);
    setStateAlert(true);
  }

  useEffect(() => {
    if (stateAlert === true) {
      window.setTimeout(() => {
        setStateAlert(false);
      }, 2000);
    }
  }, [stateAlert]);

  console.log('stateAlert', stateAlert);

  function onShowAlert() {}

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
                <Button className='btn-block' onClick={fetchData}>
                  Search
                </Button>
                {/* <button type="button" className="btn btn-primary" onClick={()=>{this.onShowAlert()}} >show Alert</button> */}
                {/* <Alert color='info' isOpen={this.state.visible}>
                I am an alert and I will disappear in 2sec.!
              </Alert> */}
              </Col>
              {/* <Col md={{offset: 2, span: 2}}> */}
              <Col md={{offset: 0, span: 3}}>
                <Button className='btn-block' onClick={copyToClipboard}>
                  Clipboard
                </Button>
                {/* </Col> */}
              </Col>
            </Row>
            <Row className='row-alert'>
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
                  Try /synth or /manufacturers.
                  {
                    <span
                      className='suggestion'
                      onClick={() =>
                        handleSuggestion({query: '', route: '/synths/1'})
                      }
                    >
                      /synths/1
                    </span>
                  }
                </Form.Text>
              </Col>
              <Col>
                <Form.Text className='text-inputs-urlExplorer'>
                  You could use{' '}
                  {
                    <span
                      className='suggestion'
                      onClick={() =>
                        handleSuggestion({query: '&yearProduced=1980'})
                      }
                    >
                      &yearProduced=1980
                    </span>
                  }
                  ,
                  <span
                    className='suggestion'
                    onClick={() =>
                      handleSuggestion({query: '&manufacturer=Roland'})
                    }
                  >
                    &manufacturer=Roland
                  </span>
                  , &limit=20, &offset=0 . Chain the queries with '&'. For more
                  exploration read the doc's! 'polyphony',
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>JSON</Form.Label>
            <Form.Text className='text-inputs-urlExplorer'>
              Conside exploring the JSON LINK in browser LINK to.
            </Form.Text>
            <Form.Control
              as='textarea'
              className='textareaExample'
              rows={8}
              value={data}
              readOnly
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default UrlExplorer;
