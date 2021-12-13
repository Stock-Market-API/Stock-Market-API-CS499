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
import Options from './components/pages/Options';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';
import RedditPage from './components/pages/RedditPage';

const Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'dVAtpphyTkgy21u2aW8Z05uynBQk1jgHwZgGh7Ma';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'NsPwPQHboezOraPomemoflQtu6oHDHSUZOZyN9cM';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App(props) {
    return (
      <React.Fragment>
      <Router basename={process.env.PUBLIC_URL}>
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
             <Route path='/history' exact component={TransactionHistoryPage} />
             <Route path='/reddit' exact component={RedditPage} />
            </Switch> 
         <Footer />
      </Router>

    </React.Fragment>
  );
}

export default App;