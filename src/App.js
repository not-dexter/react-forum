/* eslint-disable eqeqeq */
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./routes/layout";
import Login from "./routes/login";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Post from './routes/post';
import CreatePost from './routes/create'

function getCookie(name) {
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? match[1] : null;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!getCookie('Session')) {
      setLoggedIn(false);
      return;
    }
    else {
      fetch(process.env.REACT_APP_API_URL + "/jwt", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: getCookie('Session')})
    }).then(res => res.json()).then(res => {
      if(res.auth === true) {
        setLoggedIn(true);
        setUser(res.username)
      }
      else {
        setLoggedIn(false);
        setUser("");
      }
    });
      
    }
  }, []);

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout loggedIn={loggedIn}/>}>
              <Route index element={<Home loggedIn={loggedIn}/>} />
              <Route path="Login" element={<Login loggedIn={loggedIn}  setLoggedIn={setLoggedIn} setUser={setUser}/>} />
              <Route path="Profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user={user}/>} />
              <Route path="Post/:postID" element={<Post loggedIn={loggedIn} user={user}/>} />
              <Route path="Createpost" element={<CreatePost loggedIn={loggedIn} user={user}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
