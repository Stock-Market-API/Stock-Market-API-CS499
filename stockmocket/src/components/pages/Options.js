import React, { useState, useEffect, useCallback } from "react";
import OptionsRow from "./OptionsRow.js";
import { useGlobalState } from '../GlobalState.js';
import "./ProfilePage.css";
import "./MockData.css";


const Parse = require('parse/node');

function Options(props) {
    const [clicked, setClicked] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [optionsSold, setOptionsSold] = useGlobalState('optionsSold');

    //Data per option
    const [stock, setStock] = useState([]);
    const [strikePrice, setStrikePrice] = useState([]);
    const [optionPrice, setOptionPrice] = useState([]);
    const [priceBought, setPriceBought] = useState([])
    const [optionChoice, setOptionChoice] = useState([]);
    const [expireDate, setExpireDate] = useState([]);
    const [balance, setBalance] = useState(null);


    //Gets all the user's sellable options
    async function getOptionsData() {
        try {
            const currentUser = await Parse.User.current();
            setBalance(currentUser.get("balance").toFixed(2));
            const stockQuery = new Parse.Query('Options');
            stockQuery.equalTo('stockOwner', currentUser);
            const stockResult = await stockQuery.find();

            //If no Queries are receieved then create a row for it
            if (stockResult.length == 0) {
                console.log("No options owned by user")
            }
            else {

                var stock_arr = [];
                var strikePrice_arr = [];
                var optionPrice_arr = [];
                var priceBought_arr = [];
                var optionChoice_arr = [];
                var expireDate_arr = [];

                //Get all option data rows
                for (let result in stockResult) {
                    stock_arr.push(stockResult[result].get('stockName'));
                    strikePrice_arr.push(stockResult[result].get('strikePrice'));
                    priceBought_arr.push(stockResult[result].get('boughtPrice'));
                    optionPrice_arr.push(stockResult[result].get('initialOptionPrice'));
                    optionChoice_arr.push(stockResult[result].get('callOrPut'));
                    expireDate_arr.push(String(stockResult[result].get('expireDate')));

                }

                //Set option data rows to states
                setStock(stock_arr);
                setStrikePrice(strikePrice_arr);
                setOptionPrice(optionPrice_arr);
                setPriceBought(priceBought_arr);
                setOptionChoice(optionChoice_arr);
                setExpireDate(expireDate_arr);
                setOptionsSold(!optionsSold);
            }

        }
        catch (err) {
            console.log(err);
        }
    }


    function displayOptions() {
        var optionsList = [];

        if (stock.length == 0 || stock.length == null) {
            return null;
        }

        else {
            for (var i = 0; i < stock.length; i++) {
                optionsList.push(<OptionsRow ticker={stock[i]}
                    optionPrice={optionPrice[i]}
                    priceBought={priceBought[i]}
                    strikePrice={strikePrice[i]}
                    option={optionChoice[i]}
                    expireDate={expireDate[i]} />)
            }
            return optionsList;

        }
    }

    useEffect(() => {
        getOptionsData();
        displayOptions();
    }, [optionsSold]);

    return (
        <div className="options-container">
            <div>
            <div className ="user-greeting"> 
                Current Balance is ${balance}
            </div>
            </div>
            <h1 className="options-header"> Your Options </h1>
            <div className="titledesign">  </div>
            <table className="table">
                <thead>
                    <tr className="chartdesign">
                        <th className="publicsans"> TICKER </th>
                        <th className="publicsans"> PRICE BOUGHT </th>
                        <th className="publicsans"> STRIKE PRICE </th>
                        <th className="publicsans"> OPTION </th>
                        <th className="publicsans"> EXPIRATION DATE</th>
                    </tr>
                </thead>
                <tbody className="tabledesign">
                    {displayOptions()}
                </tbody>
            </table>
        </div>

    );
};

export default Options;