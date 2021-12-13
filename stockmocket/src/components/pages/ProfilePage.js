import React, { useState, useEffect, useCallback } from "react";
import UserStockRow from "./UserStockRow.js"
import iex from './iexapitoken.js'
import TransactionRow from "./TransactionRow.js"
import iexapitoken from "./iexapitoken"
import PortfolioDiversity from "./PortfolioDiversity";
import { Link } from 'react-router-dom';
import UserWatchlist from "./UserWatchlist.js";
import "./ProfilePage.css";

const Parse = require('parse/node');

function ProfilePage() {

    const [balance, setBalance] = useState(null);
    const [balanceDisplay, setbalanceDisplay] = useState(0);
    const [account_value, set_account_value] = useState(0);
    const [stocks_value, set_stocks_value] = useState(0);
    const [total_gain_loss, set_total_gain_loss] = useState(0);
    
    const [stocks, setStocks] = useState([]);
    const [stockPrice, setstockPrice] = useState(0);
    const [shares, setShares] = useState(0);
    const [stocksLength, setstocksLength] = useState(0);

    const [stock_curr_price, set_stock_curr_price] = useState(0);
    
    const [stockValue, setstockValue] = useState([]);
    const [profileDisplay, setprofileDisplay] = useState(false);
  
    const [transDate, setTransDate] = useState([]);
    const [orderType, setOrderType] = useState([]);
    const [buysell, setBuySell] = useState([]);
    const [effect, setEffect] = useState([]);
    const [ticker, setTicker] = useState([]);
    const [stock_amount, setStockAmount] = useState([]);
    const [prices, setPrices] = useState([]);
    const [transLength, setTransLength] = useState([]);

    async function getUserBalance() {
        
        console.log("get balance");

        try {
            const currentUser = await Parse.User.current();

            var floatbalance = parseFloat(currentUser.get('balance'));
            var roundedbalance = Math.floor(floatbalance * 100) / 100;
            
            setBalance(roundedbalance);
            setbalanceDisplay(roundedbalance);

            //Sets balance on page load, balance is null on page load
            if (balance == null) {
                setBalance(roundedbalance);
            }
        }
        catch (err) {
            //alert("Not logged in");
        }

    }
    //useEffect called later for less synchronization hell

    //Withdraw operation
    //Triggers balance display upon withdrawal
    async function handleWithdraw(event) {
        event.preventDefault();

        const withdraw = prompt('Withdraw amount:');

        if (withdraw == null) {
            console.log("Cancel withdraw");
            return 0;
        }

        else if (parseFloat(withdraw) > balance) {
            alert("Attempting to withdraw more more money than allowed");
            return
        }

        else if (withdraw > 0) {
            var floatbalance = parseFloat(balance);
            var floatwithdraw = parseFloat(withdraw).toFixed(2);
            var roundedbalance = Math.floor(floatbalance * 100) / 100;
            var totalbalance = ((roundedbalance - floatwithdraw) * 100) / 100;

            try {
                const currentUser = await Parse.User.current();

                currentUser.set('balance', totalbalance);
                currentUser.save();

                //add withdrawal to orders table
                var order_entry = new Parse.Object('Order');
                order_entry.set('transDate', new Date());
                order_entry.set('isStockOperation', false);
                order_entry.set('isBuy', false);
                order_entry.set('isOpenPos', false);
                order_entry.set('ticker', "");
                order_entry.set('amount', parseFloat(floatwithdraw));
                order_entry.set('account', currentUser);
                order_entry.save();

                setBalance(totalbalance);
                getUserBalance();
            }
            catch{
                console.log("Could not save balance");
            }
        }

        else {
            alert("Invalid number, please try again");
        }
    }

    //Deposit operation
    //Triggers balance display upon deposit
    async function handleDeposit(event) {
        event.preventDefault();

        const deposit = prompt('Deposit amount:');

        if (deposit == null) {
            console.log("Cancel deposit");
            return 0;
        }

        else if (deposit > 0) {
            var floatbalance = parseFloat(balance);
            var floatdeposit = parseFloat(parseFloat(deposit).toFixed(2));
            var roundedbalance = parseFloat(Math.floor(floatbalance * 100) / 100);
            var totalbalance = parseFloat(((roundedbalance + floatdeposit) * 100) / 100);

            try {
                const currentUser = await Parse.User.current();

                currentUser.set('balance', totalbalance);
                currentUser.save();

                //add deposit to orders table
                var order_entry = new Parse.Object('Order');
                order_entry.set('transDate', new Date());
                order_entry.set('isStockOperation', false);
                order_entry.set('isBuy', true);
                order_entry.set('isOpenPos', true);
                order_entry.set('ticker', "");
                order_entry.set('amount', parseFloat(floatdeposit));
                order_entry.set('account', currentUser);
                order_entry.save();

                setBalance(totalbalance);
                getUserBalance();
            }
            catch{
                console.log("Could not save balance");
            }
        }

        else {
            alert("Invalid number, please try again");
        }
    }

    //Gets all of currently logged in user's stock data
    async function getUserStocks() {
        console.log("scope:getUserStocks");
        
        var stockName = [];
        var AveragePrice = [];
        var sharesBought = [];
        var count = 0;

        //Get stock owner's username
        const currentUser = await Parse.User.current();
        const OwnerQuery = new Parse.Query('User');
        OwnerQuery.equalTo('username', currentUser.get('username'));
        const Owner = await OwnerQuery.first();

        //Get all stocks owned by user
        const portfolioQuery = new Parse.Query('Portfolio');
        portfolioQuery.equalTo('stockOwner', Owner);
        let queryResults = await portfolioQuery.find();

        //Append user owned stock data to be set to corresponding states
        for (let result of queryResults) {
            stockName.push(result.get('stockName'));
            AveragePrice.push(result.get('AveragePrice'));
            sharesBought.push(result.get('sharesBought'));
            count++;
        }

        setStocks(stockName);
        setstockPrice(AveragePrice);
        setShares(sharesBought);
        setstocksLength(count);

    }

    function stockDisplay() {
        var profileStocks = [];

        for (var i = 0; i < stocksLength; i++) {
            profileStocks.push(
                <UserStockRow ticker={stocks[i]}
                    shares={shares[i]}
                    stockPrice={stockPrice[i]}
                    totalPrice={(stockPrice[i] * shares[i]).toFixed(2)}>
                </UserStockRow>)
        }

        return profileStocks;
    }

    //Account Value = Total Stock Values + Balance
    async function accountvalueDisplay() {
        const currentUser = await Parse.User.current();
        set_account_value(currentUser.get("balance") + stocks_value);
    }
    
    async function getCurrPrices() {
        console.log("scope: getCurrPrices");
        console.log(stocks.length);
        let currPrice = []
                
        for (var i=0; i < stocks.length; i++) {
            const url = `${iex.base_url}/stock/${stocks[i]}/quote/?&token=${iex.api_token}`;
                
            await fetch(url).then((Response) => Response.json()).then((data)  => {
                currPrice.push(parseFloat(data.latestPrice));
            })
        };
        console.log(currPrice)
        set_stock_curr_price(currPrice);
    }
    
    function equityValueDisplay() {
        console.log("scope: equityValueDisplay");
        var stocksValue = 0;
        var values = [];
        
        if (stocksLength != 0) {

            console.log("TEST");
            
            for (var i = 0; i < stocks.length; i++) {
                values.push(stock_curr_price[i] * shares[i]);
            }
            console.log(values);

            for (var i = 0; i < stocks.length; i++) 
                stocksValue += values[i];
        }
        stocksValue.toFixed(2);
        
        set_stocks_value(stocksValue);
    }
    

    //Calculate net gain/loss then display
    async function calcGainLoss() {
        
        const currentUser = await Parse.User.current();
        const OwnerQuery = new Parse.Query('User');
        OwnerQuery.equalTo('username', currentUser.get('username'));
        const Owner = await OwnerQuery.first();
                
        //find all deposits and add it up
        const depositQuery = new Parse.Query('Order');
        depositQuery.equalTo('account', Owner);
        depositQuery.equalTo('isStockOperation', false);
        depositQuery.equalTo('isOpenPos', true);
        depositQuery.equalTo('isBuy', true);
        
        var depositArr = await depositQuery.find();
        var totalDeps = 0;
        
        for (var row of depositArr) {
            totalDeps += row.get('amount');
        }
        
        //find all withdrawals and add it up
        const withdrawalQuery = new Parse.Query('Order');
        withdrawalQuery.equalTo('account', Owner);
        withdrawalQuery.equalTo('isStockOperation', false);
        withdrawalQuery.equalTo('isOpenPos', false);
        withdrawalQuery.equalTo('isBuy', false);
        
        var withArr = await withdrawalQuery.find();
        var totalWiths = 0;
        
        for (var row of withArr) {
            totalWiths += row.get('amount');
        }
        
        var basis = totalDeps - totalWiths;
                
        set_total_gain_loss(Math.floor((account_value - basis) * 100) / 100) ;
    }

    
    useEffect(() => {
        getTransactionHistory();
        getUserBalance();
        getUserStocks();
    }, []);
    
    
    useEffect(() => {
        getCurrPrices();
    }, [stocks]);
    
    useEffect(() => {
        equityValueDisplay();
    }, [stock_curr_price]);
    
    useEffect(() => {
        accountvalueDisplay();
    }, [stocks_value]);
    
    useEffect(() => {
        calcGainLoss();
    }, [account_value]);
    
    //Get all transactions by user
    //@return list of transactions by user
    async function getTransactionHistory() {

        var transDateArr = [];
        var orderTypeArr = [];
        var buysellArr = [];
        var effectArr = [];
        var tickerArr = [];
        var stock_amountArr = [];
        var price = [];
        var count = 0;

        //Get stock owner's username
        const currentUser = await Parse.User.current();
        const OwnerQuery = new Parse.Query('User');
        OwnerQuery.equalTo('username', currentUser.get('username'));
        const Owner = await OwnerQuery.first();

        //Get all transactions made by user
        const historyQuery = new Parse.Query('Order');
        historyQuery.equalTo('account', Owner);
        //Filter to 10 most recent
        historyQuery.descending('transDate');
        historyQuery.limit(10);
        
        let queryResults = await historyQuery.find();
        console.log("getTransactionHistory");
        
        //Append user owned stock data to be set to corresponding states
        for (let result of queryResults) {
            transDateArr.push(result.get('transDate').toString());

            var op_is_stock = result.get('isStockOperation');
            var eff = result.get('isOpenPos');
            
            if (true == op_is_stock) {
                orderTypeArr.push("Stock");

                if (true == eff) {
                    effectArr.push("Open");
                }
                else {
                    effectArr.push("Close");
                }
            }
            else if (true == eff) {
                orderTypeArr.push("Deposit");
                effectArr.push("");
            }
            else if (false == eff) {
                orderTypeArr.push("Withdrawal");
                effectArr.push("");
            }
            //means something went wrong
            else {
                orderTypeArr.push("---");
                effectArr.push("---");
            }

            var is_long = result.get('isBuy');
            if (is_long && op_is_stock) {
                buysellArr.push("Buy");
            }
            else if (!is_long && op_is_stock) {
                buysellArr.push("Sell");
            }
            else {
                buysellArr.push("");
            }

            tickerArr.push(result.get('ticker'));
            stock_amountArr.push(result.get('amount'));
            price.push(result.get('price'));

            count++;
        }

        setTransDate(transDateArr);
        setOrderType(orderTypeArr);
        setBuySell(buysellArr);
        setEffect(effectArr);
        setTicker(tickerArr);
        setStockAmount(stock_amountArr);
        setPrices(price);
        setTransLength(count);
    }

    function transHistoryDisplay() {
        var result = [];

        for (var i = 0; i < transLength; i++) {
            result.push(
                <TransactionRow
                    transDate={transDate[i]}
                    orderType={orderType[i]}
                    buysell={buysell[i]}
                    effect={effect[i]}
                    ticker={ticker[i]}
                    stock_amount={stock_amount[i]}
                    prices={prices[i]}
                >
                </TransactionRow>
            )
        }

        return result;
    }

    useEffect(() => {
        getstockValue();
     }, [stocks,shares]);


     async function getstockValue(){
        var stockvals = [];
        if (stocks != 0 || stocks != null || typeof(stocks) != "undefined"){
        for(const stock of stocks){
            const response = await fetch(`${iexapitoken.base_url}/stock/${stock}/quote/?&token=${iexapitoken.api_token}`)
            const res = await response.json();
            stockvals.push(res.latestPrice);
        }  
    }
        if(shares == 0 || shares == null){
            return null;
        }else{
            calculatestockValue(stockvals);
        }
    }
    function calculatestockValue(props){
        var stockvals = [];
        for(var i = 0; i < props.length; i++){
            var x = Math.floor((props[i] * shares[i]) * 100) / 100;
            stockvals.push(x);
        }
        //console.log(stockvals);
        setstockValue(stockvals);
 
    }


    function displayChartData(){
        if((stockValue == 0 || stockValue == null)){
            // console.log("STOCK IN IFSTATEMENT", stocks);
            const errormsg = {
                color: "white",
                backgroundColor: "DodgerBlue",
                padding: "10px",
                fontFamily: "Arial"
              };
            return (<div>
                <Link to="/usermarketpage" style={errormsg}>Explore market page and buy a stock!</Link>
            </div>);
        } else if (stocks == 0 || stocks == null){
            // console.log("SHARES IN IFSTATMENT", shares);
            return null;
        }else{
            // console.log("TRIGGERING ELSE STATEMENT NOW");
            return (<PortfolioDiversity stock={stocks} chartData={stockValue}/>)
 
        }
 
    }


    return (
        <div className="profile-container">
            <div className="bar">
            <div className="user-assets">
                <h1> Assets </h1>
                <table>
                    <tr>
                        <td>
                            <table className="balances-buttons">
                                <tr>
                                    <table className="asset-breakdown-table">
                                    <tr>
                                    <td>Equity value:</td>
                                    <td>${stocks_value}</td>
                                    </tr>
                                    <tr>
                                    <td>Cash balance:</td>
                                    <td>${balanceDisplay}</td>
                                    </tr>
                                    <tr>
                                    <td>Total account value:</td>
                                    <td>${parseFloat(account_value.toFixed(2))}</td>
                                    </tr>
                                    <tr>
                                    <td>Net gain/loss:</td>
                                    <td>${total_gain_loss}</td>
                                    </tr>
                                    </table>
                                </tr>
                                <tr>
                                    <div className="cash-balance">
                                        <button type="submit" className="balancebtn" onClick={handleWithdraw}>
                                            Withdraw
                                        </button>
                                        <button type="submit" className="balancebtn" onClick={handleDeposit}>
                                            Deposit
                                        </button>
                                    </div>
                                </tr>
                            </table>
                        </td>
                        {/* <td>
                            <div className="piechart-placeholder">
                                pie chart goes here
                            </div>
                        </td> */}
                    </tr>
                </table>

            </div>
            <div className="chart">
                {displayChartData()}
                </div>
            </div>
            <div className = "btncontainer">
                <button className="balancebtn" onClick={() => setprofileDisplay(!profileDisplay)} > Watchlist View </button>
            </div>
            <tbody className="watchlist">
                {profileDisplay ? <UserWatchlist /> : null}
            </tbody>
            <tbody className="stock-table">
                <div className="container">
                    <div> <br /> </div>
                    <h1> Your Stocks </h1>
                    <div className="titledesign">  </div>
                    <table className="table">
                        <thead>
                            <tr className="chartdesign">
                                <th className="publicsans"> TICKER </th>
                                <th className="publicsans"> SHARES </th>
                                <th className="publicsans"> AVERAGE PRICE </th>
                                <th className="publicsans"> CURRENT PRICE </th>
                                <th className="publicsans"> % CHANGE </th>
                                <th className="publicsans"> TOTAL PRICE </th>
                            </tr>
                        </thead>
                        <tbody className="tabledesign">
                            {stockDisplay()}
                        </tbody>
                    </table>
                </div>
            </tbody>
            <tbody className="stock-table">
                <h1> Recent Transactions </h1>
                <p> For more transactions, go to <a href="/history">History</a> </p>
                <div className="container">
                    <div className="titledesign"> </div>
                    <table className="table">
                        <thead>
                            <tr className="chartdesign">
                                <th className="publicsans"> Time Placed </th>
                                <th className="publicsans"> Order Type </th>
                                <th className="publicsans"> Buy/Sell </th>
                                <th className="publicsans"> Effect </th>
                                <th className="publicsans"> Security </th>
                                <th className="publicsans"> Amount </th>
                                <th className="publicsans"> Price </th>
                            </tr>
                        </thead>
                        <tbody className="tabledesign">
                            {transHistoryDisplay()}
                        </tbody>
                    </table>
                </div>
            </tbody>
        </div>
    );

}

export default ProfilePage;