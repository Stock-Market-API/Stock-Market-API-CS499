import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import Home from './components/pages/Home';
import Login from './components/pages/Login_and_Register/Login'
import Register from './components/pages/Login_and_Register/Register'


function App() {
  return (
      <React.Fragment>
      <Router>
      <Navbar />
      <Switch>
             <Route path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />

      </Switch>
      </Router>

    </React.Fragment>
  );
}

export default App;