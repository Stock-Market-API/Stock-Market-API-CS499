import React, { useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import "./LoginForm.css";

function Register() {

    const [userRegister, setuserRegister] = useState('')
    const [passRegister, setpassRegister] = useState('')
    const [confirmpassRegister, setconfirmpassRegister] = useState('')
    const [emailRegister, setemailRegister] = useState('')

    
    function checkForm() {
         return userRegister > 0 && passRegister > 0 && emailRegister > 0;
    }

    function handleSubmit(event) {
         event.preventDefault();
    }

    /*

    //Take inputs from register url to send to backend
    const register = () => {
        Axios.post('http://localhost:3000/Register', {
            username: userRegister,
            password: passRegister,
            email: emailRegister,
    });
    };
    */

    return (
        <div className="form-bg">
          <video src="/videos/video-4.mp4" autoPlay loop muted />
          <div className="form-container">
            <div className="form-header"> Register</div>
            <div className="form-content">
                <div className="form">
                    <div className="form-inputs">
                        <input type="text"
                            //Saves username input to be inputted to backend
                            //upon submission
                            onChange={(e) => {
                            setuserRegister(e.target.value);
                            }}
                            name="Username" placeholder="Username" />
                    </div>
                    <div className="form-inputs">
                        <input type="Password"
                            //Saves password input to be inputted to backend
                            //upon submission
                            onChange={(e) => {
                            setpassRegister(e.target.value);
                            }}
                            name="Password" placeholder="Password" />
                        </div>
                    <div className="form-inputs">
                        <input type="Password"
                            //Saves password input to be inputted to backend
                            //upon submission
                            onChange={(e) => {
                                setconfirmpassRegister(e.target.value);
                            }}
                            name="Password" placeholder="Confirm Password" />
                    </div>
                    <div className="form-inputs">
                    <input type="Email"
                        //Saves email input to be inputted to backend
                        //upon submission
                        onChange={(e) => {
                        setemailRegister(e.target.value);
                        }}
                        name="Email" placeholder="Email" />
                </div>
                    <div className="form-buttons">
                        <Link to="/"><button className="formbtn">
                            Register
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>

    )

}

export default Register;