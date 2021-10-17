import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import Home from './components/pages/Home';
import Login from './components/Login_and_Register/Login'
import Register from './components/Login_and_Register/Register'
import Aboutus from './components/pages/Aboutus'
import MarketData from './components/pages/MarketData'
import Footer from './components/Footer';
import Usermarketpage from './components/pages/usermarketpage';
const Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'PkKseo3f5GALlC6FbYTPof2xofIOOOqxsfeIJ2Lx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '2FokkUXZSKpMu65pSht3JHfeaGUKcwmbg4E5ISJ3';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
      <React.Fragment>
      <Router>
      <Navbar />
      <Switch>
             <Route path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />
             <Route path='/aboutus' exact component={Aboutus} />
             <Route path='/market' exact component={MarketData} />
             <Route path='/usermarketpage' exact component={Usermarketpage} />
      </Switch>
      <Footer />
      </Router>

    </React.Fragment>
  );
}

export default App;