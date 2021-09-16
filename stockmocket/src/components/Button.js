import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

//creating a reusable button 

const STYLES = ['btn--primary', 'btn--outline']; //btn--primary is the one that's filled while btn--outline is just outlined
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize,link}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]; //if it has a buttonStyle keep the buttonStyle the same if not set it to the first option in our STYLES array

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0] //if the buttonsize already has a size return size if not make it medium button

    return (
        <Link to={link} className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>
    )

};