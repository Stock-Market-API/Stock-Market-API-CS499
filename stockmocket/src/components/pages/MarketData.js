import React, { Component } from 'react';
import Mock_Data from './Mock_Data.js';
import './MockData.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import iex from './iexapitoken.js'
import StockRow from "./StockRow.js"

const changeStyle = { 
    color: 'blue',
}
  
function getData(){
    const url = `${iex.base_url}/stock/${'googl'}/peers/?&token=${iex.api_token}`

    fetch(url).then((Response) => Response.json()).then((data) => {
        console.log(data)
        this.setState({
           data: data
        })
    })
}

function MarketData(){
  

    getData("")

    return (
     <div>
         <div className= "container">  
         <div className = "safe">   <h1> Investing in Safe Stocks & Low Volatility Stocks </h1>   </div>
           
             <div className= "para"> While we all might love the idea of investing in stocks risk-free, there's no such thing as a stock that's 100% safe.
                  Even the best companies can face unexpected trouble, and it's common for even the most stable corporations to experience 
                  significant stock price volatility. We've seen this during the COVID-19 pandemic, during which many strong companies have
                   experienced dramatic drops in stock price. If you want a completely safe investment with little chance you'll lose money, 
                   Treasury securities or CDs may be your best bet. That said, some stocks are significantly safer than others. 
                   If a company is in good financial shape, has pricing power over its rivals, and sells products that people buy even during 
                   deep recessions, it’s likely a relatively safe investment.  By Matthew Frankel  </div>
        
         <div className = "titledesign">  <h1> Our Top 20 Recommended Stocks </h1></div>
         
         <table className ="table">
        <thead>
            <tr className = "chartdesign">
               
                <th className = "publicsans"> TICKER </th>
                <th className = "publicsans"> NAME</th>
                <th className = "publicsans"> PRICE </th>
                <th className = "publicsans"> OPEN </th>
                <th className = "publicsans"> CLOSE</th>
                <th className = "publicsans"> % CHANGE</th>
                <th className = "publicsans"> LAST UPDATE </th>
                
              
            </tr>
        </thead>
        <tbody className = "tabledesign">
            
            < StockRow  ticker = "AMZN" />
            <StockRow ticker = "GOOG" />
            <StockRow ticker = "TSLA" />
            <StockRow ticker = "MA" />
            <StockRow ticker = "DIS" />
            <StockRow ticker = "MSFT" />
            <StockRow ticker = "SPOT" />
            <StockRow ticker = "NFLX" />
            <StockRow ticker = "NKE" />
            <StockRow ticker = "FB" />
            <StockRow ticker = "UNH" />
            <StockRow ticker = "SPY" />
            <StockRow ticker = "VOO" />
            <StockRow ticker = "NVDA" />
            <StockRow ticker = "BAC" />
            <StockRow ticker = "XOM" />
       
        </tbody>

         </table>
         
         
         </div>
         <div className= "margins"> </div>
     </div>
   
    );

}
export default MarketData
