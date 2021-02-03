import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Documentation from './pages/Documentation';
import Authorization from './pages/Authorization';
import LayerJumbotron from './pages/backgroundLayers/LayerJumbotron';
import Col from 'react-bootstrap/Col';

import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <Container fluid>
          <Switch>
            <Route path='/' exact>
              <Col md={{span: 8, offset: 2}}>
                <LayerJumbotron />
                <Home />
              </Col>
            </Route>
            <Route path='/About' component={About} />
            <Route path='/Documentation' component={Documentation} />
            <Route path='/Authorization' component={Authorization} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;

// Nalink active variant bootstrap?
// Nesting create components inside bootstrap components and vise versa?
// overwriting using bootstrap classes not working? full with for pop-up, justify content for nav link items...
