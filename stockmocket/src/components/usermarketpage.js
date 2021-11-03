import React, { Component, useState } from "react";
import iex from './iexapitoken.js'
import "./usermarketpage.css"

const Parse = require('parse/node');

var key1 = "tsla"
var key = "";
var logo1 = '';
var s = '';
var d, t, d_newtwo, t_newtwo, d_newthree, t_newthree;

const BarStyling = { width: "40rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

class usermarketpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}, logo: [], info: {}, value: 'tsla', balanceDisplay: [], username: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserBalance = this.getUserBalance(this);
        this.getUsername = this.getUsername(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleSell = this.handleSell.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.componentDidMount();
        event.preventDefault();
        console.log(this.state.value);
    }

    async getUserBalance() {
        try {
            const currentUser = await Parse.User.current();
            this.setState({
                balanceDisplay: currentUser.get('balance')
            });
        }

        catch (err) {
            //alert("Please login");
            console.log("not logged in");
        }
    }

    async getUsername() {
        try {
            const currentUser = await Parse.User.current();
            this.setState({
                username: currentUser.get('username')
            });
        }

        catch (err) {
            //alert("Please login");
            console.log("not logged in");
        }
    }

    componentDidMount() {
        key = this.state.value.toString();
        console.log(key)
        const url = `${iex.base_url}/stock/${key}/quote/?&token=${iex.api_token}`
        const urltwo = `${iex.base_url}/stock/${key}/company/?&token=${iex.api_token}`
        const urlthree = `${iex.base_url}/stock/${key}/logo/?&token=${iex.api_token}`

        Promise.all([fetch(url), fetch(urltwo), fetch(urlthree)]).then(([res1, res2, res3]) => {
            return Promise.all([res1.json(), res2.json(), res3.json()])
        })
            .then(([res1, res2, res3]) => {
                logo1 = (res3.url);
                s = logo1.toString();
                console.log(res1)
                console.log(res2)
                this.setState({
                    data: res1,
                    info: res2,
                    logo: res3
                })
            });
    }

    async handleBuy() {
        const shares = prompt('Buy shares'); //Number of shares inputted saved to sharedAmount upon prompt submission
        const price = this.state.data.latestPrice; //Current price
        key = key.toUpperCase(); //Ticker to be saved as all upper case letters only

        console.log("Shares to buy: ", shares);

        try {
            const currentUser = await Parse.User.current();
            var balance = currentUser.get('balance');

            const stockQuery = new Parse.Query('Portfolio')
            stockQuery.equalTo('stockOwner', currentUser);
            stockQuery.equalTo('stockName', key);
            const stockResult = await stockQuery.find();

            console.log("result: ", stockResult);

            //If no Queries are receieved then create a row for it
            if (stockResult.length == 0) {
                var stockObj = new Parse.Object('Portfolio');
                stockObj.set('stockOwner', currentUser);
                stockObj.set('stockName', key);
                stockObj.set('AveragePrice', price);
                stockObj.set('sharesBought', parseInt(shares));

                try {
                    console.log("try now");
                    await stockObj.save();
                    console.log('saving the stock success!')
                } catch (err) {
                    console.log(err.message);
                }
            }

            else if (balance >= price) {
                var lastPrice = 0;
                var lastShares = 0;

                for (let result of stockResult) {
                    var stockObj = result;
                    lastPrice = result.get('AveragePrice');
                    lastShares = result.get('sharesBought');
                }

                var sumStocks = (lastShares * lastPrice) + (price * parseInt(shares));
                var newAveragePrice = Math.floor((sumStocks / (lastShares + parseInt(shares))) * 100) / 100;

                stockObj.set('AveragePrice', newAveragePrice);
                stockObj.set('sharesBought', parseInt(lastShares) + parseInt(shares));

                try {
                    await stockObj.save();
                    console.log('else saving the stock success!');
                } catch (err) {
                    console.log(err.message);
                }


                var newBalance = balance - (price * parseInt(shares));
                currentUser.set('balance', newBalance);
                try {
                    await currentUser.save();
                    console.log('saving user balance success!');
                }
                catch (err) {
                    console.log(err.message);
                }

                console.log("Shares bought: ", shares);

            }

            else {
                alert("Balance too low");
            }
        }

        catch (err) {
            alert("Please log in to buy shares");
        }
    }

    async handleSell() {
        const shares = prompt('Sell shares'); //Number of shares inputted saved to sharedAmount upon prompt submission
        const price = this.state.data.latestPrice; //Current price
        key = key.toUpperCase(); //Ticker to be saved as all upper case letters only

        console.log("Shares to sell: ", parseInt(shares));

        try {
            const currentUser = await Parse.User.current();
            var balance = currentUser.get('balance');

            const stockQuery = new Parse.Query('Portfolio');
            stockQuery.equalTo('stockOwner', currentUser);
            stockQuery.equalTo('stockName', key);
            const stockResult = await stockQuery.find();

            //If no Queries are recieved
            if (stockResult.length == 0) {
                console.log('That stock does not exist');
            }

            else {
                var lastShares = 0;

                for (let result of stockResult) {
                    var stockObj = result;
                    var lastShares = result.get('sharesBought');
                }

                stockObj.set('AveragePrice', stockObj.get('AveragePrice'));
                stockObj.set('sharesBought', (parseInt(lastShares) - parseInt(shares)));

                //delete the object if you sell all of it
                if ((lastShares - parseInt(shares)) <= 0) {
                    try {
                        await stockObj.destroy();
                        //console.log('Deleting the stock success!');
                    } catch (err) {
                        console.log(err.message);
                    }
                }

                else {
                    try {
                        await stockObj.save();
                        console.log('else selling the stock success!');
                    } catch (err) {
                        console.log(err.message);
                    }
                }

                var newBalance = balance + (price * parseInt(shares));
                currentUser.set('balance', newBalance);
                try {
                    await currentUser.save();
                    console.log('saving user balance success!');
                } catch (err) {
                    console.log(err.message);
                }

                console.log("Shares sold: ", shares);
            }

        }

        catch (err) {
            alert("Please log in to sell shares");
        }
    }

    render() {
        return (
            <div className="uncontainer">
                <div className="usergreeting">
                    <h1 className="namedesc"> Hello {this.state.username} </h1>
                    <h1> Current Balance is $ {this.state.balanceDisplay}</h1>
                </div>
                <div className="searchbar">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>


                </div>
                <div className="stockinfodisplay">
                    <div className="stockinfocenter">
                        <div className="stocklogo">
                            <img src={s} />
                        </div>
                        <div className="stockinfo">
                            Company Name: {this.state.data.companyName}
                            <div className="tableinfo">
                                <table class="wp-table">
                                    <tr>
                                        <th className="tablenamestyling">Industry :  <p1 className="companyname">  {this.state.info.industry} </p1></th>
                                        <th className="tablenamestyling">CEO :  <p1 className="companyname"> {this.state.info.CEO} </p1></th>
                                        <th className="tablenamestyling" >Sector : <p1 className="companyname">  {this.state.info.sector} </p1> </th>
                                    </tr>
                                    <tr>
                                        <td className="tablenamestyling">Price  $ <p1 className="numbers"> {this.state.data.latestPrice} </p1> </td>
                                        <td className="tablenamestyling" >High $  <p1 className="numbers">{this.state.data.high} </p1> </td>
                                        <td className="tablenamestyling" >Low $  <p1 className="numbers"> {this.state.data.low} </p1></td>
                                    </tr>
                                    <tr>
                                        <td className="tablenamestyling" >Volume : <p1 className="numbers">{this.state.data.volume} </p1> </td>
                                        <td className="tablenamestyling" > Week-52 High $ <p1 className="numbers">{this.state.data.week52High} </p1> </td>
                                        <td className="tablenamestyling" >Week-52 Low $ <p1 className="numbers">{this.state.data.week52Low} </p1></td>
                                    </tr>
                                    <tr>
                                        <td className="tablenamestyling" > MarketCap : <p1 className="numbers">{this.state.data.marketCap} </p1> </td>
                                        <td className="tablenamestyling"  >  Daily Change  $ <p1 style={{ color: Math.sign(this.state.data.change) == -1 ? "red" : "green" }}>  <p1 className="numbers"> {this.state.data.change} </p1></p1> </td>
                                        <td className="tablenamestyling" >YTD-Change : <p1 style={{ color: Math.sign(this.state.data.ytdChange) == -1 ? "red" : "green" }}> <p1 className="numbers">{this.state.data.ytdChange} % </p1> </p1></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className = "stock-trading">
                            <button className= "stockbtn" onClick={this.handleBuy}> Buy </button> 
                            <button className="stockbtn" onClick={this.handleSell}> Sell </button>
                        </div>
                    </div>
                    <div className="stockdescription">
                        <div className='maxstockdescription'>
                            <h1>"
                    <p1 className="descfont">
                                    {this.state.info.description}

                                </p1>
                   " </h1>
                        </div>

                    </div>
                    <div className="newcycle">
                        <h1> NEW CYCLE UNDERWORKS</h1>
                        <h1>  homas Edward Patrick Brady Jr. is an American football quarterback for the Tampa Bay Buccaneers of the National Football League. He spent his first 20 seasons with the New England Patriots, where he was a central contributor to the franchise's dynasty from 2001 to 201 </h1>
                    </div>
                </div>

            </div>
        )
    }
}
export default usermarketpage;