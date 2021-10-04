import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Reasons from '../Reasons';


function Home () {
    return (
        <React.Fragment>
            <HeroSection />
            <Reasons />
        </React.Fragment>
    )
}

export default Home;