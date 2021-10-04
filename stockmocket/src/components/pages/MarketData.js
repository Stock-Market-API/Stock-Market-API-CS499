import React from 'react'
import Mock_Data from './Mock_Data.js'
import './MockData.css'
function MarketData(){
    return (
        <div className="listing">
               <div className = "stocktitle">   <h1> Top 25 Most Popular Stocks </h1>  </div>
               <div className = "chartticker">   <h1> Ticker </h1>    <div className = "chartnames">   <h1> Name </h1>  
                </div>  <div className = "chartprice">   <h1> Price </h1>  
                </div>  <div className = "chartopening">   <h1> Opening  </h1>  
                </div>  <div className = "chartclosing">   <h1> Closing  </h1>  
                </div> <div className ="chartdailychange"> <h1> Changes </h1></div>
                <div className ="chartgraph"> <h1> Chart? </h1></div>
                </div>
              
                
              
            {Mock_Data.map(stock => {
                return(
                
                <div className ="stockview"> 
                
                    <div className="stockticker"> 
                    <p1>  {stock.ticker}</p1>
                            </div> 
                            <div className = "stockname"> 
                            <p1>  {stock.name} </p1>
                            
                            </div>
                            <div className ="stockprice">
                            <p1>  $ { (stock.price).toFixed(2)} </p1>
                                </div>
                                <div className ="stockopeningprice">
                            <p1>  $ {stock.opening_price .toFixed(2) } </p1>
                                </div>
                                <div className ="stockclosingprice">
                            <p1>  $ {stock.closing_price .toFixed(2)} </p1>
                                </div>
                                <div className ="stockpercent">
                            <p1>   $ {(stock.closing_price - stock.opening_price).toFixed(2)}</p1>
                                </div>
                                <div className ="stockgraph">
                            <p1>   
                            ╭───────────╯
                                 
                                 </p1>
                                </div>
                   </div>
                  
                )
            })}
        </div>
    );

}
export default MarketData
