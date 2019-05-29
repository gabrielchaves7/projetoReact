import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {BrowserRouter as Router, Route , Link } from "react-router-dom";
import Home from './Home.js';
import AutorBox from './Autor.js';
import LivroBox from './Livro.js';

class App extends Component {

  render() {    
    return (
      <Router>
        <div id="layout">                
          <a href="#menu" id="menuLink" className="menu-link"><span></span></a>
            <div id="menu">
              <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Company</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><Link to="/">Home</Link></li>
                    <li className="pure-menu-item"><Link to="/autor/">Autor</Link></li>
                    <li className="pure-menu-item"><Link to="/livro/">Livro</Link></li>                      
                </ul>
              </div>
            </div>

            <div id="main">
              <div className="content" id="content">
                <Route exact path="/" component={Home}/>
                <Route path="/autor/" component={AutorBox}/>
                <Route path="/livro/" component={LivroBox}/>
              </div>
            </div>
        </div> 
      </Router>          
    );
  }
}

export default App;
