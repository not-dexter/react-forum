/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { memo } from "react";
import myJson from "./posts.json";
const obj = JSON.parse(JSON.stringify(myJson));

function appendToJson(author, title, message) {
    obj["posts"].push({

        "title": title,
        "author": author,
        "content": message,
        "comments": []
    });
    return obj;
}

async function AppendPosts(json) { //TODO: create backend to handle post
    return fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(data => data.json())
}

const CreatePost = (props) => {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        //setToken(token);
        AppendPosts(appendToJson(props.user, title, message)); //Should work based off of console.log results
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