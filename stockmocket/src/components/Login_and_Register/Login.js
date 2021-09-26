import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./LoginForm.css"


function Login() {

    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')


    function checkForm() {
        return user > 0 && pass > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }



    return (
        <div className="form-bg">
         <div className="form-container">
            <div className = "form-header"> Login </div>
            <div className = "form-content">
                <div className="form">
                    <div className="form-inputs">
                        <input type="text"
                            //Saves username input to be inputted to backend
                            //upon submission
                            onChange={(e) => {
                            setuser(e.target.value);
                        }}
                            name="Username" placeholder="Username" />
                    </div>
                    <div className="form-inputs">
                        <input type="Password"
                            //Saves password input to be inputted to backend
                            //upon submission
                            onChange={(e) => {
                            setpass(e.target.value);
                        }}
                            name="Password" placeholder="Password" />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="formbtn"> 
                                Login
                        </button>
                        <Link to="/register"><button className = "formbtn">
                            Sign Up
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
         </div>
        </div>

    )
}

export default Login;