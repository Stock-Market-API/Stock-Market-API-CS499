import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Reasons from '../Reasons';

function Home () {
    return (
        <React.Fragment>
            <HeroSection />
            <Reasons />
            <Cards />
           
        </React.Fragment>
    )
}

export default Home;