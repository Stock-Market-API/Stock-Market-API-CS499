import Plot from 'react-plotly.js';
import React, {Component, useState} from "react";
import iex from './iexapitoken.js'
import "./usermarketpage.css"
import { Button } from '../Button';
const Parse = require('parse/node');


//var user = "brian";
//var currentbal = parseFloat("1540.547892")

var logo1, newimg_one, newimg_two, newimg_three;
var key1 = "tsla"
var key = "googl";
var logo1 = '';
var s = '';
var d,t , d_newtwo, t_newtwo , d_newthree, t_newthree;

const BarStyling = {width:"40rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

class usermarketpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}, logo: [], info: {}, value: 'tsla', balanceDisplay: [], username: [], news : {} , data4: [],
            news2: {},
            news3: {}, stockChartXValues: [], stockChartYValues: []
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserBalance = this.getUserBalance(this);
        this.getUsername = this.getUsername(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleSell = this.handleSell.bind(this);


    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
  
    handleSubmit(event) {
    this.componentDidMount();
      event.preventDefault();
      console.log(this.state.value);
    }
    fetchStockGraph(){
        key = this.state.value.toString();
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'YAB9H6YWJ71GXX22';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${key}&outputsize=compact&apikey=YAB9H6YWJ71GXX22`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
    
        fetch(API_Call)
          .then(
            function(response) {
              return response.json();
            }
          )
          .then(
            function(data4) {
              console.log(data4);
              console.log('data4');
    
              for (var key in data4['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data4['Time Series (Daily)'][key]['4. close']);
              }
    
              // console.log(stockChartXValuesFunction);
              console.log(stockChartYValuesFunction);
              pointerToThis.setState({
                stockChartXValues: stockChartXValuesFunction,
                stockChartYValues: stockChartYValuesFunction
              });
            }
          )
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
    this.fetchStockGraph();
        const url = `${iex.base_url}/stock/${this.state.value.toString()}/quote/?&token=${iex.api_token}`
        const urltwo = `${iex.base_url}/stock/${this.state.value.toString()}/company/?&token=${iex.api_token}`
        const urlthree = `${iex.base_url}/stock/${this.state.value.toString()}/logo/?&token=${iex.api_token}`
        const urlfour= `${iex.base_url}/stock/${this.state.value.toString()}/news/last/${'4'}/?&token=${iex.api_token}`
        // const urlfive= `${iex.base_url}/time-series/news/${this.state.value.toString()}range=last-week&limit=10/?&token=${iex.api_token}`
        Promise.all([fetch(url), fetch(urltwo) ,fetch(urlthree), fetch(urlfour)])
        .then(([res1, res2, res3,res4]) => { 
            return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]) 
         })
         .then(([res1, res2, res3,res4 ]) => {
            logo1 = (res3.url).toString(); 
            newimg_one = (res4[0].image).toString();
            newimg_two = (res4[1].image).toString();
            newimg_three = (res4[2].image).toString();
            console.log('test1111')
            
 
             t = new Date(res4[0].datetime).toLocaleTimeString("en-US")
             d = new Date(res4[0].datetime).toLocaleDateString("en-US")
           
            t_newtwo  = new Date(res4[1].datetime).toLocaleTimeString("en-US")
             d_newtwo = new Date(res4[1].datetime).toLocaleDateString("en-US")
            
             t_newthree  = new Date(res4[1].datetime).toLocaleTimeString("en-US")
              d_newthree = new Date(res4[1].datetime).toLocaleDateString("en-US")
           this.setState({
               data : res1,
               info : res2,
               logo : res3,
              
               news : res4[0],
               news2 : res4[1],
               news3 : res4[2],
              
           })
         }).catch(error => {
            
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

                } catch (err) {
                    console.log(err.message);
                }
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

                        var newBalance = balance + (price * parseInt(shares));
                        currentUser.set('balance', newBalance);
                        try {
                            await currentUser.save();
                            console.log('saving user balance success!');
                        } catch (err) {
                            console.log(err.message);
                        }

                        console.log("Shares sold: ", shares);

                    } catch (err) {
                        console.log(err.message);
                    }
                }

            }

        }

        catch (err) {
            alert("Please log in to sell shares");
        }
    }

render() {
    return(
        <div className="uncontainer">
            <div className ="usergreeting">
                <h1 className = "namedesc"> Hello {this.state.username} </h1>
                <h1> Current Balance is $ {this.state.balanceDisplay}</h1>
            </div> 
            <div className="searchbar">
            <form onSubmit={this.handleSubmit}>
          <label>
          <input className="barrr" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className="subbbb" type="submit" value="Submit" />
        </form>
          
            
            </div>
           <div className="stockinfodisplay">
                <div className="stockinfocenter">
                <div className="stocklogo">
                        <img src={logo1} />
                </div>
                <div className="stockinfo">
                    Company Name: {this.state.data.companyName}
                   <div className="tableinfo">
                   <table class="wp-table">
                         <tr>
                    <th className = "tablenamestyling">Industry :  <p1 className ="companyname">  {this.state.info.industry} </p1></th>
                         <th className = "tablenamestyling">CEO :  <p1 className ="companyname"> {this.state.info.CEO} </p1></th>
                        <th className = "tablenamestyling" >Sector : <p1 className ="companyname">  {this.state.info.sector} </p1> </th>
                        </tr>
                     <tr>
                 <td className = "tablenamestyling">Price  $ <p1 className ="numbers"> {this.state.data.latestPrice} </p1> </td>
                <td className = "tablenamestyling" >High $  <p1 className ="numbers">{this.state.data.high} </p1> </td>
                    <td className = "tablenamestyling" >Low $  <p1 className ="numbers"> {this.state.data.low} </p1></td>
                </tr>
                 <tr>
                     <td className = "tablenamestyling" >Volume : <p1 className ="numbers">{this.state.data.volume} </p1> </td>
                      <td className = "tablenamestyling" > Week-52 High $ <p1 className ="numbers">{this.state.data.week52High} </p1> </td>
                    <td className = "tablenamestyling" >Week-52 Low $ <p1 className ="numbers">{this.state.data.week52Low} </p1></td>
                 </tr>
                     <tr>
                 <td className = "tablenamestyling" > MarketCap : <p1 className ="numbers">{this.state.data.marketCap} </p1> </td>
                 <td className = "tablenamestyling"  >  Daily Change  $ <p1  style= {{color: Math.sign(this.state.data.change) == -1 ? "red" : "green"}}>  <p1 className ="numbers"> {this.state.data.change} </p1></p1> </td>
                    <td className = "tablenamestyling" >YTD-Change : <p1  style= {{color: Math.sign(this.state.data.ytdChange) == -1 ? "red" : "green"}}> <p1 className ="numbers">{this.state.data.ytdChange} % </p1> </p1></td>
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
                <div className ='maxstockdescription'> 
                <h1>"
                    <p1 className ="descfont">  
                        {this.state.info.description}
                        
                    </p1>
                   " </h1>
                 
                    </div>
                    <div className="stockGraph">
                <Plot
                    data={[
                        {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                }
        ]}
                        layout={{width: 1150, height: 440, title: `${this.state.data.companyName}`, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent'}}
      />

                </div>
                </div>
                <div className = "newcycle">
                    <div className ="threeboxes">
            <div className ="boxone">
                <h1 className ="newheader"> {this.state.news.headline} </h1>
                <p1> {t+ "  " + d} </p1>
                <p1> {" "} Source : {this.state.news.source} </p1> <br/>
                <img className = "imagebox" src={newimg_one} /> 
                <div className ="summary">  {this.state.news.summary} </div>
                
            </div>
            <div className ="boxtwo">
            <h1  className ="newheader" >{this.state.news2.headline}</h1>
                <p1>{  t_newtwo + "  " +   d_newtwo }</p1>
                <p1> {" "} Source: {this.state.news2.source} </p1> <br/>
                <div> <img className = "imagebox" src={newimg_two} />  </div>
                <div className ="summary">  {this.state.news2.summary} </div>
            </div>
            <div className ="boxthree">
            <h1  className ="newheader"> {this.state.news3.headline} </h1>
                <p1>{  t_newthree + "  " +  d_newthree}</p1>
                <p1> {" "} Source : {this.state.news3.source} </p1> <br/>
                <div className="testimg"> <img className = "imagebox" src={newimg_three} /> </div>
                <div className ="summary">  {this.state.news3.summary} </div>
            </div>
                    </div>
                  
                        </div>
           </div>
           
        </div>
    )
}
}
export default usermarketpage;