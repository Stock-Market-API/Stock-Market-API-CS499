import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Navbar.css';

const Parse = require('parse/node');

function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(true);
    const [loggedIn, setloggedIn] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    const changeBackground = (event) => {

        if (window.location.pathname.includes('/aboutus') || window.location.pathname.includes('/market')) {
            setNavbar(true);
            setButtonStyle(false);
        }
        else if (window.location.pathname.includes('/') && window.scrollY >= 80) {
            setNavbar(true);
            setButtonStyle(false);
        }
        else {
            setNavbar(false);
            setButtonStyle(true);
        }
    }

    window.addEventListener('click', changeBackground);
    window.addEventListener('load', changeBackground);
    window.addEventListener('scroll', changeBackground);
    window.addEventListener('mouseover', changeBackground);

    //Checks if a user is logged in or not
    //Sets loggedIn state to true if user is found
    async function loginStatus() {
        const currentUser = await Parse.User.current();

        if (currentUser !== null) {
            setloggedIn(true);
            console.log("Status: Logged in");
        }

        else {
            setloggedIn(false);
            console.log("Status: Not logged in");
        }
    }

    loginStatus();

    function loginButton() {
        return button && <Button link='/login' buttonStyle={buttonStyle ? 'btn--outline' : 'btn--primary'} >Login / Signup</Button>;
    }

    //Changes button display to either login or logout 
    //depending if user is logged in or not
    function buttonDisplay(loggedIn) {
        if (!loggedIn) {
            return loginButton();
        } else {
            return <LogoutButton />;
        }
    }

    return (
        <React.Fragment>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Stock-Mocket&nbsp;&nbsp;
            <i class='fas fa-chart-line' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link
                                to='/market'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Market
              </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/aboutus'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                AboutUs
              </Link>
                        </li>
                    </ul>
                    <u1 id="para">
                        {buttonDisplay(loggedIn)}
                    </u1>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;