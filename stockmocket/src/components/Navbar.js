import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar,setNavbar] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(true);

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

  const changeBackground = () => {

      if (window.location.pathname.includes('/login') || window.location.pathname.includes('/register') || window.location.pathname.includes('/aboutus')) {
          setNavbar(true);
          setButtonStyle(false);
      }
      else if(window.scrollY >= 80) {
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
                to='/Market'
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
          {button && <Button link='/login' buttonStyle={buttonStyle ? 'btn--outline' : 'btn--primary'} >Login / Signup</Button>}
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;