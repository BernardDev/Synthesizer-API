// This component feels pretty big
// I would take a look at this and see if we could make some subcomponents

import "./UrlExplorer.scss";
import "../utility.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Loading from "./messages/Loading";
import Error from "./messages/Error";
import Success from "./messages/Success";
import useRequest from "../hooks/useRequest";

import { AuthContext } from "../context/AuthContext";

const BASE_URL = process.env.REACT_APP_API_URL;
const INITIAL_ROUTE = "/synths";

function UrlExplorer() {
  const [stateAlert, setStateAlert] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { apiKey, setApiKey, saveKey } = useContext(AuthContext);
  const textAreaRef = useRef(null);

  const [urlParams, setUrlParams] = useState({
    route: INITIAL_ROUTE,
    query: "",
    url: buildUrl({ route: INITIAL_ROUTE, query: "" }, apiKey),
  });
  const { route, query, url } = urlParams;
  const { status, message, data } = useRequest(url, isFetching);

  useEffect(() => {
    if (status === "error" || status === "success") {
      setIsFetching(false);
    }
  }, [status]);

  // making a seperate component
  useEffect(() => {
    if (stateAlert === true) {
      window.setTimeout(() => {
        setStateAlert(false);
      }, 4000);
    }
  }, [stateAlert]);

  function handleInput(e) {
    const newParams = { ...urlParams, [e.target.name]: e.target.value };
    setUrlParams({ ...newParams, url: buildUrl(newParams, apiKey) });
  }

  function handleKeyInput(e) {
    setApiKey(e.target.value);
    setUrlParams({ ...urlParams, url: buildUrl(urlParams, e.target.value) });
  }

  function buildUrl(urlParams, key) {
    const { route, query } = urlParams;
    return `${BASE_URL}/api${route}?key=${key}${query}`;
  }

  function handleSuggestion(suggestionParams) {
    const newParams = { ...urlParams, ...suggestionParams };
    setUrlParams({
      ...newParams,
      url: buildUrl(newParams, apiKey),
    });
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess(`URL copied to clipboard: ${urlParams.url} `);
    setStateAlert(true);
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Form.Label>API key</Form.Label>
            </Row>
            <Row>
              <Form.Text className="back text-inputs-urlExplorer">
                Paste your API key in here. We will add this to your URL you can
                use to search our database. It is also possible to store your
                key across sessions.
              </Form.Text>
            </Row>
            <Row>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Paste your API key..."
                  name="storedKey"
                  onChange={handleKeyInput}
                  value={apiKey || ""}
                />
                <Button
                  className=""
                  variant="primary"
                  onClick={() => saveKey(apiKey)}
                >
                  Save
                </Button>
              </InputGroup>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Form.Label htmlFor="inlineFormInputGroup">API Url</Form.Label>
            </Row>
            <Row>
              <Form.Text className="back text-inputs-urlExplorer">
                Build the URL you want to explore with the dedicated fields seen
                below. Hit search to explore it. Do you want to explore the
                routes in browser? Just copy the URL to clipboard and do that
                instead.
              </Form.Text>
            </Row>
            <Row>
              <Form.Control
                ref={textAreaRef}
                type="text"
                value={
                  url === `${BASE_URL}/api` ? `${BASE_URL}/api/synths` : url
                }
                readOnly
              ></Form.Control>
            </Row>
            <Row>
              <Col md={{ offset: 3, span: 3 }}>
                <Button
                  className="btn-block"
                  onClick={() => setIsFetching(true)}
                  disabled={isFetching}
                >
                  Search
                </Button>
              </Col>
              <Col md={{ offset: 0, span: 3 }}>
                <Button className="btn-block" onClick={copyToClipboard}>
                  Clipboard
                </Button>
              </Col>
            </Row>
            <Row className="front row-alert alert-copy">
              <Alert
                show={stateAlert}
                className="alert-success"
                variant="success"
              >
                {copySuccess}
              </Alert>
            </Row>
            <Row>
              <Col className="col-3">
                <Form.Label>Route</Form.Label>
              </Col>
              <Col>
                <Form.Label>Query</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col className="col-3">
                <Form.Control
                  type="text"
                  name="route"
                  placeholder="/synths..."
                  onChange={handleInput}
                  value={route || "/synths"}
                />
              </Col>
              <Col className="">
                <Form.Control
                  type="text"
                  name="query"
                  placeholder="&yearProduced=1980..."
                  onChange={handleInput}
                  value={query}
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-3">
                <Form.Text className="text-inputs-urlExplorer">
                  Try{" "}
                  {
                    <span
                      className="suggestion"
                      onClick={() => handleSuggestion({ route: "/synths" })}
                    >
                      /synths
                    </span>
                  }{" "}
                  or
                  {
                    <span
                      className="suggestion"
                      onClick={() =>
                        handleSuggestion({ query: "", route: "/manufacturers" })
                      }
                    >
                      /manufacturers
                    </span>
                  }
                  . To get a specific use the following format{" "}
                  {
                    <span
                      className="suggestion"
                      onClick={() =>
                        handleSuggestion({ query: "", route: "/synths/1" })
                      }
                    >
                      /synths/1
                    </span>
                  }{" "}
                  or
                  {
                    <span
                      className="suggestion"
                      onClick={() =>
                        handleSuggestion({
                          query: "",
                          route: "/synths/Roland Jupiter-8",
                        })
                      }
                    >
                      /synths/Roland Jupiter-8
                    </span>
                  }
                  .
                </Form.Text>
              </Col>
              <Col>
                <Form.Text className="text-inputs-urlExplorer">
                  You could use{" "}
                  <span
                    className="suggestion"
                    onClick={() =>
                      handleSuggestion({ query: "&yearProduced=1980" })
                    }
                  >
                    &yearProduced=1980
                  </span>{" "}
                  to get synths produced in that year. Or get synths from a
                  manufacturer:{" "}
                  <span
                    className="suggestion"
                    onClick={() =>
                      handleSuggestion({ query: "&manufacturer=Roland" })
                    }
                  >
                    &manufacturer=Roland
                  </span>
                  . You can also change default pagination options{" "}
                  <span
                    className="suggestion"
                    onClick={() =>
                      handleSuggestion({ query: "&limit=20&offset=0" })
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
            {status === "loading" && <Loading message={message} />}
            {status === "error" && <Error message={message} />}
            {status === "success" && <Success message={message} />}
            <Row>
              <Form.Control
                as="textarea"
                id="textareaExample"
                rows="32"
                value={data}
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
