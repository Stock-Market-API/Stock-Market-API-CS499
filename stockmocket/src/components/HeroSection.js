import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const Parse = require('parse/node');


function HeroSection() {
    const [loggedIn, setloggedIn] = useState(false);

    const loginStatus = useCallback(async () => {
        const currentUser = await Parse.User.current();

        if (currentUser !== null) {
            setloggedIn(true);
        }
        else {
            setloggedIn(false);
        }
    },[])

    useEffect(() => {
        loginStatus();
    }, [loginStatus]);


    function notLoggedin(){
        return (<Button link='/login' className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
        GET STARTED <i class="fas fa-angle-double-right"></i>
    </Button>)
    }

    function Loggedin(){
        return (<Button link='/profile' className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
        GO TO PROFILE <i class="far fa-address-card"></i>
    </Button>)
    }

    function loginDisplay(loggedIn) {
        if (!loggedIn) {
            return notLoggedin();
        } else {
            return Loggedin();
        }
    }

    return (
        <div className='hero-container'>
            <video src="https://cdn.discordapp.com/attachments/919981879745192016/919983889315942461/video-1.mp4" autoPlay loop muted />
            <h1>Welcome to paper trading</h1>
            <p>Fake it till you make it!</p>
            <div className="hero-btns">
                <Button link='/market' className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    MARKET DATA <i class="fas fa-info-circle"></i>
                </Button>
                {loginDisplay(loggedIn)}
            </div>
            <p id="arrow"><i class="fas fa-angle-double-down"></i></p>
        </div>
    )
}

export default HeroSection