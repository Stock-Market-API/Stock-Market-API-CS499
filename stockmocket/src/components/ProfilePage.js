import React, { useState, useEffect } from "react";
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

    async function getUserBalance() {
        try {
            const currentUser = await Parse.User.current();

            var floatbalance = parseFloat(currentUser.get('balance'));
            var roundedbalance = Math.round(floatbalance * 100) / 100;
            setbalanceDisplay(roundedbalance);
        }
        catch (err) {
            //alert("Not logged in");
        }
    }

    //Only sets balance display when there is a valid balance
    if (balance >= 0)
        getUserBalance();

    //Saves user balance to backend
    async function setUserBalance(event) {
        event.preventDefault();

        if (balance >= 0) {
            var floatbalance = parseFloat(balance);
            var roundedbalance = Math.round(floatbalance * 100) / 100;

            const currentUser = await Parse.User.current();

            currentUser.set('balance', roundedbalance);
            currentUser.save();
        }
        else {
            console.log("Invalid balance");
        }
    }

    window.addEventListener('submit', getUserBalance);
    window.addEventListener('load', getUserBalance);
    window.addEventListener('submit', setUserBalance);

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
        window.addEventListener('load', getUserStocks());
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
            accountValue = Math.round(accountValue * 100) / 100;
            return accountValue;
        }

        else {
            return 0;
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
                                <th className="publicsans"> SHARES</th>
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
        </div>

    );

}

export default ProfilePage;
