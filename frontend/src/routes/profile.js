/* eslint-disable no-restricted-globals */

const Profile = (props) => {
    console.log(props)
    return (
        <div className="App-content" style={{height: "100%"}}>
            <h1>Welcome, {props.user}</h1>
            <span style={{ cursor: "pointer" }} onClick={() => { document.cookie = "Session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; props.setLoggedIn(false); props.setUser(""); location.replace("/"); }
            }>Logout</span>
        </div>

    );
};

export default Profile;