import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./LoginForm.css"

function Register() {

    const [userRegister, setuserRegister] = useState('')
    const [passRegister, setpassRegister] = useState('')
    const [emailRegister, setemailRegister] = useState('')

    
    function checkForm() {
         return userRegister > 0 && passRegister > 0 && emailRegister > 0;
    }

    function handleSubmit(event) {
         event.preventDefault();
    }


    return (
        <div className="form-bg">
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