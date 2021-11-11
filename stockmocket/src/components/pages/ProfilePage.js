import React, { useState, useEffect, useCallback } from "react";
import UserStockRow from "./UserStockRow.js"
import "./ProfilePage.css";

const Parse = require('parse/node');

function ProfilePage() {
    const [balance, setBalance] = useState(null);
    const [balanceDisplay, setbalanceDisplay] = useState(0);
    const [stocks, setStocks] = useState([]);
    const [stockPrice, setstockPrice] = useState(0);
    const [shares, setShares] = useState(0);
    const [stocksLength, setstocksLength] = useState(0);
    
    const [transDate, setTransDate] = useState([]);
    const [orderType, setOrderType] = useState([]);
    const [buysell, setBuySell] = useState([]);
    const [effect, setEffect] = useState([]);
    const [ticker, setTicker] = useState([]);
    const [stock_amount, setStockAmount] = useState([]);
    const [prices, setPrices] = useState([]);
    const [transLength, setTransLength] = useState([]);

    const getUserBalance = useCallback(async () => {
        console.log("get balance");

        try {
            const currentUser = await Parse.User.current();

            var floatbalance = parseFloat(currentUser.get('balance'));
            var roundedbalance = Math.floor(floatbalance * 100) / 100;
            setbalanceDisplay(roundedbalance);
        }
        catch (err) {
            //alert("Not logged in");
        }
    }, [balance])

    //Gets User Balance upon page load
    useEffect(() => {
        getUserBalance();
    },[getUserBalance]);

    //Saves user balance to backend
    //Triggers balance display change when balance is changed
    async function setUserBalance(event) {
        event.preventDefault();

        if (balance >= 0) {
            var floatbalance = parseFloat(balance);
            console.log("floatbalance: ", floatbalance);
            var roundedbalance = Math.floor(floatbalance * 100) / 100;

            try {
                const currentUser = await Parse.User.current();

                currentUser.set('balance', roundedbalance);
                currentUser.save();
                getUserBalance();
            }
            catch {
                console.log("Could not save balance");
            }
        }
        else {
            console.log("Invalid balance");
        }
    }

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

    //Gets User stocks on page load
    useEffect(() => {
       getUserStocks();
       getTransactionHistory();
    }, []);

    function stockDisplay() {
        var profileStocks = [];

        for (var i = 0; i < stocksLength; i++) {
            profileStocks.push(
                <UserStockRow ticker={stocks[i]}
                              shares={shares[i]}
                              stockPrice={stockPrice[i]}>
                </UserStockRow>)
        }

        return profileStocks;
    }

    //Account Value = Total Stock Values + Balance
    function accountvalueDisplay() {
        var accountValue = 0;
        var values = [];

        if (stocksLength != 0) {
            for (var i = 0; i < stocksLength; i++) 
                values.push(stockPrice[i] * shares[i]);

            for (var i = 0; i < stocksLength; i++) 
                accountValue += values[i];

            accountValue += balanceDisplay;
            accountValue = Math.floor(accountValue * 100) / 100;
            return accountValue;
        }

        else{
            accountValue += balanceDisplay;
            return accountValue;
        }
    }
    
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

        //Get all stocks owned by user
        const historyQuery = new Parse.Query('Order');
        historyQuery.equalTo('account', Owner);
        let queryResults = await historyQuery.find();

        //Append user owned stock data to be set to corresponding states
        for (let result of queryResults) {
            transDateArr.push(result.get('transDate'));
            
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
        
        console.log(count);

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
        var result =  "";
        //for display debugging
        //"<tr> <td>Nov 9</td> <td>Stock</td> <td>Buy</td> <td>Open</td> <td>BKKT</td> <td>1</td> <td>20</td> </tr>";
        
        //not sure how to use react so I just did some basic string stuff. Looks ugly as hell though
        for (var i=0; i<transLength; i++) {
            result += "<tr>";
            //trans date
            result += "<td>";
            result += transDate[i];
            result += "</td>";
            //order type
            result += "<td>";
            result += orderType[i];
            result += "</td>"
            //buysell
            result += "<td>";
            result += buysell[i];
            result += "</td>";
            //effect
            result += "<td>";
            result += effect[i];
            result += "</td>";
            //ticker
            result += "<td>";
            result += ticker[i];
            result += "</td>"
            //stock amount
            result += "<td>";
            result += stock_amount[i];
            result += "</td>"
            //prices
            result += "<td>";
            result += prices[i];
            result += "</td>";
                        
            result += "</tr>";
        }
        
        return result;
    }

    return (
        <div className="profile-container">
            <div className="user-assets">
                Assets
                <div> <br/> </div>
                <div className="account-value">
                    Your Account Value: ${accountvalueDisplay()}
                </div>
                <div className="cash-balance">
                    Cash Balance: ${balanceDisplay}
                    <form className="form" onSubmit={setUserBalance}>
                        <div className="balance-btns">
                            <input type="text" className="balance-input"
                                //Sets balance input on submit
                                value={balance}
                                onChange={(e) => {
                                    setBalance(e.target.value);
                                }} />
                            <button type="submit" className="balancebtn">
                                Set Balance
                            </button>
                        </div>
                        <div> <br /> </div>
                        <div>
                            <button type="submit" className="balancebtn" onClick={handleWithdraw}>
                                Withdraw
                            </button>
                            <button type="submit" className="balancebtn" onClick={handleDeposit}>
                                Deposit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <tbody className="stock-table">
                <h1> Your Stocks </h1>
                <div className="container">
                    <div className="titledesign">  </div>
                    <table className="table">
                        <thead>
                            <tr className="chartdesign">

                                <th className="publicsans"> TICKER </th>
                                <th className="publicsans"> SHARES </th>
                                <th className="publicsans"> AVERAGE PRICE </th>
                                <th className="publicsans"> CURRENT PRICE </th>
                                <th className="publicsans"> CHANGE </th>

                            </tr>
                        </thead>
                        <tbody className="tabledesign">
                            {stockDisplay()}
                        </tbody>
                    </table>
                </div>
            </tbody>
            <tbody>
                <h1> Transaction history </h1>
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
