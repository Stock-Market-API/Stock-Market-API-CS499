import React, { useState } from "react";
import "./ProfilePage.css";

const Parse = require('parse/node');

function ProfilePage() {
    const [balance, setBalance] = useState(null);
    const [balanceDisplay, setbalanceDisplay] = useState(0);

    async function getUserBalance() {
        const currentUser = await Parse.User.current();
        setbalanceDisplay(currentUser.get('balance'));
    }

    window.addEventListener('submit', getUserBalance);

    async function setUserBalance(event) {
        event.preventDefault();
        var intbalance = parseFloat(balance); 
        const currentUser = await Parse.User.current();

        currentUser.set('balance', intbalance);
        currentUser.save();
    }

    return (
        <div className="profile-container">
            <div className="user-assets">
                Assets
                <div> <br/> </div>
                <div className="account-value">
                    Your Account Value: {/*will be stock values + cash balance*/}
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
            <div className="stock-display">
                stocks here
                </div>
        </div>

    );

}

export default ProfilePage;