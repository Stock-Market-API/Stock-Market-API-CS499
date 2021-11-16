import React, { useState, useEffect } from 'react'
import TransactionTable from './TransactionTable';
const Parse = require('parse/node');

const TransactionHistoryPage = () => {
    const [tHistory, setTHistory] = useState([]);

    useEffect(() => { 
      const getTHistory = async () => {
          const data = await fetchTHistory()
          setTHistory(data)
      }
      getTHistory()
    }, [])
  
    const fetchTHistory = async() =>{
  
      var retArr = []
  

      const Owner = await Parse.User.current();
    
      //Get all stocks owned by user
      const historyQuery = new Parse.Query('Order');
      historyQuery.equalTo('account', Owner);
      let queryResults = await historyQuery.find();
    
      for (let result of queryResults) {
    
      const tDate = result.get("transDate").toString()
      const tAmount = result.get("amount")
      const tSecurity = result.get("ticker")
      var tprice = result.get("price")
      
    
      const is_Stock = result.get('isStockOperation');
      const eff = result.get('isOpenPos');
    
      var orderType = ""
      var tEffect = ""
      var buySell = ""
    
    
      if(is_Stock){
        orderType = "Stock"
        if(eff)
          tEffect = "Open"
        else
          tEffect = "Close"
      }
      else if(eff){
        orderType = "Deposit"
        tprice = ""
      }
      else if(!eff){
        orderType = "Withdrawl"
        tprice = ""
      }
      else{
        orderType = "---"
        tEffect = "---"
      }
    
      if(orderType === "Stock"){
        if(result.get("isBuy"))
          buySell = "Buy"
       else
         buySell = "Sell"
      }
  
    
    
      // console.log(tDate)
      // console.log(tAmount)
      // console.log(tSecurity)
      // console.log(tprice)
      // console.log(orderType)
      // console.log(tEffect)
      // console.log(buySell)
  
      const transaction = {
        date: tDate,
        orderType: orderType,
        buySell: buySell,
        Effect: tEffect,
        Security: tSecurity,
        Amount: tAmount,
        Price: tprice
      }
      
      retArr.push(transaction)
  
    }
  
      return retArr
    
    }
  
  
  
    return (
      <div className="profile-container">
          <h1>Transaction History</h1>
          <TransactionTable tHistory = {tHistory}/>
      </div>
    );
}

  
export default TransactionHistoryPage
