/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import { Outlet, Link } from "react-router-dom";
import logo from '../logo.svg';
import { useNavigate } from 'react-router-dom';

function AppNav({ loggedIn }) {
    return (
        <nav className="App-nav">
            <ul className="App-nav" id="App-navbar">
                {loggedIn
                    ? <li className="App-nav">
                        <Link to="Profile"><span>Profile</span></Link>
                    </li>
                    :
                    <li className="App-nav">
                        <Link to="Login"><span>Login</span></Link>
                    </li>
                }
                <li className="App-nav">
                    <Link to="/"><span>Home</span></Link>
                </li>
            </ul></nav>
    );
};


const Layout = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <header className="App-header">
                <img src={logo} className='App-logo' alt='Logo'></img>
                <h1 style={{ display: "inline", fontSize: "50px", cursor: "pointer" }} onClick={() => { navigate("/") }}>React forum</h1>
                <AppNav loggedIn={props.loggedIn} />
            </header>

            <Outlet />
        </>
    )
};

export default Layout;
