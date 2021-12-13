import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import "./LoginForm.css";

const Parse = require('parse/node');

function Register() {

    const [userRegister, setuserRegister] = useState('')
    const [passRegister, setpassRegister] = useState('')
    const [confirmpassRegister, setconfirmpassRegister] = useState('')
    const [emailRegister, setemailRegister] = useState('')
    const [redirect, setRedirect] = useState(false);

    //Form Submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (userRegister.length === 0 || passRegister.length === 0 || confirmpassRegister === 0
            || emailRegister === 0) {
            alert("Fill in empty fields");
        }

        else if (passRegister != confirmpassRegister) {
            alert("Passwords do not match");
        }

        else {
            try {
                //Adds new User object to Parse database using form inputted user and password
                await Parse.User.signUp(userRegister, passRegister);
                alert('User registered!');

                setRedirect(true);
            } catch (error) {
                console.log('Error registering new user: ', error);
            }
        }
    }

    //Redirects to login page upon successful form submission
    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="form-bg">
            <video src="https://cdn.discordapp.com/attachments/919981879745192016/919983889995407431/video-4.mp4" autoPlay loop muted />
            <div className="form-container">
                <div className="form-header"></div>
                <div className="form-content"> Register
                <form className="form" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <input type="text" required
                                //Saves username input to be inputted to backend
                                //upon submission
                                value={userRegister}
                                onChange={(e) => {
                                    setuserRegister(e.target.value);
                                }}
                                name="Username" placeholder="Username" />
                        </div>
                        <div className="form-inputs">
                            <input type="Password" required
                                //Saves password input to be inputted to backend
                                //upon submission
                                value={passRegister}
                                onChange={(e) => {
                                    setpassRegister(e.target.value);
                                }}
                                name="Password" placeholder="Password" />
                        </div>
                        <div className="form-inputs">
                            <input type="Password" required
                                //Saves password input to be inputted to backend
                                //upon submission
                                value={confirmpassRegister}
                                onChange={(e) => {
                                    setconfirmpassRegister(e.target.value);
                                }}
                                name="Password" placeholder="Confirm Password" />
                        </div>
                        <div className="form-inputs">
                            <input type="Email" required
                                //Saves email input to be inputted to backend
                                //upon submission
                                value={emailRegister}
                                onChange={(e) => {
                                    setemailRegister(e.target.value);
                                }}
                                name="Email" placeholder="Email" />
                        </div>
                        <div className="form-buttons">
                            <button className="formbtn" >
                                Register
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default Register;