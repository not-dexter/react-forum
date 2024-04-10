import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = (props) => {

    const [comment, setComment] = useState();

    function getCookie(name) {
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
        return match ? match[1] : null;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + "comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: getCookie('Session'), comment: comment, postid: props.postID.postID })
        }).then((res) => {
            if(res.status === 200) {
                window.location.reload(); //scuffed way of doing this but dont want to deal with componentDidUpdate atm
            }
            else
            alert("error")

        })
    }
    if (props.loggedIn) {
        return (
            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                <textarea onChange={e => setComment(e.target.value)} style={{ border: "solid #61dafb 2px", fontSize: "large", height: "70px", backgroundColor: "#191b20", color: "white", outline: "none", resize: "none", width: "85%" }} placeholder="Write a comment..."></textarea>
                <button className="post-button" onClick={handleSubmit} style={{ cursor: "pointer", border: "solid #61dafb 2px", float: "right", fontSize: "20px", color: "white", width: "7%" }}>Send</button>
            </div>
        );
    }
    else {
        return (
            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                <textarea style={{ cursor: "not-allowed", border: "solid #61dafb 2px", fontSize: "large", height: "70px", backgroundColor: "#191b20", color: "white", outline: "none", resize: "none", width: "85%" }} placeholder="Log in to comment" disabled={true}></textarea>
                <button className="post-button" style={{ cursor: "not-allowed", border: "solid #61dafb 2px", float: "right", fontSize: "20px", color: "white", width: "7%", backgroundColor: "#191b20" }}>Send</button>
            </div>
        )
    }

}

const Post = (props) => {
    const postID = useParams();
    const [obj, setObj] = useState();
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "posts").then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                setObj(data);
            });
        })
    }, [])
    if (obj) { // gross but whatever
        return (
            <div className="App-content" style={{ height: "100%" }}>
                <h1 style={{ paddingLeft: "10px", paddingBottom: "20px", borderBottom: "solid 2px #61dafb" }}>{obj["posts"][postID.postID].author} - {obj["posts"][postID.postID].title}</h1>
                <div style={{ border: "solid #61dafb 2px", margin: "20px", padding: "10px" }}>
                    <h3>
                        {obj["posts"][postID.postID].content}
                    </h3>
                </div>
                <Comment loggedIn={props.loggedIn} postID={postID} />
                {Object.keys(obj["posts"][postID.postID]["comments"]).map((comment) => (
                    <div style={{ border: "solid #61dafb 2px", margin: "50px", marginTop: "10px", marginBottom: "10px", padding: "10px" }}>
                        {obj["posts"][postID.postID]["comments"][comment].author + " - " + obj["posts"][postID.postID]["comments"][comment].content}
                    </div>
                )
                )}
            </div>
        );
    } else {
        return (
            <div className="App-content" style={{ height: "100%" }}>
                <h1>Loading</h1>
            </div>
        );
    }
};

export default Post;
