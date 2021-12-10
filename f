warning: LF will be replaced by CRLF in stockmocket/src/components/pages/MockData.css.
The file will have its original line endings in your working directory
[1mdiff --git a/stockmocket/package.json b/stockmocket/package.json[m
[1mindex e126097..7477fa7 100644[m
[1m--- a/stockmocket/package.json[m
[1m+++ b/stockmocket/package.json[m
[36m@@ -12,6 +12,7 @@[m
     "react-dom": "^17.0.2",[m
     "react-plotly.js": "^2.5.1",[m
     "react-router-dom": "^5.3.0",[m
[32m+[m[32m    "react-hooks-global-state": "^1.0.2",[m
     "react-scripts": "4.0.3",[m
     "tailwindcss": "^2.2.15",[m
     "web-vitals": "^1.1.2"[m
[1mdiff --git a/stockmocket/src/App.js b/stockmocket/src/App.js[m
[1mindex a1d47cc..573c2bd 100644[m
[1m--- a/stockmocket/src/App.js[m
[1m+++ b/stockmocket/src/App.js[m
[36m@@ -1,16 +1,18 @@[m
 import './App.css';[m
 import Navbar from './components/Navbar';[m
 import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";[m
[31m-import React, { Component } from 'react';[m
[32m+[m[32mimport React, { Component, useState } from 'react';[m
 import Home from './components/pages/Home';[m
[31m-import Login from './components/Login_and_Register/Login'[m
[31m-import Register from './components/Login_and_Register/Register'[m
[31m-import Aboutus from './components/pages/Aboutus'[m
[31m-import MarketData from './components/pages/MarketData'[m
[32m+[m[32mimport Login from './components/Login_and_Register/Login';[m
[32m+[m[32mimport Register from './components/Login_and_Register/Register';[m
[32m+[m[32mimport Aboutus from './components/pages/Aboutus';[m
[32m+[m[32mimport MarketData from './components/pages/MarketData';[m
 import Footer from './components/Footer';[m
[32m+[m[32mimport ProfilePage from './components/pages/ProfilePage';[m
 import Usermarketpage from './components/pages/usermarketpage';[m
[31m-import ProfilePage from './components/pages/ProfilePage'[m
[31m-import TransactionHistoryPage from './components/pages/TransactionHistoryPage';[m
[32m+[m[32mimport UserWatchlist from './components/pages/UserWatchlist';[m
[32m+[m[32mimport Options from './components/pages/Options';[m
[32m+[m
 const Parse = require('parse/node');[m
 const PARSE_APPLICATION_ID = 'dzk6zpD8cESqwkJrCSFrgeVrajZmYhxHO9LjFfyA';[m
 const PARSE_HOST_URL = 'https://parseapi.back4app.com/';[m
[36m@@ -18,26 +20,26 @@[m [mconst PARSE_JAVASCRIPT_KEY = 'U7pYiIC6ngqJM9gx974UsTli8hhnQ9fEG3ypeN6y';[m
 Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);[m
 Parse.serverURL = PARSE_HOST_URL;[m
 [m
[31m-function App() {[m
[31m-  return ([m
[32m+[m[32mfunction App(props) {[m
[32m+[m[32m    return ([m
       <React.Fragment>[m
       <Router>[m
[31m-      <Navbar />[m
[31m-      <Switch>[m
[32m+[m[32m         <Navbar />[m
[32m+[m[32m           <Switch>[m
              <Route path='/' exact component={Home} />[m
              <Route path='/login' exact component={Login} />[m
              <Route path='/register' exact component={Register} />[m
              <Route path='/aboutus' exact component={Aboutus} />[m
              <Route path='/market' exact component={MarketData} />[m
[31m-             <Route path='/usermarketpage' exact component={Usermarketpage} />[m
              <Route path='/profile' exact component={ProfilePage} />[m
[31m-             <Route path='/history' exact component={TransactionHistoryPage}/>[m
[31m-      </Switch>[m
[31m-      <Footer />[m
[32m+[m[32m             <Route path='/usermarketpage' exact component={Usermarketpage} />[m
[32m+[m[32m             <Route path='/options' exact component={Options} />[m
[32m+[m[32m            </Switch>[m[41m [m
[32m+[m[32m         <Footer />[m
       </Router>[m
 [m
     </React.Fragment>[m
   );[m
 }[m
 [m
[31m-export default App;[m
[32m+[m[32mexport default App;[m
\ No newline at end of file[m
[1mdiff --git a/stockmocket/src/components/Navbar.js b/stockmocket/src/components/Navbar.js[m
[1mindex ea280cc..5d34352 100644[m
[1m--- a/stockmocket/src/components/Navbar.js[m
[1m+++ b/stockmocket/src/components/Navbar.js[m
[36m@@ -94,44 +94,30 @@[m [mfunction Navbar(props) {[m
                 className='nav-links'[m
                 onClick={closeMobileMenu}[m
             >[m
[31m-                <i class="far fa-user-circle profileIcon"></i>  [m
[32m+[m[32m                Profile[m
                             </Link>;[m
         }[m
     }[m
 [m
[31m-    function historyDisplay(loggedIn) {[m
[32m+[m[32m    function dashboard() {[m
[32m+[m[32m        return <li className='nav-item'> <Link[m
[32m+[m[32m            to='/dashboard'[m
[32m+[m[32m            className='nav-links'[m
[32m+[m[32m            onClick={closeMobileMenu}[m
[32m+[m[32m        >[m
[32m+[m[32m            <i class="far fa-user-circle profileIcon"></i>[m[41m  [m
[32m+[m[32m        </Link>[m
[32m+[m[32m        </li>[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    function dashboardDisplay(loggedIn) {[m
         if (!loggedIn) {[m
             return null;[m
         } else {[m
[31m-            return <Link[m
[31m-                to='/history'[m
[31m-                className='nav-links'[m
[31m-                onClick={closeMobileMenu}[m
[31m-            >[m
[31m-                History[m
[31m-            </Link>;[m
[32m+[m[32m            return dashboard();[m
         }[m
     }[m
 [m
[31m-    // function dashboard() {[m
[31m-    //     return <li className='nav-item'> <Link[m
[31m-    //         to='/dashboard'[m
[31m-    //         className='nav-links'[m
[31m-    //         onClick={closeMobileMenu}[m
[31m-    //     >[m
[31m-    //         <i class="far fa-user-circle profileIcon"></i>  [m
[31m-    //     </Link>[m
[31m-    //     </li>[m
[31m-    // }[m
[31m-[m
[31m-    // function dashboardDisplay(loggedIn) {[m
[31m-    //     if (!loggedIn) {[m
[31m-    //         return null;[m
[31m-    //     } else {[m
[31m-    //         return dashboard();[m
[31m-    //     }[m
[31m-    // }[m
[31m-[m
     function marketDirect(loggedIn) {[m
         if (!loggedIn) {[m
             return <Link[m
[36m@@ -153,23 +139,17 @@[m [mfunction Navbar(props) {[m
         }[m
     }[m
 [m
[31m-    function marketDirect(loggedIn) {[m
[32m+[m[32m    function optionsDisplay(loggedIn) {[m
         if (!loggedIn) {[m
[31m-            return <Link[m
[31m-                to='/market'[m
[31m-                className='nav-links'[m
[31m-                onClick={closeMobileMenu}[m
[31m-            >[m
[31m-                Market[m
[31m-            </Link>[m
[32m+[m[32m            return null[m
 [m
         } else {[m
             return <Link[m
[31m-                to='/usermarketpage'[m
[32m+[m[32m                to='/options'[m
                 className='nav-links'[m
                 onClick={closeMobileMenu}[m
             >[m
[31m-                Market[m
[32m+[m[32m                Options[m
             </Link>[m
         }[m
     }[m
[36m@@ -190,9 +170,8 @@[m [mfunction Navbar(props) {[m
                             {profileDisplay(loggedIn)}[m
                         </u1>[m
                         <li className='nav-item'>[m
[31m-                            {historyDisplay(loggedIn)}[m
[32m+[m[32m                            {optionsDisplay(loggedIn)}[m
                         </li>[m
[31m-[m
                         <li className='nav-item'>[m
                             {marketDirect(loggedIn)}[m
                         </li>[m
[36m@@ -205,6 +184,9 @@[m [mfunction Navbar(props) {[m
                                 AboutUs[m
                             </Link>[m
                         </li>[m
[32m+[m[32m                    <u1 id="para">[m
[32m+[m[32m                        {dashboardDisplay(loggedIn)}[m
[32m+[m[32m                    </u1>[m
                     </ul>[m
                     <u1 id="para">[m
                         {loginDisplay(loggedIn)}[m
[1mdiff --git a/stockmocket/src/components/pages/MockData.css b/stockmocket/src/components/pages/MockData.css[m
[1mindex 09eda2d..45e433b 100644[m
[1m--- a/stockmocket/src/components/pages/MockData.css[m
[1m+++ b/stockmocket/src/components/pages/MockData.css[m
[36m@@ -148,4 +148,8 @@[m
     text-align: left;[m
     background-color: Blue;[m
     color: white;[m
[31m-  }[m
\ No newline at end of file[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m.options-container{[m
[32m+[m[32m    margin-bottom: 256px;[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/stockmocket/src/components/pages/UserStockRow.js b/stockmocket/src/components/pages/UserStockRow.js[m
[1mindex cd8afa3..cfcbdae 100644[m
[1m--- a/stockmocket/src/components/pages/UserStockRow.js[m
[1m+++ b/stockmocket/src/components/pages/UserStockRow.js[m
[36m@@ -1,4 +1,4 @@[m
[31m-import React, { Component} from "react";[m
[32m+[m[32mimport React, { Component } from "react";[m
 import { Link } from "react-router-dom";[m
 import iex from './iexapitoken.js';[m
 import "./UserStockRow.css";[m
[1mdiff --git a/stockmocket/src/components/pages/usermarketpage.js b/stockmocket/src/components/pages/usermarketpage.js[m
[1mindex 5bb263f..30c0e5d 100644[m
[1m--- a/stockmocket/src/components/pages/usermarketpage.js[m
[1m+++ b/stockmocket/src/components/pages/usermarketpage.js[m
[36m@@ -32,6 +32,8 @@[m [mclass usermarketpage extends Component{[m
         this.addToWatchlist = this.addToWatchlist.bind(this);[m
         this.removeFromWatchlist = this.removeFromWatchlist.bind(this);[m
         this.isStockWatchlisted = this.isStockWatchlisted.bind(this);[m
[32m+[m[32m        this.buyCallOption = this.buyCallOption.bind(this);[m
[32m+[m[32m        this.buyPutOption = this.buyPutOption.bind(this);[m
 [m
 [m
     }[m
[36m@@ -118,6 +120,9 @@[m [mcomponentDidMount() {[m
     //If page was accessed by clicking a table ticker symbol,[m
     //loads the clicked ticker's data[m
     else {[m
[32m+[m[32m        this.setState({[m
[32m+[m[32m            value: this.props.location.state.value[m
[32m+[m[32m        });[m
         key = this.props.location.state.value.toString();[m
     }[m
         const url = `${iex.base_url}/stock/${key}/quote/?&token=${iex.api_token}`[m
[36m@@ -376,6 +381,138 @@[m [mcomponentDidMount() {[m
             alert("Please log in to sell shares");[m
         }[m
     }[m
[32m+[m
[32m+[m[32m    //Buy call option[m
[32m+[m[32m    async buyCallOption() {[m
[32m+[m[32m        const strikeprice = prompt('Enter strikeprice');[m
[32m+[m[32m        this.optionprice(strikeprice, this.state.data.latestPrice);[m
[32m+[m[32m        //const priceOfoption = prompt('Option Price = ' + this.optionprice(strikeprice));[m
[32m+[m[32m        alert('Option Price bought at ' + this.optionprice(strikeprice));[m
[32m+[m[32m        const time = Date.now();[m
[32m+[m[32m        const expire = time + epocmonth;[m
[32m+[m[32m        alert("Buy Date = " + new Date(time).toLocaleDateString("en-US") + " Date Expire = " + new Date(expire).toLocaleDateString("en-US"));[m
[32m+[m
[32m+[m[32m        key = key.toUpperCase();[m
[32m+[m
[32m+[m[32m        try {[m
[32m+[m[32m            const currentUser = await Parse.User.current();[m
[32m+[m
[32m+[m[32m            const stockQuery = new Parse.Query('Options')[m
[32m+[m[32m            stockQuery.equalTo('stockOwner', currentUser);[m
[32m+[m[32m            stockQuery.equalTo('stockName', key);[m
[32m+[m[32m            stockQuery.equalTo('expireDate', expire);[m
[32m+[m[32m            const stockResult = await stockQuery.find();[m
[32m+[m
[32m+[m[32m            //If no Queries are receieved then create a row for it[m
[32m+[m[32m            if (stockResult.length == 0) {[m
[32m+[m[32m                var stockObj = new Parse.Object('Options');[m
[32m+[m[32m                stockObj.set('stockOwner', currentUser);[m
[32m+[m[32m                stockObj.set('stockName', key);[m
[32m+[m[32m                stockObj.set('strikePrice', parseFloat(strikeprice));[m
[32m+[m[32m                stockObj.set('initialOptionPrice', this.optionprice(strikeprice));[m
[32m+[m[32m                stockObj.set('expireDate', new Date(expire));[m
[32m+[m[32m                stockObj.set('callOrPut', "Call");[m
[32m+[m
[32m+[m[32m                try {[m
[32m+[m[32m                    console.log("try now");[m
[32m+[m[32m                    stockObj.save();[m
[32m+[m[32m                    console.log('saving the stock success!')[m
[32m+[m
[32m+[m[32m                    var newBalance = parseFloat(currentUser.get('balance')) - strikeprice * 100;[m
[32m+[m[32m                    currentUser.set('balance', parseFloat(newBalance));[m
[32m+[m
[32m+[m[32m                    this.setState({[m
[32m+[m[32m                        value: newBalance[m
[32m+[m[32m                    });[m
[32m+[m
[32m+[m[32m                    try {[m
[32m+[m[32m                        currentUser.save();[m
[32m+[m[32m                    }[m
[32m+[m[32m                    catch (err) {[m
[32m+[m[32m                        console.log("Could not save bought call option");[m
[32m+[m[32m                    }[m
[32m+[m
[32m+[m[32m                } catch (err) {[m
[32m+[m[32m                    console.log(err.message);[m
[32m+[m[32m                }[m
[32m+[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            else {[m
[32m+[m[32m                console.log("Option exists")[m
[32m+[m[32m            }[m
[32m+[m[32m            console.log("result: ", stockResult);[m
[32m+[m[32m        }[m
[32m+[m[32m        catch (err) {[m
[32m+[m[32m            console.log("Error buying call option");[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    //Buy put option[m
[32m+[m[32m    async buyPutOption() {[m
[32m+[m[32m        const strikeprice = prompt('Enter strikeprice');[m
[32m+[m[32m        this.optionprice(strikeprice, this.state.data.latestPrice);[m
[32m+[m[32m        //const priceOfoption = prompt('Option Price = ' + this.optionprice(strikeprice)); //price of the option the user brought[m
[32m+[m[32m        alert('Option Price bought at ' + this.optionprice(strikeprice));[m
[32m+[m[32m        const time = Date.now();[m
[32m+[m[32m        const expire = time + epocmonth; // this is when the option expires.[m[41m [m
[32m+[m[32m        alert("Buy Date = " + new Date(time).toLocaleDateString("en-US") + " Date Expire = " + new Date(expire).toLocaleDateString("en-US"));[m
[32m+[m
[32m+[m[32m        key = key.toUpperCase();[m
[32m+[m
[32m+[m[32m        try {[m
[32m+[m[32m            const currentUser = await Parse.User.current();[m
[32m+[m
[32m+[m[32m            const stockQuery = new Parse.Query('Options')[m
[32m+[m[32m            stockQuery.equalTo('stockOwner', currentUser);[m
[32m+[m[32m            stockQuery.equalTo('stockName', key);[m
[32m+[m[32m            stockQuery.equalTo('expireDate', expire);[m
[32m+[m[32m            const stockResult = await stockQuery.find();[m
[32m+[m
[32m+[m[32m            //If no Queries are receieved then create a row for it[m
[32m+[m[32m            if (stockResult.length == 0) {[m
[32m+[m[32m                var stockObj = new Parse.Object('Options');[m
[32m+[m[32m                stockObj.set('stockOwner', currentUser);[m
[32m+[m[32m                stockObj.set('stockName', key);[m
[32m+[m[32m                stockObj.set('strikePrice', parseFloat(strikeprice));[m
[32m+[m[32m                stockObj.set('initialOptionPrice', this.optionprice(strikeprice));[m
[32m+[m[32m                stockObj.set('expireDate', new Date(expire));[m
[32m+[m[32m                stockObj.set('callOrPut', "Put");[m
[32m+[m
[32m+[m[32m                try {[m
[32m+[m[32m                    console.log("try now");[m
[32m+[m[32m                    stockObj.save();[m
[32m+[m[32m                    console.log('saving the stock success!')[m
[32m+[m
[32m+[m[32m                    var newBalance = currentUser.get('balance') - strikeprice * 100;[m
[32m+[m[32m                    currentUser.set('balance', parseFloat(newBalance));[m
[32m+[m
[32m+[m[32m                    this.setState({[m
[32m+[m[32m                        value: newBalance[m
[32m+[m[32m                    })[m
[32m+[m
[32m+[m[32m                    try {[m
[32m+[m[32m                        currentUser.save();[m
[32m+[m[32m                    }[m
[32m+[m[32m                    catch (err) {[m
[32m+[m[32m                        console.log("Could not save bought put option");[m
[32m+[m[32m                    }[m
[32m+[m[32m                } catch (err) {[m
[32m+[m[32m                    console.log(err.message);[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            else {[m
[32m+[m[32m                console.log("Option exists")[m
[32m+[m[32m            }[m
[32m+[m
[32m+[m[32m            console.log("result: ", stockResult);[m
[32m+[m[32m        }[m
[32m+[m[32m        catch (err) {[m
[32m+[m[32m            console.log("Error buying put option");[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m    }[m
     [m
     async addToWatchlist() {[m
         key = key.toUpperCase(); //Ticker to be saved as all upper case letters only[m
[36m@@ -595,6 +732,8 @@[m [mrender() {[m
                 <div className = "stock-trading">[m
                      <button className= "stockbtn" onClick={this.handleBuy}> Buy </button> [m
                      <button className="stockbtn" onClick={this.handleSell}> Sell </button>[m
[32m+[m[32m                     <button className="stockbtn" onClick={this.buyCallOption}> Call Option </button>[m
[32m+[m[32m                     <button className="stockbtn" onClick={this.buyPutOption}> Put Option </button>[m
                 </div>[m
                 <div>[m
                      {this.state.watchlisted ?[m
