import React, { Fragment } from "react";
import"./prodect.css";
import {NavLink} from "react-router-dom";
function Prodect(props){
    let{prodect}=props;
    
    return(<>

<img src={prodect.imgu?prodect.imgu:"/images/default.png"} alt={prodect.name} width="20px" height="20px"></img>
                <p>title:{prodect.name}</p> 
                <p>price:{prodect.price}</p>
    </>)
};
export default Prodect;