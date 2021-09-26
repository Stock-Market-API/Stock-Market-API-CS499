import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import "./LoginForm.css";

function Login() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);

    //Form Submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (user.length === 0 || pass.length === 0) {
            alert("Fill in empty fields");
        }

        else {
            /*
            
            let userLogin = {
                username: user,
                password: pass
            }

            //Checks if user login data is found 
            axios.post('http://localhost:3000/login', userLogin)
            .then (res=>{
                console.log(res)
             })

             .catch(err => {
                console.log(err)
             })
            */

            setRedirect(true);
        }
    }

    //Redirects to home page upon successful form submission
    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="form-bg">
         <video src="/videos/video-4.mp4" autoPlay loop muted />
            <div className="form-container">
            <div className = "form-header"></div>
            <div className = "form-content"> Login
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-inputs">
                        <input type="text" required
                            //Saves username input to be inputted to backend
                            //upon submission
                            value={user}
                            onChange={(e) => {
                            setUser(e.target.value);
                        }}
                            name="Username" placeholder="Username" />
                    </div>
                    <div className="form-inputs">
                        <input type="Password" required
                            //Saves password input to be inputted to backend
                            //upon submission
                            value={pass}
                            onChange={(e) => {
                            setPass(e.target.value);
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
                </form>
            </div>
         </div>
        </div>

    )
}

export default Login;