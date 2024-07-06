import React ,{useEffect, useState,createContext}from "react";

function Home(){
    let [count,setcount]=useState(0);
    let [use,setuser]=useState("");
    let[posts,setposts]=useState([]);
    

    let handelupp=()=>{
        setcount(count+1);
    };
    let handeldown=()=>{
        setcount(count-1);
    };
    return(
    
    <div className="Home">
        <button onClick={handelupp}>+1</button>
        <p>{count}</p>
        <button onClick={handeldown}>-1</button>
        <input type="text" id="user" onChange={(e)=>{setuser(e.target.value)}}/>
        {posts&&posts.map((post)=>{return(<p>{post}</p>)})}
    </div>
   );
};
export default Home;