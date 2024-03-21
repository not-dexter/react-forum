/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: write backend for user creation and verification

const Login = (props) => {
    const [username, setUserName] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        document.cookie = `Session=${username};max-age=604800;`
        props.setLoggedIn(true);
        props.setUser(username);
        navigate("/")
    }

    return (
        <div className="App-content" style={{ height: "100%" }}>

            <h1 style={{ textAlign: "center", paddingBottom: "20px", borderBottom: "solid 2px #61dafb" }}>Login</h1>

            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <label>
                        <input type="text" placeholder='Username' onChange={e => setUserName(e.target.value)} />
                    </label>
                    <br></br>
                    <div>
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login
