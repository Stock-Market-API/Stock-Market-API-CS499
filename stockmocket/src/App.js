import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component, useState } from 'react';
import Home from './components/pages/Home';
import Login from './components/Login_and_Register/Login';
import Register from './components/Login_and_Register/Register';
import Aboutus from './components/pages/Aboutus';
import MarketData from './components/pages/MarketData';
import Footer from './components/Footer';
import ProfilePage from './components/pages/ProfilePage';
import Usermarketpage from './components/pages/usermarketpage';
import UserWatchlist from './components/pages/UserWatchlist';
import Options from './components/pages/Options';

const Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'dzk6zpD8cESqwkJrCSFrgeVrajZmYhxHO9LjFfyA';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'U7pYiIC6ngqJM9gx974UsTli8hhnQ9fEG3ypeN6y';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App(props) {
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
             <Route path='/profile' exact component={ProfilePage} />
             <Route path='/usermarketpage' exact component={Usermarketpage} />
             <Route path='/options' exact component={Options} />
            </Switch> 
         <Footer />
      </Router>

    </React.Fragment>
  );
}

export default App;