import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import "./LoginForm.css";

const Parse = require('parse/node');

function Login() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);

    //Form Submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (user.length === 0 || pass.length === 0) {
            alert("Fill in empty fields");
        }

        else {

            try {
                const loggedInUser = await Parse.User.logIn(user, pass);

                //logIn returns the corresponding Parse User object
                alert(`${loggedInUser.get('username')} has successfully signed in!`);

                /*
                //Verify this is the current user
                const currentUser = await Parse.User.current();
                console.log(loggedIn === currentUser);
                */

                // Clear input fields
                setUser('');
                setPass('');

                setloggedIn(true);
                setRedirect(true);

            } catch (error) {
                alert(`${error.message}`);
            }
            
        }
    }

    //Redirects to home page upon successful form submission
    if (redirect) {
        return <Redirect to="/market" />;
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
