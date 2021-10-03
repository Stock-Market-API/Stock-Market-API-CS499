import React, { Component } from 'react';
import Mock_Data from './Mock_Data.js';
import './MockData.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
         <div className = "titledesign">  <h1> Our Top 20 Recommended Stocks </h1></div>
         <table className ="table table-striped">
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
     </div>
    );

}
export default MarketData
