/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { memo } from "react";
import { useNavigate } from 'react-router-dom';
//import myJson from "./posts.json";
import search from './magnifying-glass-3-32.png';

const data = [{ id: 0, label: "Newest" }, { id: 1, label: "Oldest" }];
//const obj = JSON.parse(JSON.stringify(myJson));

const Dropdown = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [items] = useState(data);
    const [selectedItem, setSelectedItem] = useState(0);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        setSelectedItem(id);
        props.setOrder(id);
    }
    return (
        <div className='dropdown'>
            <div className='dropdown-header' style={{ border: "solid #61dafb 2px", marginTop: "-6px", userSelect: "none", borderRadius: "15px", paddingRight: "15px", paddingLeft: "15px" }} onClick={toggleDropdown}>
                <p style={{ margin: "0", paddingBottom: "3px" }}>Order by: {selectedItem ? items.find(item => item.id == selectedItem).label : items[0].label} </p>
                <p className={` icon ${isOpen && "open"}`}></p>
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
                {items.map(item => (
                    <div key={item.id} className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id}>
                        <span className={`dropdown-item-dot ${item.id == selectedItem && 'selected'}`}></span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
};

const SearchBar = memo(function SearchBar() {

    const handleChange = (search) => {
        var table = document.getElementById("posts");
        var tr = table.getElementsByTagName("tr");

        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (
        <div className="searchbar" style={{ display: "inline-flex", marginLeft: "-50px", border: "solid #61dafb 2px", marginTop: "-6px", userSelect: "none", borderRadius: "15px", width: "20%", height: "54px", paddingRight: "15px", paddingLeft: "15px" }}>
            <img src={search} alt="search-icon" style={{ height: "28px", paddingTop: "12px", paddingRight: "5px" }}></img>
            <p style={{ display: "inline", marginTop: "2px", fontSize: "30px", fontWeight: "200", paddingRight: "5px" }}> | </p>
            <input id="searchbox" style={{ width: "100%", marginTop: "11px", padding: "0px", height: "30px", outline: "none", color: "white", backgroundColor: "#191b20", border: "none", fontSize: "larger" }} placeholder='Search...' onChange={e => handleChange(e.target.value)} ></input>
        </div>
    );
});
// unused for now
/*const PageButtons = memo(function Dropdown() {

    const [count, setCount] = useState(1);

    const increasePage = () => {
        setCount((c) => c + 1);
    }

    const decreasePage = () => {
        if (count != 1)
            setCount((c) => c - 1);
    }
    return (
        <div className="buttons">
            <button style={{ display: "inline", float: "right" }} onClick={increasePage}>&gt;</button>
            <p style={{ display: "inline", float: "right", marginTop: "2px", paddingRight: "15px", fontSize: "larger" }}>{count}</p>
            <button style={{ display: "inline", float: "right" }} onClick={decreasePage}>&lt;</button>
        </div>
    );
});*/

const CreatePost = memo(function CreatePost({ loggedIn }) {
    const navigate = useNavigate();
    if (loggedIn)
        return (
            <button id="create-post" style={{ cursor: "pointer", float: "right", marginTop: "-6px", width: "auto", height: "54px", paddingRight: "15px", paddingLeft: "15px" }} onClick={() => { navigate("/Createpost") }}> New post </button>
        );
    else
        return (
            <button id="create-post" style={{ cursor: "not-allowed", float: "right", marginTop: "-6px", width: "auto", height: "54px", paddingRight: "15px", paddingLeft: "15px" }} title="Please log in to create a post"> New post </button>
        );
})


const Home = (props) => {
    const [order, setOrder] = useState(0);
    const [items, setItems] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/posts").then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                setItems(data);
            });
        })
    }, [])

    var count = 0;
    if (items) {
        if (order == 1)
            count = 0;
        else
            count = Object.keys(items["posts"]).length - 1;
    }
    return (
        <div className="App-content">

            <h1 style={{ textAlign: "center", paddingBottom: "20px", borderBottom: "solid 2px #61dafb" }}>Home</h1>

            <div className="Content-header">
                <Dropdown setOrder={setOrder} />
                <SearchBar />
                <CreatePost loggedIn={props.loggedIn} />
            </div>

            <table id="posts">
                <tbody>
                    {items ? Object.keys(items["posts"]).map((post) => ( //kinda gross but it'll do
                        <tr key={post} style={{ cursor: "pointer" }} onClick={() => { navigate("/post/" + (Math.abs(count - post))) }}>
                            <td>{(Math.abs(count - post))}</td>
                            <td>{items["posts"][(Math.abs(count - post))].title}</td>
                            <td>{items["posts"][(Math.abs(count - post))].author}</td>
                        </tr>
                    )) :
                        <h3 style={{textAlign: "center"}}>loading</h3>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default memo(Home);