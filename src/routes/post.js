import { useEffect } from "react";
import { useParams } from "react-router-dom";
import myJson from "./posts.json";

const Post = (props) => {
    const postID = useParams();
    const obj = JSON.parse(JSON.stringify(myJson));
    useEffect(() => {
        console.log(postID)

    }, [postID])
    console.log(obj["posts"][postID.postID]["comments"])
    return (
        <div className="App-content" style={{ height: "100%" }}>
            <h1 style={{ paddingLeft: "10px", paddingBottom: "20px", borderBottom: "solid 2px #61dafb" }}>{obj["posts"][postID.postID].author} - {obj["posts"][postID.postID].title}</h1>
            <div style={{ border: "solid #61dafb 2px", margin: "20px", padding: "10px" }}>
                <h3>
                    {obj["posts"][postID.postID].content}
                </h3>
            </div>
            {props.loggedIn ?
                <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                    <textarea style={{ border: "solid #61dafb 2px", fontSize: "large", height: "70px", backgroundColor: "#191b20", color: "white", outline: "none", resize: "none", width: "85%" }} placeholder="Write a comment..."></textarea>
                    <button className="post-button" style={{ cursor: "pointer", border: "solid #61dafb 2px", float: "right", fontSize: "20px", color: "white", width: "7%" }}>Send</button>
                </div>
                :
                <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                    <textarea style={{ cursor: "not-allowed", border: "solid #61dafb 2px", fontSize: "large", height: "70px", backgroundColor: "#191b20", color: "white", outline: "none", resize: "none", width: "85%" }} placeholder="Log in to comment" disabled={true}></textarea>
                    <button className="post-button" style={{ cursor: "not-allowed", border: "solid #61dafb 2px", float: "right", fontSize: "20px", color: "white", width: "7%", backgroundColor: "#191b20" }}>Send</button>
                </div>
            }
            {Object.keys(obj["posts"][postID.postID]["comments"]).map((comment) => (
                <div style={{ border: "solid #61dafb 2px", margin: "50px", marginTop: "10px", marginBottom: "10px", padding: "10px" }}>
                    {obj["posts"][postID.postID]["comments"][comment].author + " - " + obj["posts"][postID.postID]["comments"][comment].content}
                </div>
            )
            )}
        </div>
    );
};

export default Post;
