import "./App.scss";

import React from "react";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Authorization from "./pages/Authorization";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            {/* This is the preffered format for routes */}
            <Route path="/" exact>
              <Home />
            </Route>
            {/* Avoid uppercase in urls, maybe change rooute to the format above */}
            {/* Since docs are not implemented yet, removing this route for now */}
            <Route path="/Documentation" component={Documentation} />
            <Route path="/Authorization" component={Authorization} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
