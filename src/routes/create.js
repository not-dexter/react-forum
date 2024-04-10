/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memo } from "react";

function appendToJson(obj, author, title, message) {
    obj["posts"].push({
        "title": title,
        "author": author,
        "content": message,
        "comments": []
    });
    return obj;
}

function AppendPosts(json, navigate) { 
    fetch(process.env.REACT_APP_API_URL + "/newpost", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }).then((res) => {
        if (res.status === 200)
            navigate("/");
        else
            alert("Error, try again later.");

    })
}

const CreatePost = (props) => {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate()
    useEffect(() => {

    }, [])
    const handleSubmit = e => {
        e.preventDefault();
        let posts = fetch(process.env.REACT_APP_API_URL + "/posts")

        posts.then((obj) => {
            return obj.json()
        }).then((obj) => {
            AppendPosts(appendToJson(obj, props.user, title, message), navigate) //Should work based off of console.log results
        });
    }

    return (
        <div className="App-content" style={{ height: "100%" }}>

            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <label>
                        <input type="text" placeholder='Title' onChange={e => setTitle(e.target.value)} />
                    </label>
                    <br></br>
                    <br></br>
                    <textarea type="text" placeholder="..." onChange={e => setMessage(e.target.value)}></textarea>
                    <div>
                        <button type="submit">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default memo(CreatePost);