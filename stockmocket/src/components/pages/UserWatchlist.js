import React, { useState, useEffect, useCallback } from "react";
import StockRow from "./StockRow.js";
import "./ProfilePage.css";
import "./MockData.css";

const Parse = require('parse/node');

function UserWatchlist() {
    
    const [watchedstocks, setWatchedStocks] = useState([]);
    const [stocksLength, setStocksLength] = useState(0);
    
    async function watchlistStocks() {
        console.log("get stocks");
        var stocks = [];
        var count = 0;

        try {
            //Get stock owner's username
            const currentUser = await Parse.User.current();
            const OwnerQuery = new Parse.Query('User');
            OwnerQuery.equalTo('username', currentUser.get('username'));
            const Owner = await OwnerQuery.first();

            //Get all stocks owned by user
            const portfolioQuery = new Parse.Query('Watchlist');
            portfolioQuery.equalTo('stockOwner', Owner);
            let queryResults = await portfolioQuery.find();

            //Stock not owned
            if (queryResults.length == 0) {
                console.log('No stocks in watchlist');
            }

            else {
                for (let result of queryResults) {
                    stocks.push(result.get('stockName'));
                    count++;
                    setStocksLength(count);
                }
                setWatchedStocks(stocks);
            }
        }
        catch (err) {
            //alert("Not logged in");
        }
    }

    
    //Gets User's watchlist upon page load
    useEffect(() => {
        watchlistStocks();
    }, []);
    
    
    function displayWatchlist() {
        var watchliststocks = [];

        if (watchedstocks.length == 0 || watchedstocks.length == null) {
            return null;
        }

        else {
            for (var i = 0; i < stocksLength; i++) {
                watchliststocks.push(<StockRow ticker={String(watchedstocks[i])} />);
            }

            return watchliststocks;
        }
    }

    return (
        <div className="watchlist-container">
            <h1 className="watchlist-header"> Your Watchlist </h1>
                <div className="titledesign">  </div>
                <table className="table">
                    <thead>
                        <tr className="chartdesign">
                            <th className="publicsans"> TICKER </th>
                            <th className="publicsans"> NAME</th>
                            <th className="publicsans"> PRICE </th>
                            <th className="publicsans"> OPEN </th>
                            <th className="publicsans"> CLOSE</th>
                            <th className="publicsans"> % CHANGE</th>
                            <th className="publicsans"> LAST UPDATE </th>
                        </tr>
                    </thead>
                    <tbody className="tabledesign">
                        {displayWatchlist()}
                    </tbody>
                </table>
        </div>

    );
};

export default UserWatchlist;