/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [authType, setAuthType] = useState('login');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + "auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authtype: authType, username: username, password: password })
        }).then(res => res.json()).then(res => {
            if (res.auth === true) {
                document.cookie = `Session=${res.token};max-age=604800;`
                props.setLoggedIn(true);
                props.setUser(username);
                navigate("/")
            }
            else {
                alert(authType === 'login' ? "Password incorrect!" : "User already exists!")
            }
        })
    }

    const handleClick = () => {
        if (authType === 'register')
            setAuthType('login')
        else
            setAuthType('register')
    }

    return (
        <div className="App-content" style={{ height: "100%" }}>

           <h1 style={{ textAlign: "center", paddingBottom: "20px", borderBottom: "solid 2px #61dafb" }}>{authType === 'login' ? "Login" : "Register"}</h1> 

            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <label>
                        <input type="text" placeholder='Username' onChange={e => setUserName(e.target.value)} />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        <input type="text" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </label>
                    <br></br>
                    <div>
                        <button type="submit">{authType === 'login' ? "Log in" : "Register"}</button>
                    </div>
                </form>
                <h4 style={{cursor: 'pointer'}} onClick={handleClick}>{authType === 'login' ? "Want to register?" : "Want to log in?"}</h4>
            </div>
        </div>
    );
};
export default Login
