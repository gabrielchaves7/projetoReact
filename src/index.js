import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
  (<Router>    
      <Switch>
        <Route path="/" exact component={App}/> 
      </Switch>    
  </Router>),
  document.getElementById('root')
);