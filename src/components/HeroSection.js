import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Market from './pages/MarketData';


function HeroSection(props) {
    return (
        
        <div className='hero-container'>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h1>Welcome to paper trading</h1>
            <p>Fake it till you make it!</p>
            <div className="hero-btns">
                
                <Button link to ={"/market"} className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    MARKET DATA <i class="fas fa-info-circle"></i>
                </Button>
                <Button link='/login' className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                    GET STARTED <i class="fas fa-angle-double-right"></i>
                </Button>
              
            </div>
            <p id="arrow"><i class="fas fa-angle-double-down"></i></p>
        </div>
       
    )
}

export default HeroSection