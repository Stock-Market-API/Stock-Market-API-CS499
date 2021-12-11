import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from '../GlobalState.js';
import iex from './iexapitoken.js'
import './MockData.css';

const Parse = require('parse/node');

function OptionsRow(props) {
    const [data, setData] = useState([]);
    const [optionsSold, setOptionsSold] = useGlobalState('optionsSold');

    //Used for options calculations
    var time;
    var epocmonth = 2629743;
    var epocday = 86400;

    //Fetch API data 
    useEffect(() => {
        var t, d, latestime;
        const url = `${iex.base_url}/stock/${props.ticker}/quote/?&token=${iex.api_token}`
        fetch(url).then((Response) => Response.json()).then((data) => {
            latestime = (data.latestUpdate)
            t = new Date(latestime).toLocaleTimeString("en-US")
            d = new Date(latestime).toLocaleDateString("en-US")
            setData(data);
        })
    }, []);

    /**
     * ************************************************************
     * OPTIONS CALCULATIONS
     **************************************************************
     **/

    
    function outofthemoney(time_, amount) {
        var t = time_ / 30;
        if (time < .2) {
            return amount;
        }
        else {
            return parseFloat(amount * (Math.E ** (-1.386294 * time_)));
        }

    }
    function inthemoney(time_, amount) {
        var t, p;
        t = time_ / 30;
        p = amount * t;
        if (time_ > 30) {
            return 0;
        }
        return parseFloat(amount - p);


    }
    function atthemoney(time_, amount) {
        var amount;

        if (time_ == 1 || time_ == 2 || time_ == 3) {
            return amount;

        } else if (time_ == 30) {
            return 0;
        } else if (time_ > 3 && time_ <= 7) {
            return parseFloat(amount * (Math.E ** (-	0.421442062631 * (time_ / 30))));
        } else if (time_ > 7 && time_ <= 15) {
            return parseFloat(amount * (Math.E ** (-	0.621442062631 * (time_ / 30))));
        } else if (time_ > 15 && time_ <= 23) {
            return parseFloat(amount * (Math.E ** (-1.60517018599 * (time_ / 30))));
        } else if (time_ > 23 && time_ <= 29) {
            return parseFloat(amount * (Math.E ** (-2.60517018599 * (time_ / 30))));
        }
    }

    function decayone(time_) {
        return ((-3.9) * Math.sin((time_ - 2.2) / 1.4) - 2.9)
    }

    function gettimeremain(time_) {
        var time = Date.now();
        time = (time_ + epocmonth) - time;
        time = time / epocday;
        return Math.ceil(30 - time);
    }

    function optionprice(strikeprice) {
        return Math.round((strikeprice) * .10);
    }

    function optionpricecalc(stockprice, strikeprice) {
        return (strikeprice - stockprice) * 100;
    }

    /********************************************************* */

    async function sellCall() {
        var expiretime = 1640127561;
        var temtime = 1639177161;
        var tempprice = 1137.06;
        var initoptionprice = 137;
        var x = expiretime - temtime;
        var t = x / epocday;
        const timedecay = (decayone(t / 30));
        const optionprice = optionpricecalc(data.latestPrice, props.strikePrice);

        const message = window.confirm("Sell " + props.ticker + " " + props.option + " with strike price of $" + props.strikePrice + "?");

        if (message) {
            try {
                const currentUser = await Parse.User.current();
                var balance = parseFloat(currentUser.get('balance'));
                console.log("original balance", balance);
                const stockQuery = new Parse.Query('Options');

                //Get clicked option's database data
                stockQuery.equalTo('stockOwner', currentUser);
                stockQuery.equalTo('stockName', props.ticker);
                stockQuery.equalTo('initialOptionPrice', props.optionPrice);
                stockQuery.equalTo('strikePrice', props.strikePrice);
                stockQuery.equalTo('callOrPut', "Call");

                const stockResult = await stockQuery.find();

                if (stockResult.length == 0) {
                    console.log("Option doesn't exist")
                }
                else {
                    //Gets the stock with the selected stock's expiration date

                    //This operation is performed rather than the above "equalTo" functions
                    //because props.expireDate is a string, whereas the expireDate in
                    //Parse's database is an object
                    for (let result in stockResult) {
                        if (String(stockResult[result].get('expireDate')) == props.expireDate) {
                            var stockObj = stockResult[result];
                        }
                    }

                    try {
                        var newBalance;

                        //In, At, or Out of the money check
                        if (data.latestPrice > props.optionPrice) { //in the money when stockprice is higher than strike
                            console.log("In the money  " + inthemoney(t / 30, optionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + inthemoney(t / 30, optionprice) * timedecay;
                            console.log("balance", newBalance);

                        }
                        else if
                            ((data.latestPrice < props.optionPrice + 1) && (data.latestPrice > props.optionPrice - 1)) {
                            console.log('At The Money ' + atthemoney(t, initoptionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + atthemoney(t, initoptionprice) * timedecay;
                            console.log("balance", newBalance);
                        }
                        else if (data.latestPrice < props.optionPrice) {
                            console.log("Out of the Money " + outofthemoney(t, optionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + outofthemoney(t, optionprice) * timedecay;
                            console.log("balance", newBalance);
                        }

                        else {
                            newBalance = parseFloat(currentUser.get('balance'));
                        }

                        console.log("old balance", parseFloat(currentUser.get('balance')));

                        try {
                            stockObj.destroy();
                            console.log('destroying the stock success!');

                            try {
                                console.log("saving new balance");
                                currentUser.save();
                                setOptionsSold(!optionsSold);
                            }
                            catch (err) {
                                console.log("Could not save sell option");
                            }
                        } catch (err) {
                            console.log(err.message);
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }
            catch (err) {
                console.log("Error selling call option");
            }
        }

        else {
            return 0;
        }
    }

    async function sellPut() {
        var expiretime = 1640127561;
        var temtime = 1639177161;
        var tempprice = 1137.06;
        var initoptionprice = 137;
        var x = expiretime - temtime;
        var t = x / epocday;
        const timedecay = (decayone(t / 30));
        const optionprice = optionpricecalc(data.latestPrice, props.strikePrice);

        const message = window.confirm("Sell " + props.ticker + " " + props.option + " with strike price of $" + props.strikePrice + "?");

        if (message) {
            try {
                const currentUser = await Parse.User.current();
                var balance = parseFloat(currentUser.get('balance'));
                console.log("original balance", balance);
                const stockQuery = new Parse.Query('Options');

                //Get clicked option's database data
                stockQuery.equalTo('stockOwner', currentUser);
                stockQuery.equalTo('stockName', props.ticker);
                stockQuery.equalTo('initialOptionPrice', props.optionPrice);
                stockQuery.equalTo('strikePrice', props.strikePrice);
                stockQuery.equalTo('callOrPut', "Put");

                const stockResult = await stockQuery.find();

                if (stockResult.length == 0) {
                    console.log("Option doesn't exist")
                }
                else {
                    //Gets the stock with the selected stock's expiration date

                    //This operation is performed rather than the above "equalTo" functions
                    //because props.expireDate is a string, whereas the expireDate in
                    //Parse's database is an object
                    for (let result in stockResult) {
                        if (String(stockResult[result].get('expireDate')) == props.expireDate) {
                            var stockObj = stockResult[result];
                        }
                    }

                    try {
                        var newBalance;

                        //In, At, or Out of the money check
                        if (data.latestPrice > props.optionPrice) { //in the money when stockprice is higher than strike
                            console.log("In the money  " + inthemoney(t / 30, optionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + inthemoney(t / 30, optionprice) * timedecay;
                            currentUser.set('balance', parseFloat(newBalance));
                        }
                        else if ((data.latestPrice < props.optionPrice + 1) && (data.latestPrice > props.optionPrice - 1)) {
                            console.log('At The Money ' + atthemoney(t, initoptionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + atthemoney(t, initoptionprice) * timedecay;
                            currentUser.set('balance', parseFloat(newBalance));
                            console.log("balance", newBalance);
                        }
                        else if (data.latestPrice < props.optionPrice) {
                            console.log("Out of the Money " + outofthemoney(t, optionprice) * timedecay);
                            newBalance = parseFloat(currentUser.get('balance')) + outofthemoney(t, optionprice) * timedecay;
                            currentUser.set('balance', parseFloat(newBalance));
                            console.log("balance", newBalance);
                        }
                        console.log("old balance", parseFloat(currentUser.get('balance')));
                       
                        try {
                            stockObj.destroy();
                            console.log('destroying the stock success!');

                            try {
                                console.log("saving new balance");
                                setOptionsSold(!optionsSold);
                                currentUser.save();
                            }
                            catch (err) {
                                console.log("Could not save sell option");
                            }
                        } catch (err) {
                            console.log(err.message);
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }
            catch (err) {
                console.log("Error selling call option");
            }
        }
    }

    //Prompt to sell the selected option on row click
    function handleClick() {
        if (props.option == "Call") {sellCall();}
        else if (props.option == "Put") {sellPut();}
        else {return 0;}
    }
    
    return (
        <tr className="tabledesign">
            <td onDoubleClick={() => { handleClick() }} >
                <Link to={{
                    pathname: '/usermarketpage',
                    state: { value: props.ticker }
                }} className="cellcolor"> {props.ticker} </Link>
            </td>
            <td onClick={() => { handleClick() }} className="numbers" > ${props.optionPrice} </td>
            <td onClick={() => { handleClick() }} className="numbers"> ${props.strikePrice} </td>
            <td onClick={() => { handleClick() }} className="numbers" > {props.option} </td>
            <td onClick={() => { handleClick() }} className="numbers"> {props.expireDate} </td>

        </tr>
    )

}

export default OptionsRow;
