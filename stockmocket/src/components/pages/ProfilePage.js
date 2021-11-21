import React, { useState, useEffect, useCallback, Component } from "react";
import UserStockRow from "./UserStockRow.js"
import ProfileDiversity from "./PortfolioDiversity.js";
import iex from './iexapitoken.js'
import "./ProfilePage.css";

const Parse = require('parse/node');

function ProfilePage() {
    const [balance, setBalance] = useState(null);
    const [balanceDisplay, setbalanceDisplay] = useState(0);
    const [stocks, setStocks] = useState([]);
    const [stockPrice, setstockPrice] = useState(0);
    const [shares, setShares] = useState(0);
    const [stocksLength, setstocksLength] = useState(0);
    const [stockValue, setstockValue] = useState([]);

    
    // console.log("STOCKS", stocks);
    // console.log("SHARES", shares);
    //console.log("STOCKVALUE", stockValue);


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

    // function getCurrentPrice(prop){
    //     var placeholder = [];
    //     const url = `${iex.base_url}/stock/${prop}/quote/?&token=${iex.api_token}`
    //         fetch(url).then((Response) => Response.json()).then((data) => {
    //             setapidata(data);
    //         })
    // }


     



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


       
       useEffect(() => {
        getstockValue();
     }, [stocks,shares]);








    async function getstockValue(){
        var stockvals = [];
        if (stocks != 0 || stocks != null || typeof(stocks) != "undefined"){
        for(const stock of stocks){
            const response = await fetch(`${iex.base_url}/stock/${stock}/quote/?&token=${iex.api_token}`)
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



    //Gets User stocks on page load
    useEffect(() => {
       getUserStocks();
    }, []);




    function stockDisplay() {
        var profileStocks = [];
        //console.log(shares);

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

    function displayChartData(){
        if((stockValue == 0 || stockValue == null)){
            // console.log("STOCK IN IFSTATEMENT", stocks);
            return null;
        } else if (stocks == 0 || stocks == null){
            // console.log("SHARES IN IFSTATMENT", shares);
            return null;
        }else{
            // console.log("TRIGGERING ELSE STATEMENT NOW");
            return (<ProfileDiversity stock={stocks} chartData={stockValue}/>)

        }

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
            <div className="PortfolioChart">
                {displayChartData()}
                
            </div>
        </div>

    );

}

export default ProfilePage;