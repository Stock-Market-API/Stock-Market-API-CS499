import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Button } from './Button';

const Parse = require('parse/node');

function LogoutButton(props) {
    const [button, setButton] = useState(true);
    const [buttonStyle, setButtonStyle] = useState(true);
    const [redirect, setRedirect] = useState(false);
    //const [loggedIn, setloggedIn] = useState(null);


    /*
    // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();

        //Update loggedIn state with current user
        setloggedIn(currentUser);
        return currentUser;
    };
    */

    async function handleLogout() {
        try {
            //Logout operation
            await Parse.User.logOut();

            //Verifies that user is logged out 
            const currentUser = await Parse.User.current();
            if (currentUser === null) {
                alert('You are logged out!');
            }
            setRedirect(true);
        } catch (error) {
            alert(`Error! ${error.message}`);
        }

    }
    //Redirects to home page upon logging out
    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            {button && <Button onClick={handleLogout} buttonStyle={buttonStyle ? 'btn--outline' : 'btn--primary'} >Logout</Button>}
        </div>

    );
}

export default LogoutButton;