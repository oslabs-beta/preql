import React, { useState, useEffect, Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './navbar';
import HomeMain from './Home/HomeMain';
import About from './About/AboutMain';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='routes'>
        <Switch>
          <Route exact path="/">
            <HomeMain />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
