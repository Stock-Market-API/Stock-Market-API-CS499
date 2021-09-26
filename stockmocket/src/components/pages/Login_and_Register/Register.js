import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./LoginForm.css";

function Register() {

    const [userRegister, setuserRegister] = useState('')
    const [passRegister, setpassRegister] = useState('')
    const [confirmpassRegister, setconfirmpassRegister] = useState('')
    const [emailRegister, setemailRegister] = useState('')

    //Form Submission
    function handleSubmit(event) {
        event.preventDefault();

        if (userRegister.length === 0 || passRegister.length === 0 || confirmpassRegister === 0
        || emailRegister === 0) {
            alert("Fill in empty fields");
        }

        if (passRegister != confirmpassRegister) {
            alert("Passwords do not match");
        }

        else {
             /*
            
            let newUser = {
                username: userRegister,
                password: passRegister,
                email: emailRegister
            }

            //Take inputs from register url to send to backend
            const register = () => {
            axios.post('http://localhost:3000/register', newUser {
                .then (res=>{
                    console.log(res)
                 }

                 .catch(err => {
                    console.log(err)
                 })

            });
            };
            */
        }
    }


    return (
        <div className="form-bg">
          <video src="/videos/video-4.mp4" autoPlay loop muted />
          <div className="form-container">
            <div className="form-header"></div>
            <div className="form-content"> Register
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-inputs">
                        <input type="text"
                            //Saves username input to be inputted to backend
                            //upon submission
                            value = {userRegister}
                            onChange={(e) => {
                            setuserRegister(e.target.value);
                            }}
                            name="Username" placeholder="Username" />
                    </div>
                    <div className="form-inputs">
                        <input type="Password"
                            //Saves password input to be inputted to backend
                            //upon submission
                            value = {passRegister}
                            onChange={(e) => {
                            setpassRegister(e.target.value);
                            }}
                            name="Password" placeholder="Password" />
                        </div>
                    <div className="form-inputs">
                            <input type="Password"
                                //Saves password input to be inputted to backend
                                //upon submission
                            value={confirmpassRegister}
                            onChange={(e) => {
                                setconfirmpassRegister(e.target.value);
                            }}
                            name="Password" placeholder="Confirm Password" />
                    </div>
                    <div className="form-inputs">
                    <input type="Email"
                        //Saves email input to be inputted to backend
                        //upon submission
                        value={emailRegister}
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
                </form>
            </div>
          </div>
        </div>

    )

}

export default Register;