import React, { useState, useEffect, Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './navbar.jsx';
import Home from './Home/HomeMain.jsx';
import About from './About/AboutMain.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='routes'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App
