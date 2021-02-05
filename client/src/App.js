import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Documentation from './pages/Documentation';
import Authorization from './pages/Authorization';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <Container fluid> */}
        <Navigation />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/About' component={About} />
          <Route path='/Documentation' component={Documentation} />
          <Route path='/Authorization' component={Authorization} />
        </Switch>
        <Footer />
        {/* </Container> */}
      </div>
    </Router>
  );
}

export default App;
