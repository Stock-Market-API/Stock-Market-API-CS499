import React, { useState, useEffect, useCallback } from 'react';
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
        if (window.location.pathname == '/' || window.location.pathname == '/login' || window.location.pathname == '/register') {
            if (window.location.pathname.includes('/') && window.scrollY >= 80) {
                setNavbar(true);
                setButtonStyle(false);
            }
            else {
                setNavbar(false);
                setButtonStyle(true);
            }
        }

        else {
            setNavbar(true);
            setButtonStyle(false);
        }

    }

    window.addEventListener('click', changeBackground);
    window.addEventListener('load', changeBackground);
    window.addEventListener('scroll', changeBackground);
    window.addEventListener('mouseover', changeBackground);

    //Checks if a user is logged in or not
    //Sets loggedIn state to true if user is found
    const loginStatus = useCallback(async () => {
        const currentUser = await Parse.User.current();

        if (currentUser !== null) {
            setloggedIn(true);
        }
        else {
            setloggedIn(false);
        }
    },[navbar])

    useEffect(() => {
        loginStatus();
    }, [loginStatus]);

    function loginButton() {
        return button && <Button link='/login' buttonStyle={buttonStyle ? 'btn--outline' : 'btn--primary'} >Login / Signup</Button>;
    }

    //Changes button display to either login or logout 
    //depending if user is logged in or not
    function loginDisplay(loggedIn) {
        if (!loggedIn) {
            return loginButton();
        } else {
            return <LogoutButton />;
        }
    }

    function profileDisplay(loggedIn) {
        if (!loggedIn) {
            return null;
        } else {
            return <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
            >
                Profile
                            </Link>;
        }
    }

    function dashboard() {
        return <li className='nav-item'> <Link
            to='/dashboard'
            className='nav-links'
            onClick={closeMobileMenu}
        >
            <i class="far fa-user-circle profileIcon"></i>  
        </Link>
        </li>
    }

    function dashboardDisplay(loggedIn) {
        if (!loggedIn) {
            return null;
        } else {
            return dashboard();
        }
    }

    function marketDirect(loggedIn) {
        if (!loggedIn) {
            return <Link
                to='/market'
                className='nav-links'
                onClick={closeMobileMenu}
            >
                Market
            </Link>

        } else {
            return <Link
                to='/usermarketpage'
                className='nav-links'
                onClick={closeMobileMenu}
            >
                Market
            </Link>
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
                        <u1 id="para">
                            {profileDisplay(loggedIn)}
                        </u1>
                        <li className='nav-item'>
                            {marketDirect(loggedIn)}
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
                    <u1 id="para">
                        {dashboardDisplay(loggedIn)}
                    </u1>
                    </ul>
                    <u1 id="para">
                        {loginDisplay(loggedIn)}
                    </u1>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;