import React, { useState, useEffect } from 'react'
import TransactionTable from './TransactionHistoryComponents/TransactionTable';
import TransactionHistoryFilters from './TransactionHistoryComponents/TransactionHistoryFilters';
const Parse = require('parse/node');

const TransactionHistoryPage = () => {
    const [tHistory, setTHistory] = useState([]);
    const [fullTHistory, setFullTHistory] = useState([]);

    useEffect(() => { 
      const getTHistory = async () => {
          const data = await fetchTHistory()
          setTHistory(data)
          setFullTHistory(data)
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


    const FilterTHistory = (filterDeposit, filterWithdraw, filterBuy, filterSell, filterStock, stockText) => {

      var newHistory = []
    
      if((filterDeposit && filterWithdraw && filterBuy && filterSell) 
      || (!filterDeposit && !filterWithdraw && !filterBuy && !filterSell &&!filterStock)){
        setTHistory(fullTHistory)
      }
  
      else{
  
        if(filterDeposit){
          newHistory = [...newHistory, ...fullTHistory.filter((transaction) => transaction.orderType ===  "Deposit")]
        }
  
        if(filterWithdraw){
          newHistory = [...newHistory, ...fullTHistory.filter((transaction) => transaction.orderType ===  "Withdrawl")]
        }
  
        if(filterBuy){
          newHistory = [...newHistory, ...fullTHistory.filter((transaction) => transaction.buySell ===  "Buy")]
        }
  
        if(filterSell){
          newHistory = [...newHistory, ...fullTHistory.filter((transaction) => transaction.buySell ===  "Sell")]
        }
        
        if(filterStock){
          if(filterBuy || filterSell){
            newHistory = newHistory.filter((transaction) => transaction.Security === stockText.toUpperCase())
          }
          else{
            newHistory = fullTHistory.filter((transaction) => transaction.Security === stockText.toUpperCase())
          }
        }

        setTHistory(newHistory)
      }

    }
  
  
  
    return (
      <div className="profile-container">
          <h1>Transaction History</h1>
          <TransactionHistoryFilters onFilter = {FilterTHistory}/>
          {tHistory.length > 0 ? <TransactionTable tHistory = {tHistory}/> : "No History To Show"}
      </div>
    );
}

  
export default TransactionHistoryPage
